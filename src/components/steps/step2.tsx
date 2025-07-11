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

interface Step2Props {
  data: { loanPurpose: string };
  errors: { loanPurpose?: string };
  updateFormData: (data: { loanPurpose: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

const loanPurposes = [
  "Credit card payoff",
  "Debt consolidation",
  "Bills or rent",
  "Large purchase",
  "Home improvement",
  "Vehicle purchase",
  "Business Expenses",
  "Medical expenses",
  "Moving expenses",
  "Family assistance",
  "Wedding or special event",
  "Vacation",
  "Taxes",
  "My reason is not listed here",
];

export default function Step2({ data, errors, updateFormData, onNext, onBack }: Step2Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">What's this loan for?</h1>
        <p className="text-gray-600">Choose what best matches your primary need.</p>
        <div className="w-full">
          <Label className="block mb-1.5">Loan purpose</Label>
          <Select 
    value={data.loanPurpose} 
    onValueChange={(value) => updateFormData({ loanPurpose: value })}
  >
    <SelectTrigger className={cn("w-full", errors.loanPurpose && "border-red-600")}>
      <SelectValue placeholder="Select a reason..." />
    </SelectTrigger>
    <SelectContent>
      {loanPurposes.map((purpose) => (
        <SelectItem key={purpose} value={purpose}>{purpose}</SelectItem>
      ))}
    </SelectContent>
  </Select>
  <FormError message={errors.loanPurpose} />
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