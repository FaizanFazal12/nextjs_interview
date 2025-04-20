import { useDeleteSubmissionMutation } from '@/lib/redux/services/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeleteSubmissionModalProps {
  submissionId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteSubmissionModal({
  submissionId,
  isOpen,
  onClose,
}: DeleteSubmissionModalProps) {
  const [deleteSubmission, { isLoading }] = useDeleteSubmissionMutation();

  const handleDelete = async () => {
    try {
      await deleteSubmission(submissionId).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to delete submission:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this submission? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}