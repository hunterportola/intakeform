import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Import all the sub-form components
import SalaryForm from "./income-forms/salary-form";
import HourlyForm from "./income-forms/hourly-form";
import ContractorForm from "./income-forms/contractor-form";
import SelfEmployedForm from "./income-forms/self-employed-form";
import OtherIncomeForm from "./income-forms/other-income-form";


interface Step10Props {
  data: any; // Using `any` for simplicity as this step has many fields
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

export default function Step10({ data, updateFormData, onNext, onBack }: Step10Props) {
  
  const renderIncomeForm = () => {
    switch (data.incomeType) {
      case "Employed - Salary":
        return <SalaryForm data={data} updateFormData={updateFormData} />;
      
      case "Employed - Hourly":
        return <HourlyForm data={data} updateFormData={updateFormData} />;

      case "Employed - Independent Contractor":
      case "Starting New Job Within 6 Months":
        return <ContractorForm data={data} updateFormData={updateFormData} />;
      
      case "Self Employed - Sole Proprietor":
      case "Self Employed - Partnership/LLC":
        return <SelfEmployedForm data={data} updateFormData={updateFormData} />;

      case "Other":
        return <OtherIncomeForm data={data} updateFormData={updateFormData} />;
      
      case "None":
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">What's your primary source of income?</h1>
        <div className="w-full max-w-sm">
          <Label>Income type</Label>
          <Select
            value={data.incomeType}
            onValueChange={(value) => updateFormData({ incomeType: value })}
          >
            <SelectTrigger>
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
           <p className="text-xs text-gray-500 mt-1">
            Do not include income from your spouse or household.
          </p>
        </div>
      </div>
      
      {renderIncomeForm()}

      {/* Optional: Add the "I have another source of income" button here if needed */}

      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}