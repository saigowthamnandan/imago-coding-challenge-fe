import Image from "next/image";

export default function Header() {
  return (
    <div className="fixed top-0 h-18 bg-white flex justify-between w-full items-center px-10 mx-auto border-none border-slate-400 shadow-lg">
      <Image
        src="/imago-logo.svg"
        alt="Logo"
        width={100}
        height={100}
        className="w-16 h-16"
      />
      <div className="text-3xl font-bold font-serif">Imago Media Search</div>
      <div></div>
    </div>
  );
}
