import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import FormError from "../FormError";
import { cn } from "../../lib/utils";

interface Step11Props {
  data: {
    checkingSavings: string;
    investments: string;
  };
  errors: {
    checkingSavings?: string;
    investments?: string;
  };
  updateFormData: (data: Partial<Step11Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step11({ data, errors, updateFormData, onNext, onBack }: Step11Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">How much do you have in savings?</h1>
        <div className="w-full flex flex-col gap-4">
          <div>
            <Label htmlFor="checkingSavings" className="block mb-1.5">Checking & Savings accounts</Label>
            <Input id="checkingSavings" value={data.checkingSavings} onChange={(e) => updateFormData({ checkingSavings: e.target.value })} className={cn(errors.checkingSavings && "border-red-600")} />
            <FormError message={errors.checkingSavings} />
          </div>
          <div>
            <Label htmlFor="investments" className="block mb-1.5">Investment accounts</Label>
            <Input id="investments" value={data.investments} onChange={(e) => updateFormData({ investments: e.target.value })} className={cn(errors.investments && "border-red-600")} />
            <FormError message={errors.investments} />
             <p className="text-sm text-gray-500 mt-1">
              Examples of investment accounts include index funds, mutual funds, 401(k), and IRA.
            </p>
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