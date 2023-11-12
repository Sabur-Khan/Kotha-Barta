import  { React, useEffect, useState } from "react";
import { HiDotsVertical } from 'react-icons/hi';
import friends1 from '../../assets/friends1.png'
import friends2 from '../../assets/friends2.png'
import friends3 from '../../assets/friends3.png'
import friends4 from '../../assets/friends4.png'
import friends5 from '../../assets/friends5.png'
import {FiPlus} from 'react-icons/fi'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  const userData = useSelector((state)=> state.user.userInfo);
  const db = getDatabase();
  const database = getDatabase();
  const [listData, setListData] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friendList, setFriendtList] = useState([]);

  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arrays =[]
      snapshot.forEach((item)=>{
        if(userData.uid !== item.key){
          arrays.push({...item.val(), userid: item.key})
        }
      })
     setListData(arrays)
    });
    console.log(userData);
  },[])

  const handelRequest = (item) =>{
    console.log(item,'item');
    set(push(ref(db, 'userRequest/')), {
      senderName: userData.displayName,
      senderId: userData.uid,
      receiverName: item.username,
      receiverEmail: item.email,
      rechiverId: item.userid
    });
  }

  useEffect(()=>{

    const friendReqRef = ref(db, 'userRequest');

    onValue(friendReqRef, (snapshot) => {
      let arrays =[]
      snapshot.forEach((item)=>{
        arrays.push(item.val().rechiverId + item.val().senderId);
      })
     setFriendRequestList(arrays)
    });
  },[])
  // console.log(friendRequestList);

  useEffect(()=>{

    const friendLis = ref(db, 'friend/');

    onValue(friendLis, (snapshot) => {
      let arrays =[]
      snapshot.forEach((item)=>{
        arrays.push(item.val().rechiverId + item.val().senderId);
      })
      setFriendtList(arrays)
    });
  },[])

  return (
    <div className="shadow-lg bg-white h-[440px] rounded-[20px] py-[19px] px-[15px] overflow-y-auto">

      <div className="flex justify-between items-center">
        <span className=" text-xl font-Poppins font-semibold text-black">
          User List
        </span>
        <HiDotsVertical className=" cursor-pointer text-xl text-[#5F35F5]"/>
      </div>
      {
        listData.map((item) =>(
          <div className=" flex gap-5 w-full border-b-2 last:border-b-0 py-3 cursor-pointer">
            <div className="w-[50px] h-[50px] rounded-full">
              <img src={userData.photoURL} alt=""/>
            </div>
            <div className="flex justify-between items-center w-[80%]">

              <div>
                <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none">{item.username}</h3>
                <p className="text-[10px] font-Poppins font-bold text-gray-400 pt-1">{item.email}</p>
              </div>

              <div>
                {
                  friendList.includes(item.userid + userData.uid) ||
                  friendList.includes(userData.uid + item.userid)
                  ?
                  <button className="bg-[#5F35F5] border-0 font-Poppins font-semibold text-[14px] px-2 py-2 hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">
                    Friend
                  </button>
                  :
                  <>
                    {
                      friendRequestList.includes(item.userid + userData.uid) ||
                      friendRequestList.includes(userData.uid + item.userid)

                      ?
                      <button className="bg-[#5F35F5] border-0 font-Poppins font-semibold text-[14px] px-2 py-2 hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">
                        Pending
                      </button>
                      :
                      <button onClick={()=> handelRequest(item)} className="w-[30px] h-[30px] flex justify-center items-center bg-[#5F35F5] border-0 font-Poppins font-semibold text-[20px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">
                        <FiPlus/>
                      </button>
                    }
                  </>
                }

                
              </div>
            </div>
          </div>
        ))
      }
      
    </div>
  );
};

export default UserList;
