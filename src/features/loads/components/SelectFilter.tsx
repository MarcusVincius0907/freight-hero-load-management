import { SelectItem } from '@/components/ui/select';

import { SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Select } from '@/components/ui/select';
import { useLoadContext } from '../context/LoadContext';
import { ColumnFilters } from '@/types/load';

interface SelectFilterProps {
  field: keyof ColumnFilters;
  label: string;
  items: string[];
}

export default function SelectFilter({ field, label, items }: SelectFilterProps) {
  const { columnFilters, setColumnFilters } = useLoadContext();

  const handleChange = (value: string) => {
    setColumnFilters((prev: ColumnFilters) => ({
      ...prev,
      [field]: value === 'all' ? [] : [value]
    }));
  };

  return (
    <div className="w-full">
      <Select value={columnFilters[field]?.[0] ?? ''} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="all" value="all">
            All
          </SelectItem>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
