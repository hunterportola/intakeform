import ProgressBar from "./progressBar";
import { Button } from "./ui/button";
import { ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
}

export default function Header({ currentStep, totalSteps }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
      <div className="flex justify-between items-center h-16 px-8 max-w-7xl mx-auto">
        
        {/* Placeholder for the Logo */}
        <button className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#0d9488" strokeWidth="10" fill="none" />
            <circle cx="50" cy="50" r="25" fill="#0d9488" />
          </svg>
          <span className="text-2xl font-bold text-teal-700">LOAN.CO</span>
        </button>

        {/* Applicant Name Button */}
        <Button variant="ghost" className="flex items-center gap-2">
          John Doe
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
    </header>
  );
}