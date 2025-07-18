// CreatePostStart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const CreatePostStart = () => {
  const navigate = useNavigate();
  const { user,userData } = useUser();

  return (
    <div className="w-full h-full   flex items-center justify-center p-4 sm:p-8 md:p-20 ">
      <div className="text-center w-full max-w-[800px]">
        {/* Title */}
        <h1 className="text-white mb-8 md:mb-16 font-raleway text-2xl sm:text-[28px] font-semibold leading-normal">
          Hey {userData?.name?.split(' ')[0]} ! Create Your Assets Here
        </h1>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-[600px] mx-auto">
          {/* Single Asset Option */}
          <div
            className="p-4 sm:p-6 md:p-8 cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => navigate(`/${user}/single`)}
          >
            <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
              <div className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] bg-white/20 border border-white/10"></div>
              </div>
            </div>
            <h3 className="text-white text-lg sm:text-xl font-medium">Post Single Asset</h3>
          </div>

          {/* Collection Option */}
          <div
            className="rounded-xl p-4 sm:p-6 md:p-8 cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => navigate(`/${user}/collection`)}
          >
            <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
              <div className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] bg-white/5 border border-white/10 p-1.5 sm:p-2 md:p-2.5 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-2.5 w-full h-full">
                  <div className="bg-white/30"></div>
                  <div className="bg-white/30"></div>
                  <div className="bg-white/30"></div>
                  <div className="relative bg-transparent flex items-center justify-center">
                    <div className="absolute w-3/5 h-0.5 bg-white/90"></div>
                    <div className="absolute w-0.5 h-3/5 bg-white/90"></div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-white text-lg sm:text-xl font-medium">Post Collection</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostStart;