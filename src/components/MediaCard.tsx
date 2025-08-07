import Image from "next/image";

export type MediaItem = {
  _id: string;
  bildnummer: number;
  datum: string;
  fotografen: string;
  suchtext: string;
  thumbnail_url: string;
  highlight?: {
    title?: string;
    suchtext?: string;
  };
};

export default function MediaCard({ item }: { item: MediaItem }) {
  const { suchtext, thumbnail_url, highlight, datum, fotografen } = item;
  return (
    <div className="max-w-md max-h-md flex flex-col self-stretch justify-between bg-slate-200 p-4 rounded shadow-md">
      <Image
        src={thumbnail_url}
        alt={"Media Thumbnail"}
        width={200}
        height={350}
        loading="lazy"
        className="w-full h-full rounded mb-2"
      />
      <div className="flex flex-col text-sm gap-2 items-center">
        <div className="flex  gap-2 justify-between">
          <span className="font-bold">Date:</span>
          <span>{new Date(datum).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-2 flex-wrap justify-between">
          <span className="font-bold">Photographer:</span>
          <span>{fotografen}</span>
        </div>
        <p className="text-sm text-gray-600 text-wrap break-all italic">
          {highlight?.suchtext?.[0] || suchtext || ""}
        </p>
      </div>
    </div>
  );
}
