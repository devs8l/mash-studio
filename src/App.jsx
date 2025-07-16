// src/App.js
import React, { useEffect } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import CreatePostStart from './pages/CreatePostStart';
import CreatePostSingle from './pages/CreatePostSingle';
import CreatePostCollection from './pages/CreatePostCollection';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FileManagement from './pages/FileManagement';
import { useUser } from './context/UserContext';

const App = () => {
  const { userId } = useParams();
  const { setUser } = useUser();

  console.log('userId from params:', userId);
  
  useEffect(() => {
    if (userId) {
      
      setUser(userId);
    }
  }, [userId, setUser]);

  return (
    <div className="relative text-white">
      <Navbar />
      <Sidebar />
      
      <div className="ml-20 pt-16 flex items-center justify-center min-h-screen backdrop-blur-[50px]">
        <div className="h-full w-full relative">
          <Routes>
            <Route path="/" element={<CreatePostStart />} />
            <Route path="/single" element={<CreatePostSingle />} />
            <Route path="/collection" element={<CreatePostCollection />} />
            <Route path="/files" element={<FileManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;