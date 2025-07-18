import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreatePostCollection = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [collectionName, setCollectionName] = useState('');
  const [collectionType, setCollectionType] = useState('None');
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [assets, setAssets] = useState([]);
  const thumbnailInputRef = useRef(null);

  // Load saved assets from localStorage
  useEffect(() => {
    const savedAssets = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('asset_')) {
        savedAssets.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    setAssets(savedAssets);
  }, []);

  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailClick = () => {
    thumbnailInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnailImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewAsset = () => {
    const newAssetId = `asset_${Date.now()}`;
    navigate(`/${userId}/collection/${newAssetId}`);
  };

  const handleAssetClick = (asset) => {
    navigate(`/${userId}/collection/${asset.id}`);
  };

  const handleRemoveAsset = (assetId, e) => {
    e.stopPropagation();
    const updatedAssets = assets.filter(asset => asset.id !== assetId);
    setAssets(updatedAssets);
    localStorage.removeItem(`asset_${assetId}`);
  };

  const handleCancel = () => {
    setCollectionName('');
    setCollectionType('None');
    setThumbnailImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      collectionName,
      collectionType,
      thumbnailImage,
      assets
    });
    navigate(`/${userId}`);
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] flex flex-col text-white ">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Left Column - Thumbnail and Collection Info */}
        <div className="lg:w-1/3 flex flex-col bg-[#121214] overflow-auto scrollbar-hidden">
          <div className="px-6 pt-6">
            <h1 className="text-white mb-6 text-2xl font-semibold">Create Collection</h1>
          </div>
          
          {/* Collection Name */}
          <div className="px-6 mb-8">
            <label className="block text-base font-normal mb-2 text-white">Collection Name</label>
            <input
              type="text"
              className="w-full py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
              placeholder="Type here"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              required
            />
          </div>
          
          {/* Collection Type */}
          <div className="px-6 mb-8">
            <label className="block text-base font-normal mb-2 text-white">Collection Type</label>
            <select
              className="w-full py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm cursor-pointer focus:outline-none focus:border-white appearance-none"
              value={collectionType}
              onChange={(e) => setCollectionType(e.target.value)}
            >
              <option value="None">None</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
            </select>
          </div>
          
          {/* Thumbnail Upload */}
          <div className="px-6 mb-8">
            <label className="block text-base font-normal mb-2 text-white">Thumbnail</label>
            <div
              className="flex flex-col items-center justify-center border border-[#626262] cursor-pointer transition-all duration-300 relative overflow-hidden bg-[#FFFFFF0A] hover:border-gray-400"
              onClick={handleThumbnailClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{ minHeight: '200px' }}
            >
              {thumbnailImage ? (
                <img 
                  src={thumbnailImage} 
                  alt="Collection thumbnail" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <>
                  <div className="text-4xl text-[#626262] mb-2 font-light">+</div>
                  <span className="text-[#626262] text-sm text-center">
                    Click + or Drag your File Here
                  </span>
                </>
              )}
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Assets */}
        <div className="lg:w-[60%] flex flex-col overflow-hidden pt-6">
          <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 100px)' }}>
            <div className="space-y-10 pb-4">
              {/* Add to Collection Section */}
              <div>
                <label className="block text-base font-normal mb-4 text-white">Assets in Collection</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Existing assets */}
                  {assets.map((asset) => (
                    <div
                      key={asset.id}
                      className="relative aspect-square border border-solid border-[#626262] cursor-pointer transition-all duration-300 overflow-hidden bg-[#FFFFFF0A] hover:border-gray-400 group"
                      onClick={() => handleAssetClick(asset)}
                    >
                      {/* Remove button */}
                      <button
                        onClick={(e) => handleRemoveAsset(asset.id, e)}
                        className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        aria-label="Remove asset"
                      >
                        ×
                      </button>
                      
                      {/* Asset image */}
                      <img 
                        src={asset.image} 
                        alt={asset.fileName || `Asset`} 
                        className="w-full h-full object-cover" 
                      />
                      
                      
                    </div>
                  ))}
                  
                  {/* Add new asset button */}
                  <div 
                    className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-[#FFFFFF33] cursor-pointer transition-all duration-300 overflow-hidden bg-[#FFFFFF0A] hover:border-gray-400"
                    onClick={handleAddNewAsset}
                  >
                    <div className="text-center">
                      <div className="text-4xl text-[#626262] mb-2 font-light">+</div>
                      <span className="text-[#626262] text-sm">Add Asset</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="sticky bottom-0 left-0 right-0 flex justify-end border-t border-[#626262] py-2 px-6 z-10 bg-[#0a0a0a]">
        <div className="flex gap-4 w-[40%] justify-end items-end">
          <button
            onClick={handleCancel}
            className="flex-1 py-3 px-4 bg-transparent border border-[#626262] text-white text-sm font-medium cursor-pointer hover:bg-[#1e1e1e]"
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 px-4 bg-white border border-white text-black text-sm font-medium cursor-pointer hover:bg-gray-200"
            disabled={!collectionName || !thumbnailImage || assets.length === 0}
          >
            SEND FOR APPROVAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCollection;