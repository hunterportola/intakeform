import { useState } from 'react';
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

interface Step15Props {
  onBack: () => void;
  // This function would eventually handle the API submission
  onSubmit: () => void;
}

export default function Step15({ onBack, onSubmit }: Step15Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Agree and check your rate</h1>
      </div>

      <div className="flex flex-col gap-4 p-4 border rounded-md">
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="terms" 
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(!!checked)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="terms" className="font-normal">
              By checking the box, clicking "agree and see your rate" below, you agree:
            </Label>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>To the <a href="#" className="underline text-blue-600">Electronic Communications Policy and Consent</a> to receive communications and disclosures electronically;</li>
              <li>To the <a href="#" className="underline text-blue-600">Upstart Terms and Conditions</a>, and the <a href="#" className="underline text-blue-600">Upstart Privacy Policy</a>.</li>
              <li>You are providing your consent to Upstart to obtain a credit report.</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <Button 
          onClick={onSubmit} 
          disabled={!agreed}
          className="w-full"
          size="lg"
        >
          Agree and check your rate
        </Button>
        <p className="text-sm text-gray-500">
          Won't affect your credit score.
        </p>
      </div>

      <div className="flex justify-start mt-8">
        <Button variant="outline" onClick={onBack} size="lg">
          Back
        </Button>
      </div>
    </div>
  );
}