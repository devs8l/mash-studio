// components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <div className='w-full p-4 fixed top-0 left-0 z-[101] flex items-center justify-between border-b border-[#626262] bg-black'>
      <div className='h-10'>
        <img src="/Mash_Highlight_Still.png" className='h-full w-full' alt="" />
      </div>
      {/* Add any other navbar items here */}
    </div>
  );
};

export default Navbar;