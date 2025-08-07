import { useMemo } from "react";

interface PaginationProps {
  totalCount: number;
  rowsPerPage: number;
  siblingCount: number;
  presentPage: number;
}

const range = (start: number, end: number) => {
  const arr: (number | string)[] = [];
  for (let i = start; i < end + 1; i++) {
    arr.splice(arr.length, 0, i);
  }
  return arr;
};

export const usePagination = ({
  totalCount,
  rowsPerPage,
  siblingCount,
  presentPage,
}: PaginationProps) => {
  const paginationList: (number | string)[] = useMemo(() => {
    const pagesRequired = Math.ceil(totalCount / rowsPerPage);
    const paginationListCount = siblingCount + 5;

    if (paginationListCount < pagesRequired) {
      const leftSiblingIndex = Math.max(presentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        presentPage + siblingCount,
        pagesRequired
      );
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < pagesRequired - 2;
      const firstPageIndex = 1;
      const lastPageIndex = pagesRequired;
      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = range(1, leftItemCount);
        return [...leftRange, "...", pagesRequired];
      }
      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = range(
          pagesRequired - rightItemCount + 1,
          pagesRequired
        );
        return [firstPageIndex, "...", ...rightRange];
      }
      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
      }
    }
    return range(1, pagesRequired);
  }, [totalCount, rowsPerPage, siblingCount, presentPage]);
  return paginationList;
};
