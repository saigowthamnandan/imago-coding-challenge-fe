"use client";

import Header from "@/components/Header";
import MediaCard, { MediaItem } from "@/components/MediaCard";
import Pagination from "@/components/Pagination";
import Select from "@/components/Select";
import { DB_EDDOC, IconVariants, SORT_ORDER } from "@/utils/enums";
import { useCallback, useEffect, useState } from "react";
import SvgIcon from "@/components/SvgIcon";
import FilterSheet from "@/components/FiltersSheet";
import DateSort from "@/components/DateSort";

export default function SearchInput() {
  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<MediaItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [dbType, setDbType] = useState<DB_EDDOC>(DB_EDDOC.SPORT);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [photoGrapher, setPhotoGrapher] = useState<string>("");
  const [dateSortOrder, setDateSortOrder] = useState<SORT_ORDER>(
    SORT_ORDER.NONE
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isScrollLayout, setIsScrollLayout] = useState<boolean>(false);
  const [scrollId, setScrollId] = useState<string>("");

  const fetchData = useCallback(() => {
    setLoading(true);
    const controller = new AbortController();
    const searchParam = new URLSearchParams({
      query,
      page: page.toString(),
      // pagesize: isScrollLayout ? "50" : pageSize.toString(),
      pagesize: pageSize.toString(),
      db: dbType,
      datefrom: dateFrom,
      dateto: dateTo,
      fotografen: photoGrapher,
      datesort: dateSortOrder,
      // isscroll: isScrollLayout.toString(),
      // scrollid: scrollId,
    });
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/media/search?${searchParam}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (isScrollLayout) {
          if (data.results.length > 0) {
            // Append new data to existing data
            setResults((prevData) => [...prevData, ...data.results]);
            // Update scroll ID for next fetch
            setScrollId(data.scrollid);
          }
        } else {
          setResults(data.results);
          setTotalPages(data.total);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [
    query,
    page,
    pageSize,
    dbType,
    dateFrom,
    dateTo,
    photoGrapher,
    dateSortOrder,
    isScrollLayout,
    // scrollId,
  ]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQuery(input);
      setPage(1);
    }, 500);
    return () => clearTimeout(debounce);
  }, [input]);

  useEffect(() => {
    fetchData();
  }, [
    query,
    page,
    pageSize,
    dbType,
    dateFrom,
    dateTo,
    photoGrapher,
    dateSortOrder,
    isScrollLayout,
    scrollId,
    fetchData,
  ]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.scrollHeight
      ) {
        // Trigger scroll if we're at the bottom of the page
        fetchData();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollId, loading, fetchData]);

  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <Header />
      <div
        className={`flex mt-22 ${isFilterSheetOpen ? "pr-10" : "px-10"} w-full`}
      >
        <FilterSheet
          isOpen={isFilterSheetOpen}
          dbType={dbType}
          setDbType={setDbType}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          photoGrapher={photoGrapher}
          setPhotoGrapher={setPhotoGrapher}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          onClose={() => setIsFilterSheetOpen(false)}
        />
        <div
          className={`flex flex-col gap-4 w-full items-center justify-center ${
            isFilterSheetOpen && "ml-[30%]"
          }`}
        >
          <div className="flex gap-4 items-center w-full">
            <div
              onClick={() => {
                setIsFilterSheetOpen(!isFilterSheetOpen);
              }}
              className="flex text-sm font-semibold items-center text-white cursor-pointer bg-[#06B6D4] p-1 py-2 gap-1 rounded hover:bg-slate-200 hover:text-slate-500 shadow-md transition-colors duration-400 ease-in-out"
            >
              <div className="w-max">
                {isFilterSheetOpen ? "Hide Filters" : "Show Filters"}
              </div>
              <SvgIcon
                name="filter"
                alt="Filter"
                fill="currentColor"
                variant={IconVariants.MEDIUM}
                className="w-4 h-4"
              />
            </div>
            <input
              name="search"
              type="text"
              placeholder="Search media..."
              className="border p-2 w-full outline-none rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <DateSort
              dateSortOrder={dateSortOrder}
              setDateSortOrder={setDateSortOrder}
            />
            {/* This component is for switching the layout but turned off for now as this coding challenge user doesn't have access to scroll API so we can't use it */}

            {/* <div className="flex justify-between items-center border-2 border-[#06B6D4] rounded cursor-pointer">
              <SvgIcon
                name="grid"
                alt="Grid"
                className={`w-6 h-6 p-1 ${
                  !isScrollLayout && "text-white bg-[#06B6D4]"
                }`}
                fill="CurrentColor"
                variant={IconVariants.LARGE}
                onClick={() => setIsScrollLayout(false)}
              />
              <SvgIcon
                name="ellipsis"
                alt="Ellipsis"
                fill="currentColor"
                variant={IconVariants.LARGE}
                className={`w-6 h-6 ${
                  isScrollLayout && "text-white bg-[#06B6D4]"
                }`}
                onClick={() => setIsScrollLayout(true)}
              />
            </div> */}
          </div>
          {totalPages > 1 && !isScrollLayout && (
            <div className="flex gap-4 w-full justify-between items-center">
              <div className="text-sm">
                Showing page {page} of {totalPages} results
              </div>
              <div className="flex gap-4 justify-center items-center">
                <Pagination
                  presentPage={page}
                  rowsPerPage={pageSize}
                  totalCount={totalPages}
                  onPageChange={setPage}
                />
                <Select
                  value={pageSize.toString()}
                  options={[
                    { displayKey: "10", displayValue: "10" },
                    { displayKey: "20", displayValue: "20" },
                    { displayKey: "30", displayValue: "30" },
                  ]}
                  onChange={(value) => {
                    setPageSize(Number(value));
                    setPage(1);
                  }}
                  className="w-max max-w-md px-0 pr-2 py-2 text-sm hover:border-[#a6edf9] rounded"
                  name="Page Size"
                  displayKey="displayKey"
                  displayValue="displayValue"
                />
              </div>
            </div>
          )}
          {results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {results.map((item) => (
                <MediaCard key={`${item.bildnummer}}`} item={item} />
              ))}
            </div>
          )}
          {totalPages > 1 && !isScrollLayout && (
            <div className="mt-4 mb-6">
              <Pagination
                presentPage={page}
                rowsPerPage={pageSize}
                totalCount={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
