import { LoadStatus } from '@/types/load';

export const StatusBadge = ({ status }: { status: LoadStatus }) => {
  const colorMap: Record<LoadStatus, string> = {
    'in route': 'bg-surface text-text border border-yellow-700',
    'pick up': 'bg-primary  text-black border border-blue-700',
    'delivered': 'bg-surface text-text border border-green-700'
  };

  return <span className={`px-2 py-1 rounded-full text-xs text-white ${colorMap[status]}`}>{status}</span>;
};
