import { useFormContext } from 'react-hook-form';
import { FormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Step6SummaryProps {
  onSubmit: (data: FormData) => void;
}

export default function Step6Summary({ onSubmit }: Step6SummaryProps) {
  const { getValues } = useFormContext();
  const data = getValues() as FormData;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">User Profile</h3>
          <p>Full Name: {data.personal.fullName}</p>
          <p>Email: {data.personal.email}</p>
          <p>Gender: {data.personal.gender}</p>
          <p>Date of Birth: {data.personal.dateOfBirth}</p>

          <h3 className="font-semibold mt-4 mb-2">Contact Information</h3>
          <p>Phone Number: {data.contact.phoneNumber}</p>
          {data.contact.alternatePhoneNumber && (
            <p>Alternate Phone Number: {data.contact.alternatePhoneNumber}</p>
          )}
          <p>Address Line 1: {data.contact.addressLine1}</p>
          {data.contact.addressLine2 && <p>Address Line 2: {data.contact.addressLine2}</p>}
          <p>City: {data.contact.city}</p>
          <p>Postal Code: {data.contact.postalCode}</p>
          <p>Country: {data.contact.country}</p>

          <h3 className="font-semibold mt-4 mb-2">Employment Information</h3>
          <p>Job Title: {data.employment.jobTitle}</p>
          <p>Employment Status: {data.employment.employmentStatus}</p>
          {data.employment.companyName && <p>Company Name: {data.employment.companyName}</p>}
          <p>Years of Experience: {data.employment.yearsOfExperience}</p>
          <p>Resume: {data.employment.resume instanceof File ? data.employment.resume.name : 'Uploaded'}</p>

          <h3 className="font-semibold mt-4 mb-2">Financial Information</h3>
          <p>Monthly Income: {data.financial.monthlyIncome}</p>
          <p>Loan Status: {data.financial.loanStatus}</p>
          {data.financial.loanAmount && <p>Loan Amount: {data.financial.loanAmount}</p>}
          <p>Credit Score: {data.financial.creditScore}</p>

          <h3 className="font-semibold mt-4 mb-2">Preferences</h3>
          <p>Preferred Mode of Contact: {data.preferences.contactMode}</p>
          <p>Hobbies: {data.preferences.hobbies?.join(', ') || 'None'}</p>
          <p>Newsletter Subscription: {data.preferences.newsletter ? 'Yes' : 'No'}</p>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button type="button" onClick={() => onSubmit(data)} disabled={false}>
          Save
        </Button>
      </div>
    </div>
  );
}