'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { setCurrentStep, updateFormData, resetForm } from '@/lib/redux/slices/formSlice';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetSubmissionByIdQuery, useUpdateSubmissionMutation } from '@/lib/redux/services/api';
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
import { useToast } from '@/hooks/use-toast';

const stepFields: { [key: number]: (keyof FormData)[] } = {
    1: ['personal'],
    2: ['contact'],
    3: ['employment'],
    4: ['financial'],
    5: ['preferences'],
    6: ['personal', 'contact', 'employment', 'financial', 'preferences'],
};

interface EditFormProps {
    id: string;
}

export default function EditForm({ id }: EditFormProps) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();
    const currentStep = useSelector((state: RootState) => state.form.currentStep);
    // const currentStep = 3
    const { data, isLoading, error } = useGetSubmissionByIdQuery(id);
    const [updateSubmission, { isLoading: isUpdating }] = useUpdateSubmissionMutation();

    const methods = useForm<FormData>({
        resolver: zodResolver(fullSchema),
        mode: 'onChange',
    });

    const [isStepValid, setIsStepValid] = useState<boolean[]>(Array(6).fill(false));

    useEffect(() => {
        if (data) {
          const { form: submission } = data;
          const mutableSubmission = JSON.parse(JSON.stringify(submission));
          const formData = {
            personal: { ...mutableSubmission.personal, confirmPassword: '' },
            contact: {
              phoneNumber: mutableSubmission.contact.phoneNumber,
              alternatePhoneNumber: mutableSubmission.contact.alternatePhoneNumber || '',
              addressLine1: mutableSubmission.contact.addressLine1,
              addressLine2: mutableSubmission.contact.addressLine2 || '',
              city: mutableSubmission.contact.city,
              postalCode: mutableSubmission.contact.postalCode,
              country: mutableSubmission.contact.country,
            },
            employment: { ...mutableSubmission.employment, },
            financial: { ...mutableSubmission.financial },
            preferences: { ...mutableSubmission.preferences },
          };
          methods.reset(formData);
          dispatch(updateFormData(formData));
        }
      }, [data, methods, dispatch ]);

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
            // Explicitly construct formValues to avoid frozen objects
            const formValues = methods.getValues();
            const mutableFormValues: Partial<FormData> = {
                [stepFields[currentStep][0]]: formValues[stepFields[currentStep][0]],
            };
            if (currentStep === 2) {
                // Explicitly assign contact fields for step 2
                mutableFormValues.contact = {
                    phoneNumber: formValues.contact.phoneNumber,
                    alternatePhoneNumber: formValues.contact.alternatePhoneNumber || '',
                    addressLine1: formValues.contact.addressLine1,
                    addressLine2: formValues.contact.addressLine2 || '',
                    city: formValues.contact.city,
                    postalCode: formValues.contact.postalCode,
                    country: formValues.contact.country,
                };
            }
            dispatch(updateFormData(mutableFormValues));
        }
    };

    const handlePrevious = () => {
        dispatch(setCurrentStep(currentStep - 1));
    };

    const handleSubmit = async (data: FormData) => {
        // const isValid = await methods.trigger();
        // if (!isValid) {
        //     toast({
        //         title: 'Validation Error',
        //         description: 'Please complete all required fields correctly.',
        //         variant: 'destructive',
        //     });
        //     return;
        // }

        const formDataPayload = {
            personal: { ...data.personal },
            contact: { ...data.contact },
            employment: { ...data.employment },
            financial: { ...data.financial },
            preferences: { ...data.preferences },
        };

        console.log('formDataPayload' ,formDataPayload)

        const resumeFile = data.employment.resume instanceof File    ? data.employment.resume : null;

        try {
            await updateSubmission({ id, data: { ...formDataPayload, resumeFile } }).unwrap();
            toast({
                title: 'Update Successful',
                description: 'Your submission has been updated successfully.',
            });
            router.push('/');
            dispatch(resetForm());

        } catch (error) {
            toast({
                title: 'Update Failed',
                description: 'An error occurred while updating the submission.',
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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading submission</div>;

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
                        <Button type="button" onClick={handleNext} disabled={isUpdating}>
                            Next
                        </Button>
                    )}
                </div>
            </form>
        </FormProvider>
    );
}