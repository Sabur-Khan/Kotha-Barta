import React from "react";
import { FiSearch } from 'react-icons/fi';
import { HiDotsVertical } from 'react-icons/hi';
import Group1 from '../../assets/Group1.png'
import Group2 from '../../assets/Group2.png'
import Group3 from '../../assets/Group3.png'

const GroupsList = () => {
  return (
    <div className="shadow-lg bg-white h-[340px] overflow-y-auto py-[19px] px-[15px] rounded-[20px] mt-[43px]">

      <div className="flex justify-between items-center mb-4">
        <span className=" text-xl font-Poppins font-semibold text-black">
          Groups List
        </span>
        <HiDotsVertical className=" cursor-pointer text-xl text-[#5F35F5]"></HiDotsVertical>
      </div>

      <div className="flex justify-between items-center border-b-2 last:border-b-0 py-3 cursor-pointer">
        <div className="w-[50px] h-[50px] rounded-full">
          <img src={Group1} alt=""/>
        </div>

        <div>
          <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">Friends Forever</h3>
          <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1" >Good to see you.</p>
        </div>

        <div>
          <button className="w-[87px] h-[30px] bg-[#5F35F5] border-0 font-Poppins text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">Join</button>
        </div>
      </div>

      <div className="flex justify-between items-center border-b-2 last:border-b-0 py-3 cursor-pointer">
        <div className="w-[50px] h-[50px] rounded-full">
          <img src={Group2} alt=""/>
        </div>

        <div>
          <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">Friends Reunion</h3>
          <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1" >Hi Guys, Wassup!</p>
        </div>

        <div>
          <button className="w-[87px] h-[30px] bg-[#5F35F5] border-0 font-Poppins text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">Join</button>
        </div>
      </div>

      <div className="flex justify-between items-center border-b-2 last:border-b-0 py-3 cursor-pointer">
        <div className="w-[50px] h-[50px] rounded-full">
          <img src={Group3} alt=""/>
        </div>

        <div>
          <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">Crazy Cousins</h3>
          <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1" >What plans today?</p>
        </div>

        <div>
          <button className="w-[87px] h-[30px] bg-[#5F35F5] border-0 font-Poppins text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">Join</button>
        </div>
      </div>

    </div>
  );
};

export default GroupsList;
