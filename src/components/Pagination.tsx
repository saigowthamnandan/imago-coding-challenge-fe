import React from "react";
import { usePagination } from "@/hooks/usePagination";
import Image from "next/image";

type propsType = {
  presentPage: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (a: number) => void;
};

export default function Pagination(props: propsType) {
  const { onPageChange, totalCount, presentPage, rowsPerPage } = props;
  const siblingCount = 1;
  const paginationList = usePagination({
    presentPage,
    totalCount,
    siblingCount,
    rowsPerPage,
  });
  const lastPage = paginationList[paginationList.length - 1];
  return (
    <div className="w-max flex gap-3 md:gap-4 items-center">
      <button
        onClick={() => {
          if (presentPage != 1) onPageChange(presentPage - 1);
        }}
        className="flex items-center cursor-pointer"
      >
        <Image
          src="/left-arrow.svg"
          alt="Left Arrow"
          width={16}
          height={16}
          className="w-4 h-4 text-amber-950 "
        />
      </button>
      {paginationList.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <div key={index} className="text-nowrap">
              {". . ."}
            </div>
          );
        }
        return (
          <button
            key={index}
            style={{
              background: pageNumber === presentPage ? "#06B6D4" : "",
              border: pageNumber === presentPage ? "1px solid white" : "",
              fontWeight: pageNumber === presentPage ? "900" : "normal",
            }}
            className={`font-semibold cursor-pointer px-4 py-1 rounded transition-colors duration-200 ${
              pageNumber === presentPage
                ? "text-white hover:bg-[#06B6D4] hover:text-white"
                : "hover:bg-[#a6edf9] border border-[#a6edf9] hover:border-white text-slate-500"
            }`}
            onClick={() => {
              if (typeof pageNumber == "number") onPageChange(pageNumber);
            }}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        onClick={() => {
          if (presentPage != lastPage) onPageChange(presentPage + 1);
        }}
        className="flex items-center cursor-pointer"
      >
        <Image
          src="/right-arrow.svg"
          alt="Right Arrow"
          width={16}
          height={16}
          className="w-4 h-4 text-amber-950"
        />
      </button>
    </div>
  );
}
