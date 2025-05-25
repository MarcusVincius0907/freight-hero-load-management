import { fetchLoads } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import EmptyState from './EmptyState';
import TableFilters from './TableFilters';
import Table from './Table';
import { applySorting, filterByColumns, filterBySearch, paginate } from './utils';
import { useLoadContext } from './LoadContext';
import { useEffect, useMemo } from 'react';
import { PaginationBar } from '@/features/loads/PaginationBar';
import { Load } from '@/types/load';
import LoadFormModal, { LoadFormValues } from './LoadFormModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCreateLoad, useDeleteLoad, useUpdateLoad } from './loadApi';
import ConfirmDeleteModal from './ConfirmDeleteModal';
export default function Wrapper() {
  const { search, page, pageSize, setPage, sortKey, sortOrder, columnFilters, modal, closeModal, openCreateModal, deleteModal, closeDeleteModal } =
    useLoadContext();
  const { data, isLoading, error } = useQuery({ queryKey: ['loads'], queryFn: fetchLoads });

  const { mutate: createLoad } = useCreateLoad();
  const { mutate: updateLoad } = useUpdateLoad();
  const { mutate: deleteLoad } = useDeleteLoad();
  /*  useEffect(() => {
        setPage(1)
    }, [search, columnFilters]) */

  const columnFiltered = useMemo(() => {
    setPage(1)
    return filterByColumns(data ?? [], columnFilters);
  }, [data, columnFilters]);

  const filtered = useMemo(() => {
    setPage(1)
    return filterBySearch(columnFiltered ?? [], search);
  }, [columnFiltered, search]);

  const sorted = useMemo(() => {
    setPage(1)
    return applySorting(filtered, sortKey as keyof Load, sortOrder);
  }, [filtered, sortKey, sortOrder]);

  const currentPageData = useMemo(() => {
    return paginate(sorted, page, pageSize);
  }, [sorted, page, pageSize]);

  const filterOptions = useMemo(() => {
    const unique = (key: keyof Load) => Array.from(new Set((data ?? []).map((load) => load[key] as string))).sort();

    return {
      status: unique('status'),
      origin: unique('origin'),
      destination: unique('destination'),
      client_name: unique('client_name'),
      carrier_name: unique('carrier_name')
    };
  }, [data]);

  if (isLoading) return <div>Skeleton...</div>;
  if (error || !data) return <EmptyState />;

  

  const handleSubmit = (values: LoadFormValues) => {
    if (modal.mode === 'edit' && modal.loadToEdit?.id) {
        updateLoad({ ...values, id: modal.loadToEdit.id });
    } else {
        createLoad(values);
    }
    closeModal();
  };

  return (
    <>
      <div className="space-y-4 ">
        <TableFilters options={filterOptions} />
        <div className="text-black flex">
          <Button onClick={openCreateModal} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Create Load
          </Button>
        </div>
        <div className="rounded-lg overflow-x-auto bg-surface">
          <Table data={currentPageData} />
        </div>
        <PaginationBar totalItems={filtered.length} />
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
        onConfirm={() => {
            if (deleteModal.loadId) deleteLoad(deleteModal.loadId, { onSuccess: closeDeleteModal })
        }}
        />
    </>
  );
}
