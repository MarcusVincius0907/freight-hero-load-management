import { useQuery } from '@tanstack/react-query';
import { useLoadContext } from '../context/LoadContext';
import { fetchLoads } from '@/lib/api';
import { applySorting, filterByColumns, filterBySearch, paginate } from '../utils/utils';
import { useEffect, useMemo } from 'react';
import { Load } from '@/types/load';

export function useLoadManager() {
  const {
    search,
    page,
    pageSize,
    setPage,
    sortKey,
    sortOrder,
    columnFilters,
    modal,
    closeModal,
    deleteModal,
    closeDeleteModal,
    openCreateModal
  } = useLoadContext();

  const { data, isLoading, error } = useQuery({ queryKey: ['loads'], queryFn: fetchLoads });

  useEffect(() => {
    setPage(1);
  }, [search, columnFilters, sortKey, sortOrder]);

  const columnFiltered = useMemo(() => filterByColumns(data ?? [], columnFilters), [data, columnFilters]);
  const filtered = useMemo(() => filterBySearch(columnFiltered, search), [columnFiltered, search]);
  const sorted = useMemo(
    () => applySorting(filtered, sortKey as keyof Load, sortOrder),
    [filtered, sortKey, sortOrder]
  );
  const paginated = useMemo(() => paginate(sorted, page, pageSize), [sorted, page, pageSize]);

  const filterOptions = useMemo(() => {
    const unique = (key: keyof Load) => [...new Set((data ?? []).map((l) => l[key] as string))].sort();
    return {
      status: unique('status'),
      origin: unique('origin'),
      destination: unique('destination'),
      client_name: unique('client_name'),
      carrier_name: unique('carrier_name')
    };
  }, [data]);

  return {
    isLoading,
    error,
    paginated,
    filterOptions,
    totalItems: filtered.length,
    modal,
    closeModal,
    deleteModal,
    closeDeleteModal,
    rawData: data,
    setPage,
    openCreateModal,
  };
}
