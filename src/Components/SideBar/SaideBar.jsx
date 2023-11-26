import React from "react";
import appsLogo from '../../assets/M.png'
import { HiHome } from 'react-icons/hi';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { AiFillMessage } from 'react-icons/ai';
import { IoMdNotifications } from 'react-icons/io';
import { LuSettings } from 'react-icons/lu';
import { VscSignOut } from 'react-icons/vsc';
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { userLoginInfo } from "../../userSlice/userSlice";
import profileAvatar from "../../assets/User.png"
import { FaBars } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';


const SaideBar = () => {
  const userData = useSelector((state)=> state.user.userInfo);
  const [loading, setLoading] = useState(false);
  const [sideNav, setSidNav] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handelSignOut = () => {
    setLoading(false)
    signOut(auth).then(() => {
      setLoading(true)
      setTimeout(() => {
        navigate("/")
      }, 2000)
      toast.success("Sign Out")
      localStorage.removeItem("userInfo")
      dispatch(userLoginInfo(null))
    })
  }
  const handelProfileModal = () =>{
    navigate("/ChooseProfile")
  }

  const sideNavBar = () =>{
    console.log('Ok Cool');
    setSidNav(!sideNav)
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {
        loading ?
        <div className='absolute w-full lg:h-[100%] md:h-full h-full left-0 top-0 bg-black/25'>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper absolute top-[50%] left-[50%]"
            colors={['#0052FF', '#0052FF', '#0052FF', '#0052FF', '#0052FF']}
          />
        </div>
        :
        <div></div>
      }
      


      <div className="w-full shadow-lg py-2 px-5 fixed top-0 left-0 z-50 mb-10 backdrop-blur-sm lg:hidden block">
        <div className="flex items-center justify-between">
          {/* <FaBars  className="text-blue-600 text-lg font-bold cursor-pointer">
            
          </FaBars>  */}
          <div onClick={sideNavBar}>
            {
              sideNav == true ? <RxCross2 className=" font-extrabold cursor-pointer"/> : <FaBars className=" font-extrabold cursor-pointer"/>
            }
          </div>

          {/* side navbar */}
          <div className={`lg:hidden w-[50%] h-[800px] px-2 py-2 backdrop-blur-md bg-blue-700/95 absolute shadow-lg top-[55px] transition-all duration-100 z-50 ${sideNav ? ' left-0' :'left-[-600px]'}`}>
            <div className="flex justify-start items-center">
              <div>

                <div className="w-[160px] cursor-pointer text-[#fff] text-[30px] h-[50px] flex justify-start items-center rounded hover:shadow-md hover:bg-white/20 transition-all gap-4">
                  <Link to='/Home'>
                    <HiHome/> 
                  </Link>
                  <p className="text-lg">Home</p>
                </div>

                <div className="w-[160px] cursor-pointer mt-[20px] text-[#fff] text-[30px] h-[50px] flex justify-start items-center hover:shadow-md hover:bg-white/20 transition-all rounded gap-4">
                  <AiFillMessage/>
                  <Link to='/Message'>
                    <HiHome/> 
                  </Link>
                  <p className="text-lg">Message</p>
                </div>

                <div className="w-[160px] cursor-pointer mt-[20px] text-[#fff] text-[30px] h-[50px] flex justify-start items-center hover:shadow-md hover:bg-white/20 transition-all rounded gap-4">
                  <IoMdNotifications/>
                  <p className="text-lg">Notifications</p>
                </div>

                <div className="w-[160px] cursor-pointer mt-[20px] text-[#fff] text-[30px] h-[50px] flex justify-start items-center hover:shadow-md hover:bg-white/20 transition-all rounded gap-4">
                  <LuSettings/>
                  <p className="text-lg">Settings</p>
                </div>

                <div onClick={handelSignOut} className="w-[160px] cursor-pointer mt-[20px] text-[#fff] text-[30px] h-[50px] flex justify-start hover:shadow-md hover:bg-white/20 items-center rounded gap-4">
                  <VscSignOut/>
                  <p className="text-lg">SignOut</p>
                </div>
              </div>
            </div>
          </div>

          <p className=" font-nunito font-bold text-lg block text-black">My Talk</p>

          <div onClick={handelProfileModal} className="relative group w-[40px] h-[40px] rounded-full overflow-hidden border-2">

            <img className="rounded-full" src={userData.photoURL || profileAvatar } alt="userProfile" />

            <div className=" group-hover:w-[40px] group-hover:transition-opacity w-[0px] h-[40px] bg-black/50 hover:cursor-pointer absolute top-0 rounded-full flex justify-center items-center">
              <AiOutlineCloudDownload className="text-white lg:text-2xl md:text-lg"/>
            </div>

          </div>

        </div>
      </div>

      <div className="lg:w-[186px] md:hidden lg:block hidden bg-[#5F35F5] rounded-[20px] py-[25px] ">

        <div onClick={handelProfileModal} className="border-2 shadow-lg relative flex justify-center items-center group w-[106px] h-[106px] rounded-full overflow-hidden mx-auto ">
          <img className=" rounded-full" src={userData.photoURL || profileAvatar } alt="userProfile" />

          <div className=" group-hover:w-[106px] group-hover:transition-opacity w-[0px] h-[106px] bg-black/50 hover:cursor-pointer absolute top-0 rounded-full flex justify-center items-center">
            <AiOutlineCloudDownload className="text-white text-2xl"/>
          </div>

        </div>

        <p className="text-center py-3 text-white font-nunito font-semibold text-base">{userData.displayName}</p>

        <div className="flex justify-end items-end mt-[30px]">
          <div>

            <div className="relative lg:w-[160px] hover:after:absolute hover:after:content-[''] hover:after:w-3 hover:after:h-[89px] hover:after:rounded-l-lg hover:after:top-0 hover:after:right-0 hover:after:bg-[#5F35F5]  w-full hover:cursor-pointer hover:text-[#5F35F5] text-[#BAD1FF] text-5xl h-[89px] flex justify-center items-center rounded-l-3xl ease-in-out hover:after:ease-out duration-500 hover:after:duration-00 hover:bg-[#FFFFFF]"> 
              <Link to='/Home'>
                <HiHome/> 
              </Link>
            </div>

            <div className="relative w-[160px] hover:after:absolute hover:after:content-[''] hover:after:w-3 hover:after:h-[89px] hover:after:rounded-l-lg hover:after:top-0 hover:after:right-0 hover:after:bg-[#5F35F5] hover:cursor-pointer mt-[57px] hover:text-[#5F35F5] text-[#BAD1FF] text-5xl h-[89px] flex justify-center items-center rounded-l-3xl ease-in-out duration-500 hover:bg-[#FFFFFF]">
              <Link to="/Message">
                <AiFillMessage/>
              </Link>
            </div>

            <div className="relative w-[160px] hover:after:absolute hover:after:content-[''] hover:after:w-3 hover:after:h-[89px] hover:after:rounded-l-lg hover:after:top-0 hover:after:right-0 hover:after:bg-[#5F35F5] hover:cursor-pointer mt-[57px] hover:text-[#5F35F5] text-[#BAD1FF] text-5xl h-[89px] flex justify-center items-center rounded-l-3xl ease-in-out duration-500 hover:bg-[#FFFFFF]">
              <IoMdNotifications></IoMdNotifications>
            </div>

            <div className="relative w-[160px] hover:after:absolute hover:after:content-[''] hover:after:w-3 hover:after:h-[89px] hover:after:rounded-l-lg hover:after:top-0 hover:after:right-0 hover:after:bg-[#5F35F5] hover:cursor-pointer mt-[57px] hover:text-[#5F35F5] text-[#BAD1FF] text-5xl h-[89px] flex justify-center items-center rounded-l-3xl ease-in-out duration-500 hover:bg-[#FFFFFF]">
              <LuSettings></LuSettings>
            </div>

            <div onClick={handelSignOut} className="relative w-[160px] hover:after:absolute hover:after:content-[''] hover:after:w-3 hover:after:h-[89px] hover:after:rounded-l-lg hover:after:top-0 hover:after:right-0 hover:after:bg-[#5F35F5] hover:cursor-pointer mt-[57px] hover:text-[#5F35F5] text-[#BAD1FF] text-5xl h-[89px] flex justify-center items-center rounded-l-2xl ease-in-out duration-500 hover:bg-[#FFFFFF]">
              <VscSignOut></VscSignOut>
            </div>

          </div>
        </div>
      </div>

      <div className="w-full lg:hidden h-11 fixed z-50 bg-[#5F35F5] py-1 px-4 bottom-0 left-0 flex items-center gap-7">

        {/* <div onClick={handelProfileModal} className="relative group w-[40px] h-[40px] rounded-full overflow-hidden border-2">
          <img className="rounded-full" src={userData.photoURL || profileAvatar } alt="userProfile" />

          <div className=" group-hover:w-[40px] group-hover:transition-opacity w-[0px] h-[40px] bg-black/50 hover:cursor-pointer absolute top-0 rounded-full flex justify-center items-center">
            <AiOutlineCloudDownload className="text-white text-2xl"/>
          </div>
        </div> */}

        <div className="flex justify-between md:w-[90%] w-[100%]">
          <div className=" cursor-pointer ">
            <Link to="/Home">
              <HiHome className=" text-2xl text-white"/>
            </Link>
          </div>
          <div className="cursor-pointer ">
            
            <Link to="/Message">
              <AiFillMessage className=" text-2xl text-white"/>
            </Link>
          </div>
          <div className="cursor-pointer ">
            <IoMdNotifications className=" text-2xl text-white"></IoMdNotifications>
          </div>
          <div className="cursor-pointer ">
            <LuSettings className=" text-2xl text-white"></LuSettings>
          </div>
          <div onClick={handelSignOut} className="cursor-pointer ">
            <VscSignOut className=" text-2xl text-white"></VscSignOut>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SaideBar;
