'use client';
import { useCallback, useEffect, useRef } from 'react';

type UseLoadMoreOptions = {
  hasNextPage: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
};

export function useLoadMore({
  hasNextPage,
  isLoading,
  onLoadMore,
}: UseLoadMoreOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const setLoadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      if (node && hasNextPage && !isLoading) {
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              onLoadMore();
            }
          },
          {
            threshold: 0.5,
          },
        );

        observerRef.current.observe(node);
      }

      loadMoreRef.current = node;
    },
    [hasNextPage, isLoading, onLoadMore],
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { setLoadMoreRef };
}
