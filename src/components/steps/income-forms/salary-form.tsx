import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import FormError from "../../FormError";
import { cn } from "../../../lib/utils";
import { NumericFormat } from 'react-number-format';

interface SalaryFormProps {
  data: {
    jobTitle: string;
    company: string;
    startMonth: string;
    startYear: string;
    annualIncome: string;
    additionalCompensation: string;
  };
  errors: {
    jobTitle?: string;
    company?: string;
    startMonth?: string;
    startYear?: string;
    annualIncome?: string;
  };
  updateFormData: (data: Partial<SalaryFormProps['data']>) => void;
}

const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 1974 }, (_, i) => (currentYear - i).toString());

export default function SalaryForm({ data, errors, updateFormData }: SalaryFormProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md bg-gray-50/50">
      <div>
        <Label htmlFor="jobTitle">Job title</Label>
        <Input id="jobTitle" value={data.jobTitle} onChange={(e) => updateFormData({ jobTitle: e.target.value })} className={cn(errors.jobTitle && "border-red-600")} />
        <FormError message={errors.jobTitle} />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" value={data.company} onChange={(e) => updateFormData({ company: e.target.value })} className={cn(errors.company && "border-red-600")} />
        <FormError message={errors.company} />
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
      <div>
        <Label htmlFor="additionalCompensation">Additional compensation</Label>
        <NumericFormat
          id="additionalCompensation"
          value={data.additionalCompensation}
          thousandSeparator=","
          prefix="$"
          onValueChange={(values) => updateFormData({ additionalCompensation: values.value })}
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">Include bonuses, commissions, or other non-regular compensation.</p>
      </div>
    </div>
  );
}