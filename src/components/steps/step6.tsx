import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import FormError from "../FormError";

interface Step6Props {
  data: {
    streetAddress: string;
    aptSuite: string;
    homeOwnership: string;
  };
  errors: { homeOwnership?: string };
  updateFormData: (data: Partial<Step6Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ownershipOptions = [
  { id: "rent", label: "I rent this property" },
  { id: "own-no-mortgage", label: "I fully own this property (no mortgage)" },
  { id: "own-with-mortgage", label: "I own this property and pay a mortgage" },
  { id: "none", label: "None of the above" },
];

export default function Step6({ data, errors, updateFormData, onNext, onBack }: Step6Props) {
  const displayAddress = [data.streetAddress, data.aptSuite].filter(Boolean).join(', ');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Do you currently rent or own <br /> {displayAddress}?</h1>
        <p className="text-gray-600">We use this to help determine if equity in your home could provide even lower rates.</p>
      </div>

      <RadioGroup value={data.homeOwnership} onValueChange={(value) => updateFormData({ homeOwnership: value })} className="flex flex-col gap-4">
        {ownershipOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="font-normal">{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <FormError message={errors.homeOwnership} />
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}