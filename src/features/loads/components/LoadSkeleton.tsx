import { Skeleton } from '@/components/ui/skeleton';

export default function LoadSkeleton() {
  return (
    <div className="w-full">
      <div className="flex gap-4 md:flex-row flex-col h-full w-full max-w-screen-lg bg-[#1e1e1e] border border-[#9ca3af] text-white rounded-lg p-4 mt-10">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col h-full w-full max-w-screen-lg bg-[#1e1e1e] border border-[#9ca3af] text-white rounded-lg p-4 mt-5">
        <div className="text-black mb-3">
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="w-full rounded-lg overflow-x-auto bg-surface">
          <Skeleton className=" h-96 w-full" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
}
