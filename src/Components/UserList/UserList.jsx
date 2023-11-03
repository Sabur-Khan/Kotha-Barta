import React from "react";
import { HiDotsVertical } from 'react-icons/hi';
import friends1 from '../../assets/friends1.png'
import friends2 from '../../assets/friends2.png'
import friends3 from '../../assets/friends3.png'
import friends4 from '../../assets/friends4.png'
import friends5 from '../../assets/friends5.png'
import {FiPlus} from 'react-icons/fi'

const UserList = () => {
  return (
    <div className="shadow-lg bg-white h-[440px] rounded-[20px] py-[19px] px-[15px] overflow-y-auto">
      <div className="flex justify-between items-center">
          <span className=" text-xl font-Poppins font-semibold text-black">
              User List
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
            <p className="text-[10px] font-Poppins font-bold text-gray-400 pt-1">Today, 8:56pm</p>
          </div>

          <div>
            <button className="w-[30px] h-[30px] flex justify-center items-center bg-[#5F35F5] border-0 font-Poppins font-semibold text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">
              <FiPlus/>
            </button>
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
            <p className="text-[10px] font-Poppins font-bold text-gray-400 pt-1">Today, 8:56pm</p>
          </div>

          <div>
            <button className="w-[30px] h-[30px] flex justify-center items-center bg-[#5F35F5] border-0 font-Poppins font-semibold text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">
              <FiPlus/>
            </button>
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
            <p className="text-[10px] font-Poppins font-bold text-gray-400 pt-1">Today, 8:56pm</p>
          </div>

          <div>
            <button className="w-[30px] h-[30px] flex justify-center items-center bg-[#5F35F5] border-0 font-Poppins font-semibold text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">
              <FiPlus/>
            </button>
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
            <p className="text-[10px] font-Poppins font-bold text-gray-400 pt-1">Today, 8:56pm</p>
          </div>

          <div>
            <button className="w-[30px] h-[30px] flex justify-center items-center bg-[#5F35F5] border-0 font-Poppins font-semibold text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">
              <FiPlus/>
            </button>
          </div>
        </div>
      </div>

      <div className=" flex gap-5 w-full border-b-2 last:border-b-0 py-3 cursor-pointer">
        <div className="w-[50px] h-[50px] rounded-full">
          <img src={friends5} alt=""/>
        </div>
        <div className="flex justify-between items-center w-[80%]">

          <div>
            <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">Marvin McKinney</h3>
            <p className="text-[10px] font-Poppins font-bold text-gray-400 pt-1">Today, 8:56pm</p>
          </div>

          <div>
            <button className="w-[30px] h-[30px] flex justify-center items-center bg-[#5F35F5] border-0 font-Poppins font-semibold text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">
              <FiPlus/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
