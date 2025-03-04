"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const creactPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className=" mt-12 flex justify-between  w-full items-center">
      <button
        className="rounded-md bg-narsa text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasPrev}
        onClick={() => creactPageUrl(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="rounded-md bg-narsa text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasNext}
        onClick={() => creactPageUrl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
