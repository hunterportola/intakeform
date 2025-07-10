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

interface Step8Props {
  data: {
    educationLevel: string;
  };
  errors: { educationLevel?: string };
  updateFormData: (data: Partial<Step8Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

const educationLevels = [
  "Less than high school", "High School diploma", "Associate",
  "Certificate Program", "Bachelor's", "PharmD", "Masters", "MBA",
  "PhD", "JD", "DDS", "MD",
];

export default function Step8({ data, errors, updateFormData, onNext, onBack }: Step8Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">What's your highest level of education?</h1>
        <div className="w-full max-w-sm">
          <Label>Highest level of education</Label>
          <Select
            value={data.educationLevel}
            onValueChange={(value) => updateFormData({ educationLevel: value })}
          >
            <SelectTrigger className={cn(errors.educationLevel && "border-red-600")}>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {educationLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormError message={errors.educationLevel} />
          <p className="text-sm text-gray-500 mt-1">
            Include degrees in which you are currently enrolled.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}