import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';


const Sidebar = () => {
  const { user } = useUser();
  return (
    <div className="fixed left-0 top-0 h-screen bg-black/20 backdrop-blur-[40px] border-r border-[#626262] z-50 pt-16 hover:w-64 w-20 transition-all duration-300 ease-in-out group">
      <div className="flex flex-col p-4 pt-6 space-y-4 overflow-hidden">
        {/* Create Post */}
        <NavLink
          to={`/${user}`}
          end
          className={({ isActive }) =>
            `relative flex items-center p-3  transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'}`
          }
        >
          <div className="w-6 h-6 flex items-center justify-center absolute left-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <path d="M8 18V10H0V8H8V0H10V8H18V10H10V18H8Z" />
            </svg>
          </div>
          <span className="ml-14 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Create Post
          </span>
        </NavLink>

        {/* Files */}
        <NavLink
          to={`/${user}/files`}
          className={({ isActive }) =>
            `relative flex items-center p-3  transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'}`
          }
        >
          <div className="w-6 h-6 flex items-center justify-center absolute left-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="currentColor">
              <path d="M1.67442 13C1.21395 13 0.819767 12.8409 0.49186 12.5227C0.163953 12.2044 0 11.8219 0 11.375V1.625C0 1.17812 0.163953 0.795573 0.49186 0.477344C0.819767 0.159115 1.21395 0 1.67442 0H6.69767L8.37209 1.625H15.0698C15.5302 1.625 15.9244 1.78411 16.2523 2.10234C16.5802 2.42057 16.7442 2.80312 16.7442 3.25H7.6814L6.00698 1.625H1.67442V11.375L3.68372 4.875H18L15.8442 11.8422C15.7326 12.1943 15.5267 12.4753 15.2267 12.6852C14.9267 12.8951 14.5953 13 14.2326 13H1.67442ZM3.43256 11.375H14.2326L15.7395 6.5H4.93953L3.43256 11.375Z" />
            </svg>
          </div>
          <span className="ml-14 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Files
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;