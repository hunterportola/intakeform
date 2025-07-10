'use client';

import { useState } from 'react';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Step4 from './steps/step4';
import Step5 from './steps/step5';
import Step6 from './steps/step6';
import Step7 from './steps/step7';
import Step8 from './steps/step8';
import Step9 from './steps/step9';
import Step10 from './steps/step10';
import Step11 from './steps/step11';
import Step12 from './steps/step12';
import Step13 from './steps/step13';
import Step14 from './steps/step14';
import Step15 from './steps/step15';

export default function LoanForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    loanAmount: '',
    loanPurpose: '',
    firstName: '',
    lastName: '',
    suffix: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    streetAddress: '',
    aptSuite: '',
    city: '',
    state: '',
    zipCode: '',
    homeOwnership: '',
    phoneNumber: '',
    receiveUpdates: false,
    educationLevel: '',
    school: '',
    areaOfStudy: '',
    graduationYear: '',
    incomeType: '',
    jobTitle: '',
    company: '',
    annualIncome: '',
    hourlyRate: '',
    hoursPerWeek: '',
    paycheckFrequency: '',
    selfEmployedDescription: '',
    otherIncomeType: '',
    otherIncomeAmount: '',
    checkingSavings: '',
    investments: '',
    newLoans: '',
    vehicleOwnership: '',
    vehicleMileage: '',
    startMonth: '',
    startYear: '',
    additionalCompensation: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const educationLevelsToSkipStep9 = [
    "Less than high school",
    "High School diploma",
  ];

 const handleNext = () => {
  // First, validate the current step.
  if (validateStep(currentStep)) {
    // If validation passes, then check for skip logic or go to the next step.
    if (currentStep === 8 && educationLevelsToSkipStep9.includes(formData.educationLevel)) {
      setCurrentStep(10);
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  }
};
  
  // Function to go to the previous step
  const handleBack = () => {
  // If we are on Step 10 AND the user skipped step 9, go back to Step 8
  if (currentStep === 10 && educationLevelsToSkipStep9.includes(formData.educationLevel)) {
    setCurrentStep(8);
  } else {
    setCurrentStep((prevStep) => prevStep - 1);
  }
  };

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 15) { 
      setCurrentStep(step);
    }
  };

  const validateStep = (step: number) => {
  const newErrors: { [key: string]: string } = {};

  if (step === 1) {
    const amount = parseFloat(formData.loanAmount.replace(/[^0-9.-]+/g, ""));
    if (!amount || amount < 1000 || amount > 75000) {
      newErrors.loanAmount = "Enter an amount between $1,000 and $75,000";
    }
  }

  if (step === 2) {
    if (!formData.loanPurpose) {
      newErrors.loanPurpose = "Please select a loan purpose.";
    }
  }

  if (step === 3) {
    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
    }
  }

  if (step === 4) {
    if (!formData.birthMonth) newErrors.birthMonth = "Required";
    if (!formData.birthDay) newErrors.birthDay = "Required";
    if (!formData.birthYear) newErrors.birthYear = "Required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = () => {
    // This is where you would send the data to your backend API
    console.log("Form Submitted!");
    console.log(formData);
    alert("Form submitted! Check the console for the data.");
};

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            data={formData}
            errors={errors}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2
            data={formData}
            errors={errors}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack} // Pass the back function
          />
        );
       case 3:
        return (
          <Step3
            data={formData}
            errors={errors}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
    case 4:
        return (
           <Step4
            data={formData}
            errors={errors}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
    />
  );
    case 5:
  return (
    <Step5
      data={formData}
      updateFormData={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
  case 6:
  return (
    <Step6
      data={formData}
      updateFormData={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
  case 7:
  return (
    <Step7
      data={formData}
      updateFormData={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
  case 8:
  return (
    <Step8
      data={formData}
      updateFormData={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
  case 9:
  return (
    <Step9
      data={formData}
      updateFormData={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
  case 10:
  return (
    <Step10
      data={formData}
      updateFormData={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
  case 11:
  return (
    <Step11
      data={formData}
      updateFormData={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
  case 12:
  return (
    <Step12
      data={formData}
      updateFormData={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
  case 13:
  return (
    <Step13
      data={formData}
      updateFormData={updateFormData}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
  case 14:
  return (
    <Step14
      data={formData}
      goToStep={goToStep} // Pass the new function
      onNext={handleNext}
      onBack={handleBack}
    />
  );
  case 15:
  return (
    <Step15
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  );
      default:
        return (
          <Step1
            data={formData}
            errors={errors}
            updateFormData={updateFormData}
            onNext={handleNext}
          />
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      {renderCurrentStep()}
    </div>
  );
}