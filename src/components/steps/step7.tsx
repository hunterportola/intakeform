import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";
import FormError from "../FormError";

interface Step7Props {
  data: {
    phoneNumber: string;
    receiveUpdates: boolean;
  };
  errors: { phoneNumber?: string };
  updateFormData: (data: Partial<Step7Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6, 10)}`;
};

export default function Step7({ data, errors, updateFormData, onNext, onBack }: Step7Props) {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    updateFormData({ phoneNumber: formattedPhoneNumber });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">What's your phone number?</h1>
        <div className="w-full">
  <Label htmlFor="phone" className="block mb-1.5">Phone number</Label>
  <Input id="phone" type="tel" placeholder="(555) 555-5555" value={data.phoneNumber} onChange={handlePhoneChange} className={cn(errors.phoneNumber && "border-red-600")} />
  <FormError message={errors.phoneNumber} />
</div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="receiveUpdates" checked={data.receiveUpdates} onCheckedChange={(checked) => updateFormData({ receiveUpdates: !!checked })} />
        <Label htmlFor="receiveUpdates" className="font-normal">
          I would like to receive updates on the status of my application via text message.
        </Label>
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