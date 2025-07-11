import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import FormError from "../FormError"; 
import { NumericFormat } from 'react-number-format';

interface Step1Props {
  data: { loanAmount: string };
  errors: { loanAmount?: string }; 
  updateFormData: (data: { loanAmount: string }) => void;
  onNext: () => void;
}

export default function Step1({ data, errors, updateFormData, onNext }: Step1Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">How much would you like to borrow?</h1>
        <div className="w-full">
          <Label htmlFor="loan-amount" className="block mb-1.5">Loan amount</Label>
          <NumericFormat
            id="loan-amount"
            value={data.loanAmount}
            thousandSeparator=","
            prefix="$"
            onValueChange={(values) => {
              updateFormData({ loanAmount: values.value });
            }}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              errors.loanAmount && "border-red-600 focus-visible:ring-red-600"
            )}
          />

  {/* --- This is the corrected section --- */}
  {errors.loanAmount ? (
    <FormError message={errors.loanAmount} />
  ) : (
    <p className="text-sm text-gray-500 mt-1">
      Enter an amount between $1,000 and $75,000
    </p>
  )}
  {/* ------------------------------------ */}

</div>
      </div>
      
      <div className="flex justify-end mt-8">
        <Button onClick={onNext} size="lg" className="w-full">
          Next
        </Button>
      </div>
    </div>
  );
}