import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import FormError from "../FormError";

interface Step12Props {
  data: { newLoans: string; };
  errors: { newLoans?: string };
  updateFormData: (data: Partial<Step12Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step12({ data, errors, updateFormData, onNext, onBack }: Step12Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Have you taken out any new loans in the past 3 months?</h1>
        <RadioGroup value={data.newLoans} onValueChange={(value) => updateFormData({ newLoans: value })} className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
        <FormError message={errors.newLoans} />
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}