import {useEffect, useState} from "react";
import { HiDotsVertical } from 'react-icons/hi';
import friends1 from '../../assets/friends1.png'
import friends2 from '../../assets/friends2.png'
import friends3 from '../../assets/friends3.png'
import friends4 from '../../assets/friends4.png'

import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";

const BlockedUsers = () => {
  const userData = useSelector((state)=> state.user.userInfo);
  const db = getDatabase();
  const database = getDatabase();
  const [blockList, setBlockList] = useState([])

  useEffect(()=>{
    const blockRef = ref(db, 'Block/');
    onValue(blockRef, (snapshot) => {
      let arrays =[]
      snapshot.forEach((item)=>{

        console.log(item.val(),"Block");
        if(item.val().blockById == userData.uid){
          arrays.push({
            id: item.key,
            block: item.val().block,
            blockId: item.val().blockId
          })
        }else{
          arrays.push({
            id: item.key,
            blockBy: item.val().blockBy,
            blockById: item.val().blockById
          })
        }

      })

      setBlockList(arrays)
      // console.log(arrays);
    });
    // console.log(userData);
  },[])

  const handelRequest = (item) =>{
    console.log(item,'item');
    set(push(ref(db, 'friend/')), {
      senderName: userData.displayName,
      senderId: userData.uid,
      receiverName: item.block,
      rechiverId: item.blockId 
    }).then(()=>{
      remove(ref(db, 'Block/' + item.id),)
    })
  }

  return (
    <div className="shadow-lg bg-white h-[440px] rounded-[20px] py-[19px] border px-[15px]">
      <div className="flex justify-between items-center">
        <span className=" text-xl font-Poppins font-semibold text-black">
          Blocked Users{" "}
        </span>
        <HiDotsVertical className=" cursor-pointer text-xl text-[#5F35F5]"/>
      </div>

      <div className="mt-7">

        {
          blockList.map((item)=>(
            <div className="flex justify-between items-center border-b-2 last:border-b-0 py-3 cursor-pointer">
              <div className="w-[50px] h-[50px] rounded-full mr-4">
                <img src={friends1} alt=""/>
              </div>

              <div>
                <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">{item.block}</h3>
                <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">{item.blockBy}</h3>
                <p className="text-[#ABABAB] font-Poppins text-[14px] font-bold pt-1" >Good to see you.</p>
              </div>

              <div>
                {
                  !item.blockById &&
                  <button onClick={()=>handelRequest(item)} className="w-[87px] h-[30px] bg-[#5F35F5] border-0 font-Poppins text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">unblock</button>

                }
              </div>
            </div>
          ))
        }

        
      </div>
    </div>
  );
};

export default BlockedUsers;
