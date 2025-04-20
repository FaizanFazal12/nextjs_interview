'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubmissionTable from '@/components/submission/SubmissionTable';
import DeleteSubmissionModal from '@/components/submission/DeleteSubmissionModal';
import { Button } from '@/components/ui/button';

export default function SubmissionsPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const router = useRouter();

  const handleOpenDeleteModal = (id: string) => {
    setSelectedSubmissionId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedSubmissionId(null);
    setIsDeleteModalOpen(false);
  };

  const handleCreateSubmission = () => {
    router.push('/submissions/create');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submissions</h1>
      <div className="mb-4">
        <Button
          onClick={handleCreateSubmission}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Create Submission
        </Button>
      </div>
      <SubmissionTable openDeleteModal={handleOpenDeleteModal} />
      {isDeleteModalOpen && (
        <DeleteSubmissionModal
          submissionId={selectedSubmissionId!}
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
        />
      )}
    </div>
  );
}