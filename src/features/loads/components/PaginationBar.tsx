import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
  } from "@/components/ui/pagination"
  import { useLoadContext } from "@/features/loads/context/LoadContext"
  
  interface Props {
    totalItems: number
  }
  
  export function PaginationBar({ totalItems }: Props) {
    const { page, setPage, pageSize } = useLoadContext()
  
    const totalPages = Math.ceil(totalItems / pageSize)
  
    if (totalPages <= 1) return null
  
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => page > 1 && setPage(page - 1)}
            >
                <span className="sr-only">Previous</span> {/* for accessibility */}
            </PaginationPrevious>
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? 'text-black' : ''}

              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => page < totalPages && setPage(page + 1)}
            >
                <span className="sr-only">Next</span> {/* for accessibility */}
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  