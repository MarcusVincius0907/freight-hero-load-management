export default function EmptyState() {
  return (
    <div className="text-center text-gray-400 p-8">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-xl font-semibold">No Loads Found</h3>
        <p className="text-gray-500">There are currently no loads available to display. This could be due to:</p>
        <ul className="text-gray-500 list-disc text-left">
          <li>No loads have been created yet</li>
          <li>Your search filters returned no results</li>
          <li>There may be a connection error</li>
        </ul>
        <p className="text-gray-500">Try adjusting your filters or creating a new load.</p>
      </div>
    </div>
  );
}
