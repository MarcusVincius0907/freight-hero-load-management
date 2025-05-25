import { LoadStatus } from "@/types/load"


export const StatusBadge = ({ status }: { status: LoadStatus }) => {

    const colorMap: Record<LoadStatus, string> = {
        'in route': 'bg-yellow-500',
        'pick up': 'bg-blue-500',
        'delivered': 'bg-green-600',
    }

    return (
        <span className={`px-2 py-1 rounded-full text-xs text-white ${colorMap[status]}`}>
            {status}
        </span>
    )
}