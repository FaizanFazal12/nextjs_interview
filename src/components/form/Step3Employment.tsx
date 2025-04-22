'use client';

import { useFormContext } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Step3Employment() {
  const { control, watch, setValue } = useFormContext();
  const employmentStatus = watch('employment.employmentStatus');
  const existingResumeUrl = watch('employment.resume');

  const [previewResumeUrl, setPreviewResumeUrl] = useState<string | null>(null);

  const handleResumeChange = (file: File | undefined) => {
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setPreviewResumeUrl(tempUrl);
      setValue('employment.resume', file);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup preview URL when component unmounts
      if (previewResumeUrl) URL.revokeObjectURL(previewResumeUrl);
    };
  }, [previewResumeUrl]);

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="employment.jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Job Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="employment.employmentStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Employment Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Employed">Employed</SelectItem>
                <SelectItem value="Unemployed">Unemployed</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {employmentStatus === 'Employed' && (
        <FormField
          control={control}
          name="employment.companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name="employment.yearsOfExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {(existingResumeUrl && typeof existingResumeUrl === 'string') && (
        <div className="text-sm text-muted-foreground">
          <span>Current Resume:&nbsp;</span>
          <Link
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${existingResumeUrl}`}
            target="_blank"
            className="text-blue-500 underline"
          >
            View PDF
          </Link>
        </div>
      )}

      {previewResumeUrl && (
        <div className="text-sm text-muted-foreground">
          <span>Selected Resume Preview:&nbsp;</span>
          <Link href={previewResumeUrl} target="_blank" className="text-blue-500 underline">
            View PDF
          </Link>
        </div>
      )}

      <FormField
        control={control}
        name="employment.resume"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {existingResumeUrl ? 'Replace Resume (PDF)' : 'Upload Resume (PDF)'}
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleResumeChange(e.target.files?.[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
