import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SaideBar from '../../Components/SideBar/SaideBar';
import GroupsList from '../../Components/GroupsList/GroupsList';
import SerchBox from '../../Components/SerchBox/SerchBox';
import Friends from '../../Components/Friends/Friends';
import UserList from '../../Components/UserList/UserList';
import FriendRequest from '../../Components/FriendRequest/FriendRequest';
import MyGroups from '../../Components/MyGroups/MyGroups';
import BlockedUsers from '../../Components/BlockedUsers/BlockedUsers';

function Home() {
  const auth = getAuth();
  const userData = useSelector((state)=> state.user.userInfo);
  const navigate = useNavigate()

  return (
    <div>
      <div className='max-w-[1440px] lg:mt-0 md:mt-10 mt-10 lg:mb-0 md:mb-10 mb-11 lg:h-full w-full mx-auto py-2 lg:px-[20px] md:px-3 px-3 bg-white shadow-md rounded-xl flex lg:gap-[40px]'>
        
        <div>
          <SaideBar/>
        </div>
        
        <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-5 md:gap-2 gap-4'>
          <div>
            <SerchBox/>
            <GroupsList/>
          </div>

          <div>
            <Friends/>
          </div>

          <div>
            <UserList/>
          </div>

          <div>
            <FriendRequest/>
          </div>

          <div>
            <MyGroups/>
          </div>

          <div>
            <BlockedUsers/>
          </div>
          
        </div>

      </div>
    </div>
  )
}

export default Home