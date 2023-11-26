import { useEffect, useState } from "react";
import { FiSearch } from 'react-icons/fi';
import { HiDotsVertical } from 'react-icons/hi';
import Group1 from '../../assets/Group1.png'
import Group2 from '../../assets/Group2.png'
import Group3 from '../../assets/Group3.png'
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const GroupsList = () => {
  const userData = useSelector((state)=> state.user.userInfo);
  const db = getDatabase();
  const [myGroupList, setMyGroupList] = useState([])

  useEffect(()=>{
    const groupRef = ref(db, 'Group/');
    onValue(groupRef, (snapshot) => {
      let arrays =[]
      snapshot.forEach((item)=>{

        arrays.push(item.val());

      })

      setMyGroupList(arrays)
      console.log(arrays);
    });
    // console.log(userData);
  },[])


  return (
    <div className="shadow-lg bg-white h-[340px] overflow-y-auto py-[19px] px-[15px] border rounded-[20px] mt-[43px]">

      <div className="flex justify-between items-center mb-4">
        <span className=" text-xl font-Poppins font-semibold text-black">
          Groups List
        </span>
        <HiDotsVertical className=" cursor-pointer text-xl text-[#5F35F5]"></HiDotsVertical>
      </div>

      {
        myGroupList.map((item)=>(
          <div className="flex justify-between items-center border-b-2 last:border-b-0 py-3 ">
            <div className="w-[50px] h-[50px] rounded-full">
              <img src={Group1} alt=""/>
            </div>


            <div className="flex justify-between items-center w-[80%]">
              <div>
                <small className=" font-nunito font-normal">Admin:  <small className="font-bold"> {item.adminName} </small> </small>
                <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none cursor-pointer">{item.groupName}</h3>
                <p className="text-[#ABABAB] font-Poppins text-[12px] pt-1" >{item.groupTagname}</p>
              </div>

              <div>
                <button className="w-[50px] h-[30px] bg-[#5F35F5] border-0 font-Poppins font-bold text-[15px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">Join</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default GroupsList;
