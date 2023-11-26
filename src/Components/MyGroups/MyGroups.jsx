import { useEffect, useState } from "react";
import { HiDotsVertical } from 'react-icons/hi';
import friends1 from '../../assets/friends1.png'
import friends2 from '../../assets/friends2.png'
import friends3 from '../../assets/friends3.png'
import friends4 from '../../assets/friends4.png'
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const MyGroups = () => {
  const userData = useSelector((state)=> state.user.userInfo);
  const [creatGroup, setCreatGroup] = useState(false);
  const [groupname, setGroupname] = useState("");
  const [groupTagname, setgroupTagname] = useState("");
  const db = getDatabase();
  const [myGroup, setMyGroup] = useState([])


  const handelGroupTogole = () =>{
    setCreatGroup(!creatGroup)
  }
  // console.log(groupname);
  // console.log(groupTagname);

  const handelCreatGroup = () =>{
    set(push(ref(db, 'Group/')),{
      groupName: groupname,
      groupTagname: groupTagname,
      adminName: userData.displayName,
      adminid: userData.uid
    })
  }


  useEffect(()=>{
    const groupRef = ref(db, 'Group/');
    onValue(groupRef, (snapshot) => {
      let arrays =[]
      snapshot.forEach((item)=>{

        if(userData.uid == item.val().adminid){
          arrays.push({...item.val(), key: item.key});
        }

        

      })

      setMyGroup(arrays)
      console.log(arrays);
    });
    // console.log(userData);
  },[])

  const handelrRemoveGroup = (item) =>{



  }
  
  return (
    <div className="shadow-lg bg-white h-[440px] rounded-[20px] py-[19px] border px-[15px] overflow-y-auto">
      <div className="flex justify-between items-center">
        <span className=" text-xl font-Poppins font-semibold text-black">
          My Groups
        </span>
        {/* <HiDotsVertical className=" cursor-pointer text-xl text-[#5F35F5]"/> */}

        {
          creatGroup?  <button onClick={handelGroupTogole} className="text-lg bg-[#f53535] text-white font-nunito  p-1">Go Back</button>
          :
          <button onClick={handelGroupTogole} className="text-lg bg-[#5F35F5] text-white font-nunito  p-1">Creat Group</button>
        }
       
      </div>

      <div className="mt-6">

        {
          creatGroup? 
            <div>
              <div className='mt-[30px] relative'>
                <span className=' absolute top-[-13px] left-[15px] bg-white px-2 text-[#11175D] text-base font-nunito font-semibold'>Group Name</span>
                <input onChange={(e)=>setGroupname(e.target.value)} className='text-[21px] hover:border-b-8 transition-all hover:border-blue-500 rounded-md font-nunito font-semibold text-[#11175D] py-[10px] px-[10px] lg:w-full md:w-full w-full border border-[#11175D]/50 outline-none h-[82px]' type="text" placeholder='Enter Your Group Name..' />
                    
              </div>
              <div className='mt-[30px] relative'>
                <span className=' absolute top-[-13px] left-[15px] bg-white px-2 text-[#11175D] text-base font-nunito font-semibold'>Group Tag Name</span>
                <input onChange={(e)=>setgroupTagname(e.target.value)} className='text-[21px] hover:border-b-8 transition-all hover:border-blue-500 rounded-md font-nunito font-semibold text-[#11175D] py-[10px] px-[10px] lg:w-full md:w-full w-full border border-[#11175D]/50 outline-none h-[82px]' type="text" placeholder='Enter Your Group Tag Name..' />
                    
              </div>
              <div>
                <button onClick={handelCreatGroup}  className="bg-blue-600 text-white w-full py-3 mt-4 font-nunito font-semibold">Creat Group</button>
              </div>
            </div>
          :

          <>
            {
              myGroup.map((item)=>(
                <div className=" flex gap-5 w-full border-b-2 last:border-b-0 py-3 ">
                  <div className="w-[50px] h-[50px] rounded-full">
                    <img src={friends1} alt=""/>
                  </div>
                  <div className="flex justify-between items-center w-[80%]">
      
                    <div>
                      <small className=" font-nunito font-normal">Admin:  <small className="font-bold"> {item.adminName} </small> </small>
                      <h3 className="text-black font-Poppins text-[18px] font-semibold leading-none cursor-pointer">{item.groupName}</h3>
                      <div className="flex items-center justify-between w-full">
                        <p className="text-[#ABABAB] font-Poppins text-[12px] pt-1 pb-1">{item.groupTagname}</p>
                        <p className="text-[10px] font-Poppins font-bold text-gray-400">Today, 8:56pm</p>
                      </div>
                    </div>
      
                    <div>
                      <button onClick={handelrRemoveGroup} className="w-[80px] h-[30px] bg-[#5F35F5] border-0 font-Poppins font-medium text-[12px] hover:bg-red-500 transition-all hover:text-white text-white rounded-[5px]">Delet Group</button>
                    </div>
                  </div>
    
                </div>
              ))
            }
          </>


          
        }


      </div>
    </div>
  );
};

export default MyGroups;
