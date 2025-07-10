import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import FormError from "../../FormError";
import { cn } from "../../../lib/utils";
import { NumericFormat } from 'react-number-format';

interface OtherIncomeFormProps {
  data: {
    otherIncomeType: string;
    otherIncomeAmount: string;
  };
  errors: {
    otherIncomeType?: string;
    otherIncomeAmount?: string;
  };
  updateFormData: (data: Partial<OtherIncomeFormProps['data']>) => void;
}

const otherIncomeTypes = [
  "Alimony", "Child support", "Retirement and pension income", "Rental Income",
  "Disability benefits", "Stipend or scholarship", "Other",
];

export default function OtherIncomeForm({ data, errors, updateFormData }: OtherIncomeFormProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md bg-gray-50/50">
      <p className="text-xs text-gray-500">
        Alimony, child support, or separate maintenance income need not be disclosed if you do not wish to have it considered as a basis for repaying this obligation.
      </p>
      <div>
        <Label htmlFor="otherIncomeType">Type</Label>
        <Select value={data.otherIncomeType} onValueChange={(value) => updateFormData({ otherIncomeType: value })}>
          <SelectTrigger id="otherIncomeType" className={cn(errors.otherIncomeType && "border-red-600")}>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>{otherIncomeTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
        </Select>
        <FormError message={errors.otherIncomeType} />
      </div>
      <div>
        <Label htmlFor="otherIncomeAmount">Yearly Amount</Label>
        <NumericFormat
          id="otherIncomeAmount"
          value={data.otherIncomeAmount}
          thousandSeparator=","
          prefix="$"
          onValueChange={(values) => updateFormData({ otherIncomeAmount: values.value })}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            errors.otherIncomeAmount && "border-red-600 focus-visible:ring-red-600"
          )}
        />
        <FormError message={errors.otherIncomeAmount} />
      </div>
    </div>
  );
}