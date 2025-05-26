import EmptyState from './EmptyState';
import TableFilters from './TableFilters';
import Table from './Table';
import { useCallback } from 'react';
import { PaginationBar } from '@/features/loads/components/PaginationBar';
import { LoadStatus } from '@/types/load';
import LoadFormModal, { LoadFormValues } from '../modal/LoadFormModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCreateLoad, useDeleteLoad, useUpdateLoad } from '../api/loadApi';
import ConfirmDeleteModal from '../modal/ConfirmDeleteModal';
import LoadSkeleton from './LoadSkeleton';
import { Toaster } from '@/components/ui/toaster';
import { useLoadManager } from '../hooks/use-load-manager';

export default function Wrapper() {
  const {
    isLoading,
    error,
    filterOptions,
    modal,
    deleteModal,
    totalItems,
    paginated,
    closeModal,
    openCreateModal,
    closeDeleteModal,
  } = useLoadManager();

  const { mutate: createLoad } = useCreateLoad();
  const { mutate: updateLoad } = useUpdateLoad();
  const { mutate: deleteLoad } = useDeleteLoad();

  const handleSubmit = useCallback(
    (values: LoadFormValues) => {
      if (modal.mode === 'edit' && modal.loadToEdit?.id) {
        updateLoad({ ...values, id: modal.loadToEdit.id, status: values.status as LoadStatus });
      } else {
        createLoad({ ...values, status: values.status as LoadStatus });
      }
      closeModal();
    },
    [modal, updateLoad, createLoad, closeModal]
  );

  const handleDelete = useCallback(() => {
    if (deleteModal.loadId) deleteLoad(deleteModal.loadId, { onSuccess: closeDeleteModal });
  }, [deleteModal, deleteLoad, closeDeleteModal]);

  if (isLoading) return <LoadSkeleton />;
  if (error) return <EmptyState />;

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col h-full w-full max-w-screen-lg bg-[#1e1e1e] border border-[#9ca3af] text-white rounded-lg p-4 mt-10 ">
          <TableFilters options={filterOptions} />
        </div>
        <div className="flex flex-col h-full w-full max-w-screen-lg bg-[#1e1e1e] border border-[#9ca3af] text-white rounded-lg p-4 mt-5 ">
          <div className="text-black mb-3">
            <Button onClick={openCreateModal} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Create Load
            </Button>
          </div>
          <div className="w-full rounded-lg overflow-x-auto bg-surface">
            <Table data={paginated} />
          </div>
          <div className="mt-4">
            <PaginationBar totalItems={totalItems} />
          </div>
        </div>
      </div>
      <LoadFormModal
        open={modal.isOpen}
        onClose={closeModal}
        initialData={modal.loadToEdit ?? undefined}
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteModal
        open={deleteModal.isOpen}
        loadId={deleteModal.loadId}
        onClose={closeDeleteModal}
        isLoading={isLoading}
        onConfirm={handleDelete}
      />
      <Toaster />
    </>
  );
}
