import { ChevronDown } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import { useLoadContext } from '../context/LoadContext';

export default function TableHeader() {
  const { sortKey, setSortKey, sortOrder, setSortOrder } = useLoadContext();

  const handleSort = (key: string) => {
    if (sortKey === key) {
      const next = sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? '' : 'asc';
      setSortOrder(next);
      if (next === '') setSortKey('');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (key: string) => {
    if (sortKey !== key) return null;
    return sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />;
  };

  return (
    <thead>
      <tr>
        {['id', 'status', 'origin', 'destination', 'client_name', 'carrier_name'].map((key) => (
          <th key={key} onClick={() => handleSort(key)} className="cursor-pointer select-none text-left py-1 px-3">
            <div className="flex items-center">
              {key.replace('_', ' ').toUpperCase()}
              {renderSortIcon(key)}
            </div>
          </th>
        ))}
        <th className="text-left py-1 px-3">
          <div className="flex items-center justify-center">ACTIONS</div>
        </th>
        <th />
      </tr>
    </thead>
  );
}
