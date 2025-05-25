import { Load } from "@/types/load";
import { memo } from "react";
import { StatusBadge } from "./StatusBadged";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


const TableRow = memo(({ load, onEdit, onDelete }: { load: Load, onEdit: (load: Load) => void, onDelete: (load: Load) => void }) => {
    return (
        <tr className="border-b border-[#9ca3af] last:border-b-0">
          <td className="py-1 px-3">{load.id}</td>
          <td className="py-1 px-3"><StatusBadge status={load.status} /></td>
          <td className="py-1 px-3">{load.origin}</td>
          <td className="py-1 px-3">{load.destination}</td>
          <td className="py-1 px-3">{load.client_name}</td>
          <td className="py-1 px-3">{load.carrier_name}</td>
          <td className="flex justify-center">
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(load)}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(load.id)}>
                <Trash className="w-4 h-4 mr-2" />
                Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          </td>
        </tr>
      )
});

export default TableRow;
