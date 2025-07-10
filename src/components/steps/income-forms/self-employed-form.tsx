import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface SelfEmployedFormProps {
  data: {
    selfEmployedDescription: string;
    annualIncome: string;
    startMonth: string;
    startYear: string;
  };
  updateFormData: (data: Partial<SelfEmployedFormProps['data']>) => void;
}

const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const yearOptions = ["2024", "2023", "2022", "2021", "2020", "Older"];

export default function SelfEmployedForm({ data, updateFormData }: SelfEmployedFormProps) {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md bg-gray-50/50">
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={data.selfEmployedDescription} onChange={(e) => updateFormData({ selfEmployedDescription: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="annualIncome">Annual income</Label>
        <Input id="annualIncome" value={data.annualIncome} onChange={(e) => updateFormData({ annualIncome: e.target.value })} />
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
    </div>
  );
}