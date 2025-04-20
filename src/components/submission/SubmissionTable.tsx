import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FormData } from '@/types';
import { useGetSubmissionsQuery } from '@/lib/redux/services/api';
import Link from 'next/link';

interface SubmissionTableProps {
  openDeleteModal: (id: string) => void; 
}

export default function SubmissionTable({ openDeleteModal }: SubmissionTableProps) {
  const { data: submissions, isLoading, error } = useGetSubmissionsQuery();

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading submissions</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Job Title</TableHead>
          <TableHead>Employment Status</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions?.forms?.map((submission: FormData) => (
          <TableRow key={submission._id}>
            <TableCell>{submission.personal.fullName}</TableCell>
            <TableCell>{submission.personal.email}</TableCell>
            <TableCell>{submission.employment.jobTitle}</TableCell>
            <TableCell>{submission.employment.employmentStatus}</TableCell>
            <TableCell>{submission.contact.city}</TableCell>
            <TableCell>
              <Link href={`/submissions/edit/${submission._id}`}>
                <Button variant="outline" className="mr-2">
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => openDeleteModal(submission._id!)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}