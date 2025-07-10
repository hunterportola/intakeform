import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";


interface SalaryFormProps {
  data: {
    jobTitle: string;
    company: string;
    startMonth: string;
    startYear: string;
    annualIncome: string;
    additionalCompensation: string;
  };
  updateFormData: (data: Partial<SalaryFormProps['data']>) => void;
}

// You can create a shared list of months/years for all forms
const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const yearOptions = ["2024", "2023", "2022", "2021", "2020", "Older"];

export default function SalaryForm({ data, updateFormData }: SalaryFormProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md bg-gray-50/50">
      <div>
        <Label htmlFor="jobTitle">Job title</Label>
        <Input id="jobTitle" value={data.jobTitle} onChange={(e) => updateFormData({ jobTitle: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" value={data.company} onChange={(e) => updateFormData({ company: e.target.value })} />
      </div>
       <div className="flex gap-4">
        <div className="w-1/2">
          <Label>Start month</Label>
          <Select value={data.startMonth} onValueChange={(value) => updateFormData({ startMonth: value })}>
            <SelectTrigger><SelectValue placeholder="Month" /></SelectTrigger>
            <SelectContent>{monthOptions.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="w-1/2">
          <Label>Year</Label>
          <Select value={data.startYear} onValueChange={(value) => updateFormData({ startYear: value })}>
            <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
            <SelectContent>{yearOptions.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="annualIncome">Annual income</Label>
        <Input id="annualIncome" value={data.annualIncome} onChange={(e) => updateFormData({ annualIncome: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="additionalCompensation">Additional compensation</Label>
        <Input id="additionalCompensation" value={data.additionalCompensation} onChange={(e) => updateFormData({ additionalCompensation: e.target.value })} />
        <p className="text-xs text-gray-500 mt-1">Include bonuses, commissions, or other non-regular compensation.</p>
      </div>
    </div>
  );
}