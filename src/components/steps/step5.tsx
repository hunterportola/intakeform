import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";
import FormError from "../FormError";

interface Step5Props {
  data: {
    streetAddress: string;
    aptSuite: string;
    city: string;
    state: string;
    zipCode: string;
  };
  errors: {
    streetAddress?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  updateFormData: (data: Partial<Step5Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step5({ data, errors, updateFormData, onNext, onBack }: Step5Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">What's your address?</h1>
        <p className="text-gray-600">We use your residential address to verify your identity and eligibility.</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
    <Label htmlFor="streetAddress" className="block mb-1.5">Street address</Label>
    <Input id="streetAddress" value={data.streetAddress} onChange={(e) => updateFormData({ streetAddress: e.target.value })} className={cn(errors.streetAddress && "border-red-600")} />
    <FormError message={errors.streetAddress} />
  </div>
  <div>
    <Label htmlFor="apt" className="block mb-1.5">Apt/suite number (if applicable)</Label>
    <Input id="apt" value={data.aptSuite} onChange={(e) => updateFormData({ aptSuite: e.target.value })} />
  </div>
  <div>
    <Label htmlFor="city" className="block mb-1.5">City</Label>
    <Input id="city" value={data.city} onChange={(e) => updateFormData({ city: e.target.value })} className={cn(errors.city && "border-red-600")} />
    <FormError message={errors.city} />
  </div>
  <div className="flex gap-4">
    <div className="w-1/2">
      <Label htmlFor="state" className="block mb-1.5">State</Label>
      <Input id="state" value={data.state} onChange={(e) => updateFormData({ state: e.target.value })} className={cn(errors.state && "border-red-600")} />
      <FormError message={errors.state} />
    </div>
    <div className="w-1/2">
      <Label htmlFor="zip" className="block mb-1.5">Zip code</Label>
      <Input id="zip" value={data.zipCode} onChange={(e) => updateFormData({ zipCode: e.target.value })} className={cn(errors.zipCode && "border-red-600")} />
      <FormError message={errors.zipCode} />
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