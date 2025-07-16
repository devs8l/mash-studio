import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePostSingle from './CreatePostSingle';

const CreatePostCollection = () => {
  const navigate = useNavigate();
  const [collectionName, setCollectionName] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [assets, setAssets] = useState(Array(5).fill(null));
  const [editingAssetIndex, setEditingAssetIndex] = useState(null);
  const thumbnailInputRef = useRef(null);
  const assetInputRefs = useRef([]);

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

  const handleAssetUpload = (event, index) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAssets = [...assets];
        newAssets[index] = e.target.result;
        setAssets(newAssets);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAssetEdit = (index) => {
    setEditingAssetIndex(index);
  };

  const handleSingleAssetSubmit = (assetData) => {
    if (editingAssetIndex !== null) {
      const newAssets = [...assets];
      newAssets[editingAssetIndex] = assetData;
      setAssets(newAssets);
    }
    setEditingAssetIndex(null);
  };

  const handleAddMoreAssets = () => {
    setAssets([...assets, null]);
  };

  const handleThumbnailClick = () => {
    thumbnailInputRef.current?.click();
  };

  const handleNewAssetClick = (index) => {
    assetInputRefs.current[index]?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, type, index = null) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === 'thumbnail') {
          setThumbnailImage(event.target.result);
        } else if (type === 'asset' && index !== null) {
          const newAssets = [...assets];
          newAssets[index] = event.target.result;
          setAssets(newAssets);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      collectionName,
      thumbnailImage,
      assets
    });
  };

  if (editingAssetIndex !== null) {
    return (
      <CreatePostSingle 
        setShowCreatePost={() => setEditingAssetIndex(null)}
        onSubmit={handleSingleAssetSubmit}
        initialData={assets[editingAssetIndex]}
      />
    );
  }

  return (
    <div className=" w-full  p-12 text-text-primary">
      <button
        className="absolute top-6 right-6 bg-transparent border-none text-white text-2xl cursor-pointer z-[100]"
        onClick={() => navigate('/')}
      >
        ×
      </button>

      <div className="grid grid-cols-2 gap-16 max-w-[1200px] mx-auto">
        <div className="flex flex-col">
          <h1 className="text-white mb-8 font-raleway text-2xl font-semibold">Create Post</h1>
          
          {/* Thumbnail Upload Section */}
          <div className="mb-8">
            <label htmlFor="thumbnail-upload" className="block text-base font-normal mb-4 text-text-primary">
              Upload Thumbnail
            </label>
            <div
              className="flex flex-col items-center justify-center border border-dashed border-border-color cursor-pointer transition-all-custom relative overflow-hidden bg-input-bg rounded-lg w-full max-w-[300px] h-[300px] hover:border-white hover:border-opacity-40 hover:bg-white hover:bg-opacity-8"
              onClick={handleThumbnailClick}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'thumbnail')}
              role="button"
              tabIndex="0"
            >
              {thumbnailImage ? (
                <img 
                  src={thumbnailImage} 
                  alt="Collection thumbnail" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <>
                  <div className="text-3xl text-white text-opacity-60 mb-2">+</div>
                  <span className="text-text-secondary text-sm text-center">Upload Image Here</span>
                </>
              )}
              <input
                id="thumbnail-upload"
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Collection Name Input */}
          <div className="mb-8">
            <label htmlFor="collection-name" className="block text-base font-normal mb-3 text-text-primary">
              Collection Name
            </label>
            <input
              id="collection-name"
              type="text"
              className="w-full py-3 px-4 bg-input-bg border border-border-color text-text-primary text-sm rounded transition-all-custom placeholder-text-secondary focus:outline-none focus:border-white focus:border-opacity-40"
              placeholder="Enter your collection's name"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col pl-16 border-l border-white border-opacity-10">
          {/* Assets Upload Section */}
          <div className="mb-8">
            <label className="block text-base font-normal mb-4 text-text-primary">Upload Assets</label>
            <div className="max-h-[60vh] overflow-y-auto pr-4 mb-4 scrollbar-thin scrollbar-track-white scrollbar-track-opacity-5 scrollbar-thumb-white scrollbar-thumb-opacity-20">
              <div className="grid grid-cols-1 gap-4 w-full">
                {assets.map((asset, index) => (
                  <React.Fragment key={`asset-${index}`}>
                    <div
                      className={`flex flex-col items-center justify-center border border-dashed border-border-color cursor-pointer transition-all-custom relative overflow-hidden rounded-lg w-full h-[120px] ${asset ? 'border-solid' : ''} hover:border-white hover:border-opacity-40`}
                      onClick={() => asset ? handleAssetEdit(index) : handleNewAssetClick(index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'asset', index)}
                      role="button"
                      tabIndex="0"
                    >
                      {asset ? (
                        <>
                          <img 
                            src={asset} 
                            alt={`Asset ${index + 1}`} 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white">
                            Edit
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-3xl text-white text-opacity-60 mb-2">+</div>
                          <span className="text-text-secondary text-sm text-center">Add Asset</span>
                        </>
                      )}
                    </div>
                    <input
                      ref={(el) => (assetInputRefs.current[index] = el)}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleAssetUpload(e, index)}
                      className="hidden"
                    />
                  </React.Fragment>
                ))}
              </div>
              {assets.length >= 5 && assets.every(asset => asset) && (
                <div 
                  className="flex flex-col items-center justify-center border border-dashed border-border-color cursor-pointer transition-all-custom relative overflow-hidden rounded-lg w-full h-[120px] mt-4 hover:border-white hover:border-opacity-40"
                  onClick={handleAddMoreAssets}
                  role="button"
                  tabIndex="0"
                >
                  <div className="text-3xl text-white text-opacity-60 mb-2">+</div>
                  <span className="text-text-secondary text-sm text-center">Add More Assets</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-auto pt-8">
            <button 
              className="flex items-center justify-center w-full py-4 bg-button-bg border-none text-black text-base font-medium cursor-pointer rounded transition-all-custom hover:bg-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={!collectionName || !thumbnailImage || assets.filter(asset => asset).length < 5}
            >
              SEND FOR APPROVAL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCollection;