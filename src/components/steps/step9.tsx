import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FormError from "../FormError";

const mockSchools = [
  { value: "claremont mckenna college", label: "Claremont McKenna College" },
  { value: "stanford university", label: "Stanford University" },
  { value: "uc berkeley", label: "UC Berkeley" },
];

const areaOfStudyOptions = [
  "Accounting", "Aerospace Engineering", "Agriculture", "Anthropology", "Architecture", "Art History", "Biology", "Business Management", "Chemical Engineering", "Chemistry", "Civil Engineering", "Communications", "Computer Engineering", "Computer Science", "Construction", "Criminal Justice", "Drama", "Economics", "Education", "Electrical Engineering", "English", "Film", "Finance", "Forestry", "Geography", "Geology", "Graphic Design", "Health Care Administration", "History", "Hospitality & Tourism", "Industrial Engineering", "Information Technology (IT)", "Interior Design", "International Relations", "Journalism", "Management Information Systems (MIS)", "Marketing", "Math", "Mechanical Engineering", "Music", "Nursing", "Nutrition", "Other", "Philosophy", "Physician Assistant", "Physics", "Political Science", "Psychology", "Religion", "Sociology", "Spanish"
];

// The interface now accepts the professionalDegrees prop
interface Step9Props {
  data: {
    educationLevel: string;
    school: string;
    areaOfStudy: string;
    graduationYear: string;
  };
  errors: {
    school?: string;
    areaOfStudy?: string;
    graduationYear?: string;
  };
  professionalDegrees: string[]; // <-- ADD THIS
  updateFormData: (data: Partial<Step9Props['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step9({ data, errors, professionalDegrees, updateFormData, onNext, onBack }: Step9Props) {
  const [schoolPopoverOpen, setSchoolPopoverOpen] = useState(false);
  const [studyPopoverOpen, setStudyPopoverOpen] = useState(false);
  
  // The local constant is removed, and we use the prop instead
  const showAreaOfStudy = !professionalDegrees.includes(data.educationLevel);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Tell us about your {data.educationLevel} program.</h1>
      </div>

     <div className="flex flex-col gap-4">
  <div>
    <Label className="block mb-1.5">School</Label>
    <Popover open={schoolPopoverOpen} onOpenChange={setSchoolPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className={cn("w-full justify-between font-normal", errors.school && "border-red-600")}>
          {data.school ? mockSchools.find(s => s.value === data.school)?.label : "Select school..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[480px] p-0">
        <Command>
          <CommandInput placeholder="Search school..." />
          <CommandEmpty>No school found.</CommandEmpty>
          <CommandGroup>
            {mockSchools.map((school) => (
              <CommandItem key={school.value} value={school.value} onSelect={(value) => { updateFormData({ school: value }); setSchoolPopoverOpen(false); }}>
                <Check className={cn("mr-2 h-4 w-4", data.school === school.value ? "opacity-100" : "opacity-0")} />
                {school.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
    <FormError message={errors.school} />
  </div>
  
  {showAreaOfStudy && (
    <div>
      <Label className="block mb-1.5">Area of Study</Label>
        <Popover open={studyPopoverOpen} onOpenChange={setStudyPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" className={cn("w-full justify-between font-normal", errors.areaOfStudy && "border-red-600")}>
            {data.areaOfStudy || "Select area of study..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[480px] p-0">
          <Command>
            <CommandInput placeholder="Search area of study..." />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {areaOfStudyOptions.map((studyArea) => (
                  <CommandItem key={studyArea} value={studyArea} onSelect={(value) => { updateFormData({ areaOfStudy: value }); setStudyPopoverOpen(false); }}>
                    <Check className={cn("mr-2 h-4 w-4", data.areaOfStudy === studyArea ? "opacity-100" : "opacity-0")} />
                    {studyArea}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormError message={errors.areaOfStudy} />
      <p className="text-xs text-gray-500 mt-1">Select the closest applicable option.</p>
    </div>
  )}
  
  <div>
    <Label htmlFor="gradYear" className="block mb-1.5">Graduation or expected graduation year</Label>
    <Input id="gradYear" value={data.graduationYear} onChange={(e) => updateFormData({ graduationYear: e.target.value })} className={cn(errors.graduationYear && "border-red-600")} />
    <FormError message={errors.graduationYear} />
  </div>
</div>

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