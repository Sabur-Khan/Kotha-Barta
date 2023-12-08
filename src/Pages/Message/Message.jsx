import Friends from "../../Components/Friends/Friends"
import MyGroups from "../../Components/MyGroups/MyGroups"
import SaideBar from "../../Components/SideBar/SaideBar"
import friends1 from '../../assets/friends1.png'
import { HiDotsVertical } from 'react-icons/hi';
import { BsFillTriangleFill } from "react-icons/bs";
import { IoMdHappy } from "react-icons/io";
import { HiOutlineCamera } from "react-icons/hi2";
import { BsFillSendFill } from "react-icons/bs";
import ModalImage from "react-modal-image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import moment from 'moment';
import { getStorage, ref as fileref, uploadBytes, getDownloadURL } from "firebase/storage";
import EmojiPicker from 'emoji-picker-react';


const Message = () => {
    const dispatch = useDispatch();
    const db = getDatabase();
    const storage = getStorage();
    const userData = useSelector((state)=> state.user.userInfo);
    const activeChat = useSelector(state => state.activeChatSlice.active);
    const [message, setMessage] = useState('')
    const [singelMessage, setSingelMessage] = useState([])
    const [emoji, setEmoji] = useState(false)


    const handelSendMsg = () =>{
        if(activeChat.status == 'singel'){
            set(push(ref(db, "singelMsg/")), {
                msg: message,
                whosendID: userData.uid,
                whosendName: userData.displayName,
                whorechivedID: activeChat.id,
                whorechivedName: activeChat.name,
                date: `${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}, ${new Date().getHours()}: ${new Date().getMinutes()}`
            });
        }else{
            console.log("ami group");
        }
    }

    useEffect(()=>{
        const singelMsgRef = ref(db, "singelMsg/");
        onValue(singelMsgRef, (snapshot) => {
            let arrays = []
            snapshot.forEach((item)=>{
                if((item.val().whosendID == userData.uid && item.val().whorechivedID == activeChat.id) 
                 || (item.val().whorechivedID == userData.uid && item.val().whosendID == activeChat.id )
                 ){

                     arrays.push(item.val())
                }
            })
            setSingelMessage(arrays)
        });
    },[activeChat.id])
    console.log(singelMessage );
    // console.log(singelMessage );

    const handelImage =(e)=>{
        const storageRef = fileref(storage, 'some-child');

        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(storageRef).then((downloadURL) => {
                console.log('File available at', downloadURL);
                set(push(ref(db, "singelMsg/")), {
                    img: downloadURL,
                    whosendID: userData.uid,
                    whosendName: userData.displayName,
                    whorechivedID: activeChat.id,
                    whorechivedName: activeChat.name,
                    date: `${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}, ${new Date().getHours()}: ${new Date().getMinutes()}`
                });
            });
        });
    }
    const handelEmoji = (emoji) =>{
        setMessage(message+emoji.emoji)
    }

  return (
    <div>
        <div className='max-w-[1440px] lg:mt-0 md:mt-10 mt-10 lg:mb-0 md:mb-10 mb-11 lg:h-full w-full mx-auto py-2 lg:px-[20px] md:px-3 px-3 bg-white shadow-md rounded-xl flex lg:gap-[40px]'>
        
            <div>
            <SaideBar/>
            </div>
        
            <div className='w-full lg:flex justify-between gap-4'>
                <div className="w-full">
                    <div className="mt-5">
                        <Friends/>
                    </div>
                </div>


            
                <div className="lg:w-1/2 lg:mt-0 mt-5">

                    <div>

                        <div className=" relative w-full h-[900px] shadow-lg bg-white rounded-[20px] border py-[24px] px-[15px] ">
                            <div className=" sticky md:top-[-25px] lg:top-[-25px] mb-[50px] lg:z-50 rounded lg:w-[538px] md:w-[417px] py-2  px-2 border-b bg-white">
                                <div className=" flex justify-between items-center">
                                    <div className="flex cursor-pointer">

                                        <div className="relative w-14 h-14 rounded-full">
                                            <img className=" shadow-md shadow-black/18 rounded-full" src={friends1} alt="" />
                                            <div className=" absolute right-1 top-9 bottom-0 w-[15px] h-[15px] rounded-full bg-[#00FF75] border-2 border-white"></div>
                                        </div>
                                        <div className="ml-[30px]">
                                            <h3 className=" font-Poppins font-semibold text-black text-2xl">{activeChat.name}</h3>
                                            <small className=" font-Poppins font-normal text-black text-[14px]">Online</small>
                                        </div>
                                    </div>

                                    <div>
                                        <HiDotsVertical className="text-[#5F35F5] font-extrabold text-xl cursor-pointer"/>
                                    </div>
                                </div>
                            </div>


                            <div className="h-[620px] overflow-y-scroll">
                                {
                                    singelMessage.map((item)=>(
                                        item.whosendID == userData.uid ?
                                        item.img?
                                        <div className="p-5">
                                            <div className=" relative text-right">
                                                <p className="text-[16px] text-right font-samibold bg-purple-600 inline-block py-[5px] px-[5px] text-white font-Poppins rounded-lg">
                                                    <ModalImage  className="w-[200px]"
                                                        small={item.img}
                                                        large={item.img}
                                                    />
                                                </p>
                                                <BsFillTriangleFill className=" absolute bottom-[5px] text-purple-600 right-[-8px]"/>
                                            </div>
                                            <p className="mt-2 mb-10 text-right text-black/25 font-Poppins text-xs font-medium">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                                        </div>
                                        :
                                        <div className="p-5">
                                            <div className=" relative text-right">
                                                <p className="text-[16px] text-right font-samibold bg-purple-600 inline-block py-[20px] px-[50px] text-white font-Poppins rounded-lg">
                                                    {item.msg}
                                                </p>
                                                <BsFillTriangleFill className=" absolute bottom-[-1px] text-purple-600 right-[-8px]"/>
                                            </div>
                                            <p className="mt-2 mb-10 text-right text-black/25 font-Poppins text-xs font-medium">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                                        </div>
                                        :
                                        item.img?
                                        <div className="p-5">
                                            <div className=" relative text-left">
                                                <p className="text-left bg-gray-500 inline-block py-[5px] px-[5px] text-white font-Poppins rounded-lg">
                                                    
                                                    <ModalImage className="w-[200px]"
                                                        small={item.img}
                                                        large={item.img}
                                                    />
                                                </p>
                                                <BsFillTriangleFill className=" absolute bottom-[5px] text-gray-500 left-[-8px]"/>
                                            </div>
                                            <p className="mt-2 mb-10 text-left text-black/25 font-Poppins text-xs font-medium">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                                        </div>
                                        :
                                        <div className="p-5">
                                            <div className=" relative">
                                                <p className="text-[16px] text-left font-samibold bg-[#F1F1F1] inline-block py-[20px] px-[50px] text-black font-Poppins rounded-lg">
                                                    {item.msg}
                                                </p>
                                                <BsFillTriangleFill className=" absolute bottom-[-1px] text-[#F1F1F1] left-[-7px]"/>
                                            </div>
                                            <p className="mt-2 mb-8 text-black/25 font-Poppins text-xs font-medium">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                                        
                                        </div>
                                    ))
                                }
                                
                            </div>

                            <div className=" relative">

                                <div className="fixed bottom-[16px] py-10 z-50 px-2 bg-white border-t w-[553px]">

                                <div className="flex items-center">   

                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
                                            </svg>
                                        </div>
                                        <input value={message} onChange={(e)=> setMessage(e.target.value)} type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 px-16  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here..." required/>
                                        <button type="button" className="absolute inset-y-0 end-7 flex items-center pe-3">
                                        </button>
                                        <label className="absolute inset-y-0 end-7 flex items-center pe-3">
                                            <input onChange={handelImage} type="file" className="hidden"/>
                                            <HiOutlineCamera className="text-lg"/>
                                        </label>
                                        <button className="absolute inset-y-0 end-0 flex items-center pe-3">
                                            <IoMdHappy onClick={()=>setEmoji(!emoji)} className="text-lg"/>
                                        </button>
                                        {
                                            emoji &&
                                            <div className=" absolute bottom-11 right-0">
                                                <EmojiPicker onEmojiClick={(emoji)=>handelEmoji(emoji)}/>
                                            </div>
                                        }
                                    </div>

                                    <button onClick={handelSendMsg}  className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <BsFillSendFill className="mr-3"/> Send
                                    </button>
                                </div>

                                </div>

                            </div>

                            
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Message