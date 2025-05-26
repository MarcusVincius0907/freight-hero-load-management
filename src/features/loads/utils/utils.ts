import { ColumnFilters, Load } from '@/types/load';

export function filterBySearch(loads: Load[], search: string) {
  if (!search.trim()) return loads;

  const lowerCaseSearch = search.toLowerCase();

  return loads.filter(
    (load) =>
      load.id.toString().includes(lowerCaseSearch) ||
      load.status.toLowerCase().includes(lowerCaseSearch) ||
      load.origin.toLowerCase().includes(lowerCaseSearch) ||
      load.destination.toLowerCase().includes(lowerCaseSearch) ||
      load.client_name.toLowerCase().includes(lowerCaseSearch) ||
      load.carrier_name.toLowerCase().includes(lowerCaseSearch)
  );
}

export function applySorting(loads: Load[], sortKey: keyof Load, sortOrder: 'asc' | 'desc' | ''): Load[] {
  if (!sortKey || !sortOrder) return loads;

  return [...loads].sort((a, b) => {
    const aVal = a[sortKey]?.toString().toLowerCase() ?? '';
    const bVal = b[sortKey]?.toString().toLowerCase() ?? '';
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
}

export function paginate(loads: Load[], page: number, pageSize: number): Load[] {
  const startIndex = (page - 1) * pageSize;
  return loads.slice(startIndex, startIndex + pageSize);
}

export function filterByColumns(loads: Load[], filters: ColumnFilters): Load[] {
  return loads.filter((load) => {
    return (
      (!filters.status.length || filters.status.includes(load.status)) &&
      (!filters.origin.length || filters.origin.includes(load.origin)) &&
      (!filters.destination.length || filters.destination.includes(load.destination)) &&
      (!filters.client_name.length || filters.client_name.includes(load.client_name)) &&
      (!filters.carrier_name.length || filters.carrier_name.includes(load.carrier_name))
    );
  });
}
