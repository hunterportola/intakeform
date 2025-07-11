'use client';

import { useState } from 'react';
import Header from './Header';
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
    startMonth: '',
    startYear: '',
    annualIncome: '',
    additionalCompensation: '',
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
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const educationLevelsToSkipStep9 = [
    "Less than high school",
    "High School diploma",
  ];
  const professionalDegrees = ["PharmD", "MBA", "JD", "DDS", "MD"];

const validateStep = (step: number) => {
  const newErrors: { [key: string]: string } = {};

  if (step === 1) {
    const amount = parseFloat(formData.loanAmount);
    if (!amount || amount < 1000 || amount > 75000) {
      newErrors.loanAmount = "Enter an amount between $1,000 and $75,000";
    }
  }
  if (step === 2) {
    if (!formData.loanPurpose) newErrors.loanPurpose = "Please select a loan purpose.";
  }
  if (step === 3) {
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
  }
  if (step === 4) {
    if (!formData.birthMonth) newErrors.birthMonth = "Required";
    if (!formData.birthDay) newErrors.birthDay = "Required";
    if (!formData.birthYear) newErrors.birthYear = "Required";
  }
  if (step === 5) {
    if (!formData.streetAddress) newErrors.streetAddress = "Street address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.zipCode) {
      newErrors.zipCode = "Zip code is required.";
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Enter a valid 5-digit zip code.";
    }
  }
  if (step === 6) {
    if (!formData.homeOwnership) newErrors.homeOwnership = "Please select an option.";
  }
  if (step === 7) {
    const phoneDigits = formData.phoneNumber.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
    }
  }
  if (step === 8) {
    if (!formData.educationLevel) newErrors.educationLevel = "Please select your education level.";
  }
  if (step === 9) {
    if (!formData.school) newErrors.school = "Please select your school.";
    if (!formData.graduationYear) newErrors.graduationYear = "Graduation year is required.";
    if (!professionalDegrees.includes(formData.educationLevel) && !formData.areaOfStudy) {
       newErrors.areaOfStudy = "Please select an area of study.";
    }
  }
  if (step === 10) {
    if (!formData.incomeType || formData.incomeType === "None") {
      newErrors.incomeType = "Please select an income type.";
    } else {
      switch (formData.incomeType) {
        case "Employed - Salary":
        case "Starting New Job Within 6 Months":
        case "Employed - Independent Contractor":
          if (!formData.jobTitle) newErrors.jobTitle = "Job title is required.";
          if (!formData.company) newErrors.company = "Company is required.";
          if (!formData.startMonth) newErrors.startMonth = "Required";
          if (!formData.startYear) newErrors.startYear = "Required";
          if (!formData.annualIncome) newErrors.annualIncome = "Annual income is required.";
          break;
        case "Employed - Hourly":
          if (!formData.jobTitle) newErrors.jobTitle = "Job title is required.";
          if (!formData.company) newErrors.company = "Company is required.";
          if (!formData.startMonth) newErrors.startMonth = "Required";
          if (!formData.startYear) newErrors.startYear = "Required";
          if (!formData.hourlyRate) newErrors.hourlyRate = "Hourly rate is required.";
          if (!formData.hoursPerWeek) newErrors.hoursPerWeek = "Hours per week is required.";
          break;
        case "Self Employed - Sole Proprietor":
        case "Self Employed - Partnership/LLC":
          if (!formData.selfEmployedDescription) newErrors.selfEmployedDescription = "Description is required.";
          if (!formData.startMonth) newErrors.startMonth = "Required";
          if (!formData.startYear) newErrors.startYear = "Required";
          if (!formData.annualIncome) newErrors.annualIncome = "Annual income is required.";
          break;
        case "Other":
          if (!formData.otherIncomeType) newErrors.otherIncomeType = "Please select a type.";
          if (!formData.otherIncomeAmount) newErrors.otherIncomeAmount = "Yearly amount is required.";
          break;
      }
    }
  }
  if (step === 11) {
    if (!formData.checkingSavings) newErrors.checkingSavings = "This field is required.";
    if (!formData.investments) newErrors.investments = "This field is required.";
  }
  if (step === 12) {
    if (!formData.newLoans) newErrors.newLoans = "Please select an option.";
  }
  if (step === 13) {
    if (!formData.vehicleOwnership) newErrors.vehicleOwnership = "Please select an option.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 8 && educationLevelsToSkipStep9.includes(formData.educationLevel)) {
        setCurrentStep(10);
      } else {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handleBack = () => {
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

  const handleSubmit = () => {
    console.log("Form Submitted!");
    console.log(formData);
    alert("Form submitted! Check the console for the data.");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} />;
      case 2:
        return <Step2 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step3 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Step4 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <Step5 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <Step6 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <Step7 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 8:
        return <Step8 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 9:
        return <Step9 data={formData} errors={errors} professionalDegrees={professionalDegrees} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 10:
        return <Step10 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 11:
        return <Step11 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 12:
        return <Step12 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 13:
        return <Step13 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case 14:
        return <Step14 data={formData} goToStep={goToStep} onNext={handleNext} onBack={handleBack} />;
      case 15:
        return <Step15 onSubmit={handleSubmit} onBack={handleBack} />;
      default:
        return <Step1 data={formData} errors={errors} updateFormData={updateFormData} onNext={handleNext} />;
    }
  };

  return (
    <div>
      <Header currentStep={currentStep} totalSteps={15} />
      <main className="max-w-2xl mx-auto p-8 pt-28">
        {renderCurrentStep()}
      </main>
    </div>
  );
}