'use client';

import MultiStepForm from '@/components/form/MultiStepForm';

export default function FormPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Submission</h1>
      <MultiStepForm />
    </div>
  );
}