import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import FormError from "../../FormError";
import { cn } from "../../../lib/utils";
import { NumericFormat } from 'react-number-format';

interface SelfEmployedFormProps {
  data: {
    selfEmployedDescription: string;
    annualIncome: string;
    startMonth: string;
    startYear: string;
  };
  errors: {
    selfEmployedDescription?: string;
    annualIncome?: string;
    startMonth?: string;
    startYear?: string;
  };
  updateFormData: (data: Partial<SelfEmployedFormProps['data']>) => void;
}

const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 1974 }, (_, i) => (currentYear - i).toString());

export default function SelfEmployedForm({ data, errors, updateFormData }: SelfEmployedFormProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md bg-gray-50/50">
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={data.selfEmployedDescription} onChange={(e) => updateFormData({ selfEmployedDescription: e.target.value })} className={cn(errors.selfEmployedDescription && "border-red-600")} />
        <FormError message={errors.selfEmployedDescription} />
      </div>
      <div>
        <Label htmlFor="annualIncome">Annual income</Label>
        <NumericFormat
          id="annualIncome"
          value={data.annualIncome}
          thousandSeparator=","
          prefix="$"
          onValueChange={(values) => updateFormData({ annualIncome: values.value })}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background",
            errors.annualIncome && "border-red-600"
          )}
        />
        <FormError message={errors.annualIncome} />
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <Label>Start month</Label>
          <Select value={data.startMonth} onValueChange={(value) => updateFormData({ startMonth: value })}>
            <SelectTrigger className={cn(errors.startMonth && "border-red-600")}><SelectValue placeholder="Month" /></SelectTrigger>
            <SelectContent>{monthOptions.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
          </Select>
          <FormError message={errors.startMonth} />
        </div>
        <div className="w-1/2">
          <Label>Year</Label>
          <Select value={data.startYear} onValueChange={(value) => updateFormData({ startYear: value })}>
            <SelectTrigger className={cn(errors.startYear && "border-red-600")}><SelectValue placeholder="Year" /></SelectTrigger>
            <SelectContent>{yearOptions.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
          </Select>
          <FormError message={errors.startYear} />
        </div>
      </div>
    </div>
  );
}