'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function usePagination(paramKey: string = 'page') {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get(paramKey) || '1', 10);

  const updatePage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(paramKey, newPage.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, paramKey, router],
  );

  const goToPage = useCallback(
    (newPage: number) => {
      updatePage(newPage);
    },
    [updatePage],
  );

  return {
    page,
    goToPage,
  };
}
