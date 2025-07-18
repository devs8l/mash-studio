import { Routes, Route, useParams, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from './context/UserContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CreatePostStart from './pages/CreatePostStart';
import CreatePostSingle from './pages/CreatePostSingle';
import CreatePostCollection from './pages/CreatePostCollection';
import FileManagement from './pages/FileManagement';
import CollectionSingle from './pages/CollectionSingle';

const Layout = () => {
  return (
    <div className="relative text-white">
      <Navbar />
      <Sidebar />
      <div className="ml-20 pt-16 flex items-center justify-center min-h-screen backdrop-blur-[50px]">
        <div className="h-full w-full relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const UserRoutes = () => {
  const { userId } = useParams();
  const { setUser } = useUser();

  useEffect(() => {
    if (userId) {
      setUser(userId);
    }
  }, [userId, setUser]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CreatePostStart />} />
        <Route path="single" element={<CreatePostSingle />} />
        <Route path="collection" element={<CreatePostCollection />} />
        <Route path="collection/:assetId" element={<CollectionSingle />} />
        <Route path="files" element={<FileManagement />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/:userId/*" element={<UserRoutes />} />
    </Routes>
  );
};

export default App;