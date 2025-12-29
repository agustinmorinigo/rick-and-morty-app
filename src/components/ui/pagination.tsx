'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({ page, totalPages, onPageChange, isLoading = false }: PaginationProps) {
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return (
    <div className='flex items-center gap-2'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPreviousPage || isLoading}
        className='h-8 w-8'
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>

      <span className='text-sm text-muted-foreground min-w-16 text-center'>
        {page} / {totalPages}
      </span>

      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage || isLoading}
        className='h-8 w-8'
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
}
