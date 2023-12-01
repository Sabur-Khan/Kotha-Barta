import React, { useEffect, useState } from "react";
import { HiDotsVertical } from 'react-icons/hi';
import friends1 from '../../assets/friends1.png'
import friends2 from '../../assets/friends2.png'
import friends3 from '../../assets/friends3.png'
import friends4 from '../../assets/friends4.png'

import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { activeChat } from "../../userSlice/activeChatSlice";

const Friends = () => {

  const userData = useSelector((state)=> state.user.userInfo);
  const db = getDatabase();
  const database = getDatabase();
  const dispatch = useDispatch()
  const [friedsList, setFriedsList] = useState([])

  
  useEffect(()=>{
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let arrays =[]
      snapshot.forEach((item)=>{

        // console.log(item.val(),"friendS");
        

        if(userData.uid == item.val().rechiverId || userData.uid == item.val().senderId){
          arrays.push({...item.val(), key: item.key})
        }

      })

     setFriedsList(arrays)
      //  console.log(arrays);
    });
    // console.log(userData);
  },[])

  const handelBlock = (item) =>{
    console.log(item,"Block");
    if(userData.uid == item.senderId){
      set(push(ref(db, 'Block/')), {
        block: item.receiverName,
        blockId: item.rechiverId,
        blockBy: item.senderName,
        blockById: item.senderId
      }).then(()=>{
        remove(ref(db, 'friend/' + item.key))
      })
    }else{
      set(push(ref(db, 'Block/')), {
        block: item.senderName,
        blockId: item.senderId,
        blockBy: item.receiverName,
        blockById: item.rechiverId
      }).then(()=>{
        remove(ref(db, 'friend/' + item.key))
      })
    }
  }
  
  const handelActive = (item) =>{
    console.log(item);
    if(item.rechiverId == userData.uid){
      dispatch(activeChat({status:'singel', id: item.senderId, name: item.senderName}))
    }else{
      dispatch(activeChat({status:'singel', id: item.rechiverId, name: item.receiverName}))
    }
  }

  return (
    <div className="shadow-lg bg-white h-[440px] rounded-[20px] border py-[24px] px-[15px] overflow-y-auto">

      <div className="flex justify-between items-center mb-[34px]">
        <span className=" text-xl font-Poppins font-semibold text-black">
          Friends
        </span>
        <HiDotsVertical className=" cursor-pointer text-xl text-[#5F35F5]"/>
      </div>

      {
        friedsList.map((item)=> (
          <div>
            <div onClick={()=>handelActive(item)} className=" flex gap-5 w-full border-b-2 last:border-b-0 py-3 cursor-pointer">
              <div className="w-[50px] h-[50px] rounded-full">
                <img src={friends1} alt=""/>
              </div>

              <div className="flex justify-between items-center w-[80%]">

                <div>
                  <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">
                    {
                      userData.uid == item.senderId ? item.receiverName : item.senderName
                    }
                  </h3>
                  <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1">Hi Guys, Wassap !</p>
                </div>

                <div>
                  <button onClick={()=> handelBlock (item)} className="bg-[#5F35F5] border-0 font-Poppins font-semibold text-[14px] px-2 py-2 hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">
                    Block
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      }

      
    </div>
  );
};

export default Friends;
