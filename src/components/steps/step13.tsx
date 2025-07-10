import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import FormError from "../FormError";

interface Step13Props {
  data: {
    vehicleOwnership: string;
    vehicleMileage: string;
  };
  errors: { vehicleOwnership?: string };
  updateFormData: (data: Partial<Step13Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ownershipOptions = [
  { id: "paid-off", label: "Yes, and it’s fully paid off" },
  { id: "leasing", label: "Yes, and I’m currently leasing it" },
  { id: "has-loan", label: "Yes, and I have an active auto loan" },
  { id: "no-vehicle", label: "No, I don’t own a vehicle" },
];

export default function Step13({ data, errors, updateFormData, onNext, onBack }: Step13Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Do you currently own a vehicle?</h1>
        <p className="text-gray-600">By considering your vehicle we may be able to offer you a lower rate and monthly payment.</p>
      </div>

      <RadioGroup value={data.vehicleOwnership} onValueChange={(value) => updateFormData({ vehicleOwnership: value })} className="flex flex-col gap-4">
        {ownershipOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="font-normal">{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <FormError message={errors.vehicleOwnership} />

      {data.vehicleOwnership === 'paid-off' && (
        <div className="w-full max-w-sm">
          <Label htmlFor="mileage">How many miles does it have?</Label>
          <Input id="mileage" value={data.vehicleMileage} onChange={(e) => updateFormData({ vehicleMileage: e.target.value })} placeholder="e.g., 75000" />
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}