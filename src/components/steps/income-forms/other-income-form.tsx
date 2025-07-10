import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";


interface OtherIncomeFormProps {
  data: {
    otherIncomeType: string;
    otherIncomeAmount: string;
  };
  updateFormData: (data: Partial<OtherIncomeFormProps['data']>) => void;
}

const otherIncomeTypes = [
  "Alimony",
  "Child support",
  "Retirement and pension income",
  "Rental Income",
  "Disability benefits",
  "Stipend or scholarship",
  "Other",
];

export default function OtherIncomeForm({ data, updateFormData }: OtherIncomeFormProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md bg-gray-50/50">
      <p className="text-xs text-gray-500">
        Alimony, child support, or separate maintenance income need not be disclosed if you do not wish to have it considered as a basis for repaying this obligation.
      </p>
      <div>
        <Label htmlFor="otherIncomeType">Type</Label>
        <Select value={data.otherIncomeType} onValueChange={(value) => updateFormData({ otherIncomeType: value })}>
          <SelectTrigger id="otherIncomeType">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {otherIncomeTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="otherIncomeAmount">Yearly Amount</Label>
        <Input id="otherIncomeAmount" value={data.otherIncomeAmount} onChange={(e) => updateFormData({ otherIncomeAmount: e.target.value })} />
      </div>
    </div>
  );
}