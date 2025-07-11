import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface Step14Props {
  data: any; // Using `any` for simplicity to access all form fields
  goToStep: (step: number) => void;
  onNext: () => void;
  onBack: () => void;
}

// A reusable component for each review item
const ReviewItem = ({ label, value, onEdit }: { label: string; value: string; onEdit: () => void; }) => {
  return (
    <div className="flex justify-between items-start py-4 border-b">
      <div>
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-gray-600">{value || "-"}</p>
      </div>
      <button onClick={onEdit} className="text-sm text-blue-600 hover:underline">
        Edit
      </button>
    </div>
  );
};

export default function Step14({ data, goToStep, onNext, onBack }: Step14Props) {
  // Format the address for display
  const fullAddress = [data.streetAddress, data.aptSuite, data.city, data.state, data.zipCode].filter(Boolean).join(', ');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Please review your information</h1>
        <p className="text-gray-600">
          Submitting inaccurate information can cause your rate to change or application to be disqualified.
        </p>
      </div>
      
      <div className="flex flex-col">
        <ReviewItem label="Loan amount" value={data.loanAmount} onEdit={() => goToStep(1)} />
        <ReviewItem label="Loan purpose" value={data.loanPurpose} onEdit={() => goToStep(2)} />
        <ReviewItem label="Legal name" value={`${data.firstName} ${data.lastName}`} onEdit={() => goToStep(3)} />
        <ReviewItem label="Date of birth" value={`${data.birthMonth} ${data.birthDay}, ${data.birthYear}`} onEdit={() => goToStep(4)} />
        <ReviewItem label="Address" value={fullAddress} onEdit={() => goToStep(5)} />
        <ReviewItem label="Home Ownership" value={data.homeOwnership} onEdit={() => goToStep(6)} />
        <ReviewItem label="Phone number" value={data.phoneNumber} onEdit={() => goToStep(7)} />
        {/* Add more review items as needed */}
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