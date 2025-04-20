'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { setCurrentStep, updateFormData, resetForm } from '@/lib/redux/slices/formSlice';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateSubmissionMutation } from '@/lib/redux/services/api';
import ProgressBar from '@/components/form/ProgressBar';
import Step1Profile from '@/components/form/Step1Profile';
import Step2Contact from '@/components/form/Step2Contact';
import Step3Employment from '@/components/form/Step3Employment';
import Step4Financial from '@/components/form/Step4Financial';
import Step5Preferences from '@/components/form/Step5Preferences';
import Step6Summary from '@/components/form/Step6Summary';
import type { FormData } from '@/types';
import { fullSchema } from '@/lib/validation/form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"

const stepFields: { [key: number]: (keyof FormData)[] } = {
  1: ['personal'],
  2: ['contact'],
  3: ['employment'],
  4: ['financial'],
  5: ['preferences'],
  6: ['personal', 'contact', 'employment', 'financial', 'preferences'],
};

export default function MultiStepForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentStep = useSelector((state: RootState) => state.form.currentStep);
  const formData = useSelector((state: RootState) => state.form.formData);
  const [createSubmission, { isLoading }] = useCreateSubmissionMutation();
  const { toast } = useToast()
  const methods = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: formData,
    mode: 'onChange',
  });

  const [isStepValid, setIsStepValid] = useState<boolean[]>(Array(6).fill(false));

  const handleNext = async () => {
    const fieldsToValidate = stepFields[currentStep];
    const isValid = await methods.trigger(fieldsToValidate as any);
    if (isValid) {
      setIsStepValid((prev) => {
        const newValid = [...prev];
        newValid[currentStep - 1] = true;
        return newValid;
      });
      dispatch(setCurrentStep(currentStep + 1));
      dispatch(updateFormData(methods.getValues()));
    }
  };

  const handlePrevious = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  const handleSubmit = async (data: FormData) => {
    const isValid = await methods.trigger();
    if (!isValid) {
      toast({
        title: 'Validation Error',
        description: 'Please complete all required fields correctly.',
        variant: 'destructive',
      });
      return;
    }
    const formDataPayload = {
      personal: { ...data.personal },
      contact: { ...data.contact },
      employment: { ...data.employment, resume: undefined }, 
      financial: { ...data.financial },
      preferences: { ...data.preferences },
    };

    const resumeFile = data.employment.resume instanceof File ? data.employment.resume : null;
  
  
    try {
      await createSubmission({ ...formDataPayload, resumeFile }).unwrap();
      dispatch(resetForm());
      toast({
        title: 'Submission Successful',
        description: 'Your form has been submitted successfully.',
      });
      router.push('/');
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'An error occurred while submitting the form.',
        variant: 'destructive',
      });
    }
  };
  

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Profile />;
      case 2:
        return <Step2Contact />;
      case 3:
        return <Step3Employment />;
      case 4:
        return <Step4Financial />;
      case 5:
        return <Step5Preferences />;
      case 6:
        return <Step6Summary onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6">
        <ProgressBar isStepValid={isStepValid} />
        {renderStep()}
        <div className="flex justify-between">
          {currentStep > 1 && currentStep < 6 && (
            <Button type="button" variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {currentStep < 6 && (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}