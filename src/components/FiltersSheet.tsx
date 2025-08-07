import { DB_EDDOC, IconVariants } from "@/utils/enums";
import SvgIcon from "./SvgIcon";

type FilterSheetProps = {
  isOpen: boolean;
  dbType: DB_EDDOC;
  setDbType: React.Dispatch<React.SetStateAction<DB_EDDOC>>;
  dateFrom: string;
  setDateFrom: React.Dispatch<React.SetStateAction<string>>;
  dateTo: string;
  setDateTo: React.Dispatch<React.SetStateAction<string>>;
  photoGrapher: string;
  setPhotoGrapher: React.Dispatch<React.SetStateAction<string>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
};
export default function FilterSheet({
  isOpen,
  dbType,
  setDbType,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  photoGrapher,
  setPhotoGrapher,
  errorMsg,
  setErrorMsg,
  onClose,
}: FilterSheetProps) {
  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "dateFrom") {
      if (value > dateTo && value !== "" && dateTo !== "")
        setErrorMsg("Date From cannot be greater than Date To");
      else {
        setErrorMsg("");
        setDateFrom(value.split("T")[0]);
      }
    } else if (name === "dateTo") {
      if (value < dateFrom && value !== "" && dateFrom !== "")
        setErrorMsg("Date To cannot be less than Date From");
      else {
        setErrorMsg("");
        setDateTo(value.split("T")[0]);
      }
    }
  }
  return (
    <>
      {isOpen && (
        <div className="fixed top-18 flex flex-col gap-4 px-6 min-w-1/4 w-1/4 min-h-screen bg-slate-50 shadow-2xl transform transition-all ease-linear duration-800 delay-100">
          <div className="flex justify-between items-center px-2 py-4 border-b border-slate-400">
            <div className="text-xl font-bold font-serif">Filters</div>
            <SvgIcon
              onClick={onClose}
              name="close-xmark"
              alt="Close"
              fill={`text-slate-400 hover:bg-slate-200 hover:text-slate-50`}
              variant={IconVariants.X_LARGE}
              className="w-8 h-8 cursor-pointer text-slate-400 hover:text-slate-250"
            />
          </div>
          <div className="flex flex-col gap-5 justify-center">
            <div className="text-sm font-semibold">DB Type</div>
            <div className="flex flex-wrap gap-3 items-center">
              <div
                onClick={() => setDbType(DB_EDDOC.STOCK)}
                className={`px-4 py-2 cursor-pointer rounded ${
                  dbType === DB_EDDOC.STOCK
                    ? "bg-[#06B6D4] border-slate-50 text-white"
                    : "border border-[#a6edf9] hover:bg-[#a6edf9] hover:border-white text-slate-500"
                } `}
              >
                Stock
              </div>
              <div
                onClick={() => setDbType(DB_EDDOC.SPORT)}
                className={`px-4 py-2 cursor-pointer rounded ${
                  dbType === DB_EDDOC.SPORT
                    ? "bg-[#06B6D4] border-slate-50 text-white"
                    : "border border-[#a6edf9] hover:bg-[#a6edf9] hover:border-white text-slate-500"
                } `}
              >
                Sport
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 justify-center">
            <div className="text-sm font-semibold">Date From</div>
            <input
              name="dateFrom"
              type="date"
              value={dateFrom.toString().split("T")[0]}
              onChange={(e) => handleDateChange(e)}
              className="w-max px-1 py-2 text-sm text-center text-black rounded border"
            />
          </div>
          <div className="flex flex-col gap-5 justify-center">
            <div className="text-sm font-semibold">Date To</div>
            <input
              name="dateTo"
              type="date"
              value={dateTo.toString().split("T")[0]}
              onChange={(e) => handleDateChange(e)}
              className="w-max px-1 py-2 text-sm text-center text-black rounded border"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-sm font-semibold">Photo Grapher</div>
            <input
              type="text"
              value={photoGrapher}
              onChange={(e) => setPhotoGrapher(e.target.value.trim())}
              className="w-full px-1 py-2 text-sm outline-none text-black border-b border-slate-400 focus:border-[#06B6D4]"
            />
          </div>
          <span className="text-sm text-red-500">{errorMsg}</span>
        </div>
      )}
    </>
  );
}
