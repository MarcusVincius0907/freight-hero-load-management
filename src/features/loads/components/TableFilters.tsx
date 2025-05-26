import { Input } from '@/components/ui/input';
import { useLoadContext } from '../context/LoadContext';
import SelectFilter from './SelectFilter';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { ColumnFilters } from '@/types/load';

export default function TableFilters({ options }: { options: { [key: string]: string[] } }) {
  const { search, setSearch, clearFilters } = useLoadContext();
  const [tempSearch, setTempSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(tempSearch);
    }, 300);

    return () => clearTimeout(handler);
  }, [tempSearch, setSearch]);

  const handleClearFilters = () => {
    clearFilters();
    setTempSearch('');
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:items-end w-full">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search"
          className="w-full pl-9"
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
        />
      </div>
      {Object.entries(options).map(([field, items]) => (
        <SelectFilter key={field} field={field as keyof ColumnFilters} label={field.replace('_', ' ')} items={items} />
      ))}
      <Button onClick={handleClearFilters}>Clear All</Button>
    </div>
  );
}
