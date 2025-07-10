import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import FormError from "../FormError";
import { cn } from "../../lib/utils";

// Corrected interface for Step 3
interface Step3Props {
  data: {
    firstName: string;
    lastName: string;
    suffix: string;
  };
  errors: {
    firstName?: string;
    lastName?: string;
  };
  updateFormData: (data: Partial<Step3Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

const suffixOptions = ["", "Jr", "Sr", "I", "II", "III", "IV"];

// Corrected component definition
export default function Step3({ data, errors, updateFormData, onNext, onBack }: Step3Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">What's your legal name?</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1 text-gray-600 cursor-default w-fit">
              <p>Checking your rate won't affect your credit score.</p>
              {/* SVG icon remains here */}
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                When you check your rate, we check your credit report. This initial (soft) inquiry will not affect your credit score.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex flex-col gap-4">
        {/* First Name with Error Handling */}
        <div>
          <Label htmlFor="firstName">Legal first name</Label>
          <Input 
            id="firstName" 
            value={data.firstName} 
            onChange={(e) => updateFormData({ firstName: e.target.value })} 
            className={cn(errors.firstName && "border-red-600 focus-visible:ring-red-600")}
          />
          <FormError message={errors.firstName} />
        </div>
        
        <div className="flex gap-4">
          {/* Last Name with Error Handling */}
          <div className="flex-grow">
            <Label htmlFor="lastName">Legal last name</Label>
            <Input 
              id="lastName" 
              value={data.lastName} 
              onChange={(e) => updateFormData({ lastName: e.target.value })} 
              className={cn(errors.lastName && "border-red-600 focus-visible:ring-red-600")}
            />
            <FormError message={errors.lastName} />
          </div>
          
          {/* Suffix */}
          <div className="w-1/3">
            <Label htmlFor="suffix">Suffix</Label>
            <Select value={data.suffix} onValueChange={(value) => updateFormData({ suffix: value })}>
              <SelectTrigger id="suffix"><SelectValue placeholder="Suffix" /></SelectTrigger>
              <SelectContent>{suffixOptions.filter(s => s).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}