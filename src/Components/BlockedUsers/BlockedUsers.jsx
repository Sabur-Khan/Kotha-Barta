import React from "react";
import { HiDotsVertical } from 'react-icons/hi';
import friends1 from '../../assets/friends1.png'
import friends2 from '../../assets/friends2.png'
import friends3 from '../../assets/friends3.png'
import friends4 from '../../assets/friends4.png'

const BlockedUsers = () => {
  return (
    <div className="shadow-lg bg-white h-[440px] rounded-[20px] py-[19px] px-[15px]">
      <div className="flex justify-between items-center">
        <span className=" text-xl font-Poppins font-semibold text-black">
        Blocked Users{" "}
        </span>
        <HiDotsVertical className=" cursor-pointer text-xl text-[#5F35F5]"/>
      </div>

      <div className="mt-7">

        <div className="flex justify-between items-center border-b-2 last:border-b-0 py-3 cursor-pointer">
          <div className="w-[50px] h-[50px] rounded-full">
            <img src={friends1} alt=""/>
          </div>

          <div>
            <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">Friends Forever</h3>
            <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1" >Good to see you.</p>
          </div>

          <div>
            <button className="w-[87px] h-[30px] bg-[#5F35F5] border-0 font-Poppins text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">unblock</button>
          </div>
        </div>

        <div className="flex justify-between items-center border-b-2 last:border-b-0 py-3 cursor-pointer">
          <div className="w-[50px] h-[50px] rounded-full">
            <img src={friends2} alt=""/>
          </div>

          <div>
            <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">Friends Forever</h3>
            <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1" >Good to see you.</p>
          </div>

          <div>
            <button className="w-[87px] h-[30px] bg-[#5F35F5] border-0 font-Poppins text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">unblock</button>
          </div>
        </div>

        <div className="flex justify-between items-center border-b-2 last:border-b-0 py-3 cursor-pointer">
          <div className="w-[50px] h-[50px] rounded-full">
            <img src={friends3} alt=""/>
          </div>

          <div>
            <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">Friends Forever</h3>
            <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1" >Good to see you.</p>
          </div>

          <div>
            <button className="w-[87px] h-[30px] bg-[#5F35F5] border-0 font-Poppins text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">unblock</button>
          </div>
        </div>

        <div className="flex justify-between items-center border-b-2 last:border-b-0 py-3 cursor-pointer">
          <div className="w-[50px] h-[50px] rounded-full">
            <img src={friends4} alt=""/>
          </div>

          <div>
            <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">Friends Forever</h3>
            <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1" >Good to see you.</p>
          </div>

          <div>
            <button className="w-[87px] h-[30px] bg-[#5F35F5] border-0 font-Poppins text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">unblock</button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default BlockedUsers;
