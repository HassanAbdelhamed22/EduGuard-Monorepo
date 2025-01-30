import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/Pagination";

const PaginationLogic = ({pagination, handlePageChange}) => {
  return (
    <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                pagination.current_page > 1 &&
                handlePageChange(pagination.current_page - 1)
              }
              className={
                pagination.current_page <= 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(
            (page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={page === pagination.current_page}
                  className={`${
                    page === pagination.current_page ? "" : "cursor-pointer"
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                pagination.current_page < pagination.total_pages &&
                handlePageChange(pagination.current_page + 1)
              }
              className={
                pagination.current_page >= pagination.total_pages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  )
}

export default PaginationLogic