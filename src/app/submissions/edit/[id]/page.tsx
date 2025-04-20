import EditForm from "@/components/form/EditForm";

export default function EditSubmissionPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Submission</h1>
      <EditForm id={params.id} />
    </div>
  );
}