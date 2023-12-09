import { HiDotsVertical } from 'react-icons/hi';
import friends1 from '../../assets/friends1.png'
import friends2 from '../../assets/friends2.png'
import friends3 from '../../assets/friends3.png'
import friends4 from '../../assets/friends4.png'

import  { React, useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";


function FriendRequest() {

  const userData = useSelector((state)=> state.user.userInfo);
  const db = getDatabase();
  const database = getDatabase();
  const [userReqData, setUserReqData] = useState([]);


  useEffect(()=>{
    const userReqRef = ref(db, 'userRequest');
    onValue(userReqRef, (snapshot) => {
      let arrays =[]
      snapshot.forEach((item)=>{

        if(item.val().rechiverId == userData.uid){
         arrays.push({...item.val(), key: item.key});
       }

      })
      setUserReqData(arrays)
    });
    // console.log(userReqData);
  },[])

  const handelAccpet = (item) =>{
    console.log(item);
    set(push(ref(db, 'friend/')), {

      ...item
      // senderName: userData.displayName,
      // senderId: userData.uid,
      // receiverName: item.username,
      // receiverEmail: item.email,
      // rechiverId: item.userid
    }).then(()=>{
      remove(ref(db, 'userRequest/' + item.key))
    })
  }

  return (
    <div className="shadow-lg bg-white h-[440px] rounded-[20px] py-[19px] border px-[15px]">
      <div className="flex justify-between items-center">
        <span className=" text-xl font-Poppins font-semibold text-black">
          Friend Request
        </span>
        <HiDotsVertical className=" cursor-pointer text-xl text-[#5F35F5]"/>
      </div>


      <div className="mt-7">
        {
          userReqData.map((item)=>(
            <div className="flex justify-between items-center border-b-2 last:border-b-0 py-3">
              <div className="w-[50px] h-[50px] rounded-full">
                <img src={item.img} alt=""/>
              </div>

              <div>
                <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none cursor-pointer">{item.senderName}</h3>
                <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1" >Good to see you.</p>
              </div>

              <div>
                <button onClick={()=>handelAccpet(item)} className="w-[87px] h-[30px] bg-[#5F35F5] border-0 font-Poppins text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">Accept</button>
              </div>
            </div>
          ))
        }
        
      </div>

    </div>
  );
}

export default FriendRequest;
