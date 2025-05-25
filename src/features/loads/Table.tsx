import { Load } from "@/types/load";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { useLoadContext } from "./LoadContext";

export default function Table({data}: {data: Load[]}) {
    const { openEditModal, openDeleteModal } = useLoadContext();
    return (
        <table className="min-w-full text-left text-sm">
            <TableHeader />
            <tbody>
                {data!.map((load) => (
                    <TableRow key={load.id} load={load} onEdit={openEditModal} onDelete={openDeleteModal} />
                ))}
            </tbody>
        </table>
    )
}