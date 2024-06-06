"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React from "react";

const Filter = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    console.log(name, value);
    params.set(name, value);
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-5 flex-wrap">
        <select
          name="type"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option value="">Default</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <select
          name="cat"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option value="">Category</option>
          <option value="new_arrival">New Arrival</option>
          <option value="popular">Popular</option>
        </select>
        <select
          name="allFilters"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option value="">All Filters</option>
          {/* Add more filter options if needed */}
        </select>
      </div>
      <select
        name="sort"
        className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
        onChange={handleFilterChange}
      >
        <option value="">Sort By</option>
        <option value="price_low_to_high">Price (low to high)</option>
        <option value="price_high_to_low">Price (high to low)</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default Filter;

// "use client";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";

// import React from "react";

// const Filter = () => {
//   const pathName = usePathname();
//   const searchParams = useSearchParams();
//   const { replace } = useRouter();
//   const handleFilterChange = (
//     e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
//   ) => {

//     const {name, value} = e.target
//     const params = new URLSearchParams(searchParams)
//     console.log(name, value)
//     params.set(name, value)
//     replace(`${pathName}?${params.toString()}`)
//   };

//   return (
//     <div className="mt-12 flex justify-between">
//       <div className="flex gap-5 flex-wrap">
//         <select
//           name="type"
//           id=""
//           className="py-2 px-4 rounded-2xl text-xs  font-medium bg-[#EBEDED]"
//           onClick={handleFilterChange}
//         >
//           <option>Default</option>
//           <option value="physical">Physical</option>
//           <option value="digital">Digital</option>
//         </select>
//         <input
//           type="text"
//           name="min"
//           placeholder="min price"
//           className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
//           onClick={handleFilterChange}
//         />
//         <input
//           type="text"
//           name="max"
//           placeholder="max price"
//           className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
//           onClick={handleFilterChange}
//         />
//         <select
//           name="cat"
//           id=""
//           className="py-2 px-4 rounded-2xl text-xs  font-medium bg-[#EBEDED]"
//           onClick={handleFilterChange}
//         >
//           <option>Category</option>
//           <option value="">New Arrival</option>
//           <option value="">Popular</option>
//         </select>
//         <select
//           name=""
//           id=""
//           className="py-2 px-4 rounded-2xl text-xs  font-medium bg-[#EBEDED]"
//         >
//           <option>All Filters</option>
//         </select>
//       </div>
//         <select
//           name="sort"
//           id=""
//           className="py-2 px-4 rounded-2xl text-xs  font-medium bg-[#EBEDED]"
//           onClick={handleFilterChange}
//         >
//           <option>Sort By</option>
//           <option value="">Price (low to high)</option>
//           <option value="">Price (high to low)</option>
//           <option value="">Newest</option>
//           <option value="">Oldest</option>
//         </select>
//     </div>
//   );
// };

// export default Filter;
