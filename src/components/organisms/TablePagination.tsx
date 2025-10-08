import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getDisplayPages = (
    current: number,
    total: number
  ): (number | "left-ellipsis" | "right-ellipsis")[] => {
    // Show all pages if total is small
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | "left-ellipsis" | "right-ellipsis")[] = [];

    pages.push(1);

    // Determine left ellipsis
    if (current > 4) {
      pages.push("left-ellipsis");
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 3) {
      pages.push("right-ellipsis");
    }

    pages.push(total);

    return pages;
  };

  const pages = getDisplayPages(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="cursor-pointer"
          />
        </PaginationItem>

        {/* Page numbers & ellipsis */}
        {pages.map((p, idx) => (
          <PaginationItem key={`${p}-${idx}`}>
            {typeof p === "number" ? (
              <PaginationLink
                isActive={p === currentPage}
                onClick={() => onPageChange(p)}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="cursor-pointer"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
