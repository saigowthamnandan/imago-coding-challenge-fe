import { IconVariants, SORT_ORDER } from "@/utils/enums";
import SvgIcon from "./SvgIcon";

export default function DateSort({
  dateSortOrder,
  setDateSortOrder,
}: {
  dateSortOrder: SORT_ORDER;
  setDateSortOrder: React.Dispatch<React.SetStateAction<SORT_ORDER>>;
}) {
  return (
    <div
      className="flex gap-1 p-2 select-none rounded bg justify-center items-center bg-[#06B6D4] text-white cursor-pointer"
      onClick={() =>
        setDateSortOrder(
          dateSortOrder === SORT_ORDER.NONE
            ? SORT_ORDER.ASC
            : dateSortOrder === SORT_ORDER.ASC
            ? SORT_ORDER.DESC
            : SORT_ORDER.NONE
        )
      }
    >
      <div className="text-xs font-semibold">Date</div>
      {dateSortOrder === SORT_ORDER.ASC && (
        <SvgIcon
          name="sort-asc"
          alt="Sort Ascending"
          fill="currentColor"
          variant={IconVariants.MEDIUM}
          className="w-3 h-3"
        />
      )}
      {dateSortOrder === SORT_ORDER.DESC && (
        <SvgIcon
          name="sort-desc"
          alt="Sort Descending"
          fill="currentColor"
          variant={IconVariants.MEDIUM}
          className="w-3 h-3"
        />
      )}
      {dateSortOrder === SORT_ORDER.NONE && (
        <SvgIcon
          name="sort"
          alt="Sort None"
          fill="currentColor"
          variant={IconVariants.MEDIUM}
          className="w-3 h-3"
        />
      )}
    </div>
  );
}
