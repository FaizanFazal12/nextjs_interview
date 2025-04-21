'use client';

import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

export default function Step3Employment() {
  const { control, watch } = useFormContext();
  const employmentStatus = watch('employment.employmentStatus');
  const existingResumeUrl = watch('employment.resume'); 
  // console.log('control' ,control._fields)

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

      {existingResumeUrl && (
        <div className="text-sm text-muted-foreground">
          <span>Current Resume:&nbsp;</span>
          <Link href={existingResumeUrl} target="_blank" className="text-blue-500 underline">
            View PDF
          </Link>
        </div>
      )}

      <FormField
        control={control}
        name="employment.resume"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel>{existingResumeUrl ? 'Replace Resume (PDF)' : 'Upload Resume (PDF)'}</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => onChange(e.target.files?.[0])}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
