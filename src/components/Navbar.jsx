// components/Navbar.jsx
import React from 'react';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user,userData } = useUser();
  console.log('user in Navbar:', user);
  console.log('userdata in Navbar:', userData);
  
  return (
    <div className='w-full p-4 fixed top-0 left-0 z-[101] flex items-center justify-between border-b border-[#626262] bg-black'>
      <div className='h-10'>
        <img src="/Mash_Highlight_Still.png" className='h-full w-full' alt="" />
      </div>
      
      <div className='h-12 w-12 rounded-full overflow-hidden '>
        <img src={userData?.profilepicture} className='h-full w-full object-cover' alt="" />
      </div>
      {/* Add any other navbar items here */}
    </div>
  );
};

export default Navbar;