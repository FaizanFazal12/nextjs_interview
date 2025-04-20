'use client';

import { useState } from 'react';
import SubmissionTable from '@/components/submission/SubmissionTable';
import DeleteSubmissionModal from '@/components/submission/DeleteSubmissionModal';

export default function SubmissionsPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

  const handleOpenDeleteModal = (id: string) => {
    setSelectedSubmissionId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedSubmissionId(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submissions</h1>
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