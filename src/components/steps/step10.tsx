import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SalaryForm from "./income-forms/salary-form";
import HourlyForm from "./income-forms/hourly-form";
import ContractorForm from "./income-forms/contractor-form";
import SelfEmployedForm from "./income-forms/self-employed-form";
import OtherIncomeForm from "./income-forms/other-income-form";
import FormError from "../FormError";
import { cn } from "../../lib/utils";

interface Step10Props {
  data: any;
  errors: { [key: string]: string };
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const incomeTypes = [
  "Employed - Salary",
  "Employed - Hourly",
  "Employed - Independent Contractor",
  "Starting New Job Within 6 Months",
  "Self Employed - Sole Proprietor",
  "Self Employed - Partnership/LLC",
  "Other",
  "None",
];

export default function Step10({ data, errors, updateFormData, onNext, onBack }: Step10Props) {
  
  const renderIncomeForm = () => {
    switch (data.incomeType) {
      case "Employed - Salary":
        return <SalaryForm data={data} errors={errors} updateFormData={updateFormData} />;
      
      case "Employed - Hourly":
        return <HourlyForm data={data} errors={errors} updateFormData={updateFormData} />;

      case "Employed - Independent Contractor":
      case "Starting New Job Within 6 Months":
        return <ContractorForm data={data} errors={errors} updateFormData={updateFormData} />;
      
      case "Self Employed - Sole Proprietor":
      case "Self Employed - Partnership/LLC":
        return <SelfEmployedForm data={data} errors={errors} updateFormData={updateFormData} />;

      case "Other":
        return <OtherIncomeForm data={data} errors={errors} updateFormData={updateFormData} />;
      
      case "None":
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">What's your primary source of income?</h1>
        <div className="w-full">
  <Label className="block mb-1.5">Income type</Label>
  <Select
    value={data.incomeType}
    onValueChange={(value) => updateFormData({ incomeType: value })}
  >
    <SelectTrigger className={cn("w-full", errors.incomeType && "border-red-600")}>
      <SelectValue placeholder="Select..." />
    </SelectTrigger>
    <SelectContent>
      {incomeTypes.map((type) => (
        <SelectItem key={type} value={type}>
          {type}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  <FormError message={errors.incomeType} />
</div>
      </div>
      
      {renderIncomeForm()}

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