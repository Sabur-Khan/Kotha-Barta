import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical } from 'react-icons/hi';

const SerchBox = () => {
  return (
    <div className="lg:mt-0 md:mt-4 mt-5">
      <span className="relative">
        <input className="w-full h-[59px] font-Poppins text-base font-medium rounded-[19px] shadow-lg outline-none border-white/50 pl-[36px] pr-[22px]" placeholder="Search" type="search" />
        <button className=" absolute left-2 text-xl top-1">
            <FiSearch/>
        </button>
        <button className=" absolute right-2 text-xl top-1 text-[#5F35F5]">
            <HiDotsVertical/>
        </button>
      </span>
    </div>
  );
};

export default SerchBox;
