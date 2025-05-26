import { Load } from '@/types/load';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import { useLoadContext } from '../context/LoadContext';

export default function Table({ data }: { data: Load[] }) {
  const { openEditModal, openDeleteModal } = useLoadContext();

  if (!data || data.length === 0) {
    return <div className="text-center py-4 text-gray-500">It seems there are no loads to display :( </div>;
  }

  return (
    <table className="min-w-full text-left text-sm">
      <TableHeader />
      <tbody>
        {data.map((load) => (
          <TableRow key={load.id} load={load} onEdit={openEditModal} onDelete={openDeleteModal} />
        ))}
      </tbody>
    </table>
  );
}
