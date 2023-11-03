import React from "react";
import { HiDotsVertical } from 'react-icons/hi';
import friends1 from '../../assets/friends1.png'
import friends2 from '../../assets/friends2.png'
import friends3 from '../../assets/friends3.png'
import friends4 from '../../assets/friends4.png'
const Friends = () => {
  return (
    <div className="shadow-lg bg-white h-[440px] rounded-[20px] py-[24px] px-[15px] overflow-y-auto">

      <div className="flex justify-between items-center mb-[34px]">
        <span className=" text-xl font-Poppins font-semibold text-black">
          Friends
        </span>
        <HiDotsVertical className=" cursor-pointer text-xl text-[#5F35F5]"/>
      </div>

      <div className=" flex gap-5 w-full border-b-2 last:border-b-0 py-3 cursor-pointer">
        <div className="w-[50px] h-[50px] rounded-full">
          <img src={friends1} alt=""/>
        </div>
        <div className="flex justify-between items-center w-[80%]">

          <div>
            <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">Raghav</h3>
            <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1">Dinner?</p>
          </div>

          <div>
            <p className="text-[10px] font-Poppins font-bold text-gray-400">Today, 8:56pm</p>
          </div>
        </div>
      </div>

      <div className=" flex gap-5 w-full border-b-2 last:border-b-0 py-3 cursor-pointer">
        <div className="w-[50px] h-[50px] rounded-full">
          <img src={friends2} alt=""/>
        </div>
        <div className="flex justify-between items-center w-[80%]">

          <div>
            <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">Swathi</h3>
            <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1" >Sure!</p>
          </div>

          <div>
            <p className="text-[10px] font-Poppins font-bold text-gray-400">Today, 2:31pm</p>
          </div>
        </div>
      </div>

      <div className=" flex gap-5 w-full border-b-2 last:border-b-0 py-3 cursor-pointer">
        <div className="w-[50px] h-[50px] rounded-full">
          <img src={friends3} alt=""/>
        </div>
        <div className="flex justify-between items-center w-[80%]">

          <div>
            <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">Kiran</h3>
            <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1" >Hi.....</p>
          </div>

          <div>
            <p className="text-[10px] font-Poppins font-bold text-gray-400">Yesterday, 6:22pm</p>
          </div>
        </div>
      </div>

      <div className=" flex gap-5 w-full border-b-2 last:border-b-0 py-3 cursor-pointer">
        <div className="w-[50px] h-[50px] rounded-full">
          <img src={friends4} alt=""/>
        </div>
        <div className="flex justify-between items-center w-[80%]">

          <div>
            <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">Tejeshwini C</h3>
            <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1" >I will call him today.</p>
          </div>

          <div>
            <p className="text-[10px] font-Poppins font-bold text-gray-400">Today, 12:22pm</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Friends;
