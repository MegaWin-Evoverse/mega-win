import { cn } from '@/shared/lib/cn';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';
import { PAGE_OF_LABEL } from '../model/constants';

interface Props {
  activePage: number;
  totalPages: number;
  paginationPages: (number | 'ellipsis')[];
  onPageChange: (page: number) => void;
}

const BASE_BTN =
  'border-auth-surface bg-auth-bg transition-colors duration-200 hover:border-button-brand-bg-dark';

export function HistoryPagination({
  activePage,
  totalPages,
  paginationPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const isFirst = activePage === 1;
  const isLast = activePage === totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, activePage - 1))}
            aria-disabled={isFirst}
            className={cn(BASE_BTN, isFirst ? 'pointer-events-none opacity-40' : 'cursor-pointer')}
          />
        </PaginationItem>

        <li className="flex items-center px-2 text-sm text-muted-foreground sm:hidden">
          {activePage} {PAGE_OF_LABEL} {totalPages}
        </li>

        {paginationPages.map((page, idx) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${idx}`} className="hidden sm:flex">
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page} className="hidden sm:flex">
              <PaginationLink
                isActive={page === activePage}
                onClick={() => onPageChange(page)}
                className={cn(
                  BASE_BTN,
                  'cursor-pointer',
                  page === activePage
                    ? 'border-button-brand-bg-dark text-brand-green-to'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, activePage + 1))}
            aria-disabled={isLast}
            className={cn(BASE_BTN, isLast ? 'pointer-events-none opacity-40' : 'cursor-pointer')}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
