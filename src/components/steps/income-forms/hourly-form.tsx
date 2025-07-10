import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import FormError from "../../FormError";
import { cn } from "../../../lib/utils";
import { NumericFormat } from 'react-number-format';

interface HourlyFormProps {
  data: {
    jobTitle: string;
    company: string;
    startMonth: string;
    startYear: string;
    hourlyRate: string;
    hoursPerWeek: string;
    additionalCompensation: string;
    paycheckFrequency: string;
  };
  errors: {
    jobTitle?: string;
    company?: string;
    startMonth?: string;
    startYear?: string;
    hourlyRate?: string;
    hoursPerWeek?: string;
  };
  updateFormData: (data: Partial<HourlyFormProps['data']>) => void;
}

const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 1974 }, (_, i) => (currentYear - i).toString());
const frequencyOptions = ["Weekly", "Bi-weekly", "Semi-monthly", "Monthly"];

export default function HourlyForm({ data, errors, updateFormData }: HourlyFormProps) {
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
      <div className="flex gap-4">
        <div className="w-1/2">
          <Label htmlFor="hourlyRate">Hourly rate</Label>
          <Input id="hourlyRate" value={data.hourlyRate} onChange={(e) => updateFormData({ hourlyRate: e.target.value })} className={cn(errors.hourlyRate && "border-red-600")} />
          <FormError message={errors.hourlyRate} />
        </div>
        <div className="w-1/2">
          <Label htmlFor="hoursPerWeek">Hours per week</Label>
          <Input id="hoursPerWeek" value={data.hoursPerWeek} onChange={(e) => updateFormData({ hoursPerWeek: e.target.value })} className={cn(errors.hoursPerWeek && "border-red-600")} />
          <FormError message={errors.hoursPerWeek} />
        </div>
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
      <div>
        <Label htmlFor="paycheckFrequency">Paycheck frequency</Label>
        <Select value={data.paycheckFrequency} onValueChange={(value) => updateFormData({ paycheckFrequency: value })}>
          <SelectTrigger id="paycheckFrequency"><SelectValue placeholder="Select..." /></SelectTrigger>
          <SelectContent>{frequencyOptions.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
        </Select>
      </div>
    </div>
  );
}