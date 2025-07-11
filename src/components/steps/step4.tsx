import { useRef } from 'react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FormError from "../FormError";
import { cn } from "../../lib/utils";

// The interface now correctly includes the 'errors' prop
interface Step4Props {
  data: {
    birthMonth: string;
    birthDay: string;
    birthYear: string;
  };
  errors: {
    birthMonth?: string;
    birthDay?: string;
    birthYear?: string;
  };
  updateFormData: (data: Partial<Step4Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

const monthOptions = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export default function Step4({ data, errors, updateFormData, onNext, onBack }: Step4Props) {
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dayValue = e.target.value;
    updateFormData({ birthDay: dayValue });

    const isTwoDigits = dayValue.length === 2;
    const isLargeSingleDigit = dayValue.length === 1 && parseInt(dayValue) >= 4;

    if (isTwoDigits || isLargeSingleDigit) {
      yearRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">When is your birthday?</h1>
        <div className="flex gap-4 items-start">
  {/* Month Field */}
  <div className="w-1/2">
    <Label className="block mb-1.5">Month</Label>
    <Select value={data.birthMonth} onValueChange={(value) => updateFormData({ birthMonth: value })}>
      <SelectTrigger className={cn("w-full", errors.birthMonth && "border-red-600")}>
        <SelectValue placeholder="Month" />
      </SelectTrigger>
      <SelectContent>
        {monthOptions.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
      </SelectContent>
    </Select>
    <FormError message={errors.birthMonth} />
  </div>

  {/* Day Field */}
  <div className="w-1/4">
    <Label htmlFor="day" className="block mb-1.5">Day</Label>
    <Input 
      id="day" 
      ref={dayRef}
      placeholder="DD" 
      maxLength={2}
      value={data.birthDay} 
      onChange={handleDayChange}
      className={cn(errors.birthDay && "border-red-600")}
    />
    <FormError message={errors.birthDay} />
  </div>

  {/* Year Field */}
  <div className="w-1/4">
    <Label htmlFor="year" className="block mb-1.5">Year</Label>
    <Input 
      id="year" 
      ref={yearRef}
      placeholder="YYYY" 
      maxLength={4}
      value={data.birthYear} 
      onChange={(e) => updateFormData({ birthYear: e.target.value })}
      className={cn(errors.birthYear && "border-red-600")}
    />
    <FormError message={errors.birthYear} />
  </div>
</div>
      </div>

      <div className="flex w-full items-center gap-4 mt-8">
        <Button variant="outline" onClick={onBack} size="lg">
          Back
        </Button>
        <Button onClick={onNext} size="lg" className="flex-grow">
          Next
        </Button>
      </div>
    </div>
  );
}