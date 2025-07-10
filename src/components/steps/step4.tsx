import { useRef } from 'react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import FormError from "../FormError";
import { cn } from "../../lib/utils";

interface Step4Props {
  data: { birthMonth: string; birthDay: string; birthYear: string; };
  errors: { birthMonth?: string; birthDay?: string; birthYear?: string; };
  updateFormData: (data: Partial<Step4Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

const monthOptions = [
  "January", 
  "February", 
  "March", 
  "April", 
  "May", 
  "June", 
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December"
];

export default function Step4({ data, errors, updateFormData, onNext, onBack }: Step4Props) {
  const yearRef = useRef<HTMLInputElement>(null);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... auto-tabbing logic remains the same ...
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">When is your birthday?</h1>
        <div className="flex gap-4 items-start">
          <div className="w-1/2">
            <Label>Month</Label>
            <Select value={data.birthMonth} onValueChange={(value) => updateFormData({ birthMonth: value })}>
              <SelectTrigger className={cn(errors.birthMonth && "border-red-600")}><SelectValue placeholder="Month" /></SelectTrigger>
              <SelectContent>{monthOptions.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
            </Select>
            <FormError message={errors.birthMonth} />
          </div>
          <div className="w-1/4">
            <Label htmlFor="day">Day</Label>
            <Input id="day" placeholder="DD" maxLength={2} value={data.birthDay} onChange={handleDayChange} className={cn(errors.birthDay && "border-red-600")} />
            <FormError message={errors.birthDay} />
          </div>
          <div className="w-1/4">
            <Label htmlFor="year">Year</Label>
            <Input id="year" ref={yearRef} placeholder="YYYY" maxLength={4} value={data.birthYear} onChange={(e) => updateFormData({ birthYear: e.target.value })} className={cn(errors.birthYear && "border-red-600")} />
            <FormError message={errors.birthYear} />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}