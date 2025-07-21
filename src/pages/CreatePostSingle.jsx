import React, { useState, useRef, useContext, useEffect } from 'react';
import { uploadFile } from '../services/data';
import { useUser } from '../context/UserContext';

const CreatePostSingle = () => {
  const { userData } = useUser();
  const [formData, setFormData] = useState({
    artist_id: "",
    artist_name: "",
    type: "",
    title: "",
    file_name: "",
    song_url: "",
    price: "",
    scarcity: "",
    utility: "",
    tags: [],
    geo: "India",
    image_url: "",
    video_url: null
  });

  const [activeUploadTab, setActiveUploadTab] = useState('image');
  const [isUploading, setIsUploading] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Set user data when user context changes
  useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        artist_id: userData.id || "",
        artist_name: userData.name || ""
      }));
    }
  }, [userData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const fileUrl = await uploadFile(file);
      console.log('File uploaded successfully:', fileUrl);


      // Set preview and update form data based on active tab
      if (activeUploadTab === 'image') {
        setPreviewUrl(fileUrl);
        handleInputChange('image_url', fileUrl);
        handleInputChange('video_url', null);
        handleInputChange('song_url', "");
      } else if (activeUploadTab === 'video') {
        setPreviewUrl(fileUrl);
        handleInputChange('video_url', fileUrl);
        handleInputChange('image_url', '');
        handleInputChange('song_url', "");
      } else if (activeUploadTab === 'audio') {
        setPreviewUrl(null);
        handleInputChange('song_url', fileUrl);
        handleInputChange('image_url', '');
        handleInputChange('video_url', null);
      }

      handleInputChange('file_name', file.name);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      fileInputRef.current.files = e.dataTransfer.files;
      handleFileUpload({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        const newTags = [...tags, tagInput.trim()];
        setTags(newTags);
        handleInputChange('tags', newTags);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    handleInputChange('tags', newTags);
  };

  const handleCancel = () => {
    setFormData({
      artist_id: userData?.id || "",
      artist_name: userData?.name || "",
      type: "",
      title: "",
      file_name: "",
      song_url: "",
      price: "",
      scarcity: "",
      utility: "",
      tags: [],
      geo: "India",
      image_url: "",
      video_url: null
    });
    setTags([]);
    setPreviewUrl(null);
    setActiveUploadTab('image');
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.title) {
      alert('Title is required');
      return;
    }

    if (!formData.type) {
      alert('Type is required');
      return;
    }

    if (!formData.image_url && !formData.video_url && !formData.song_url) {
      alert('Please upload a file');
      return;
    }

    try {
      const response = await fetch(`https://api.mashlabs.xyz/artists/${formData.artist_id}/solo-works`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      console.log('Post created successfully:', data);
      alert('Post created successfully!');
      handleCancel();
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  const getAcceptType = () => {
    switch (activeUploadTab) {
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      case 'audio':
        return 'audio/*';
      default:
        return '*';
    }
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] flex flex-col text-white">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Left Column - File Upload */}
        <div className="lg:w-1/3 flex flex-col bg-[#121214] p-6">
          <h1 className="text-white mb-6 text-2xl font-semibold">Create Post</h1>

          {/* Upload Type Tabs */}
          <div className="flex border-b border-[#626262] mb-6">
            <button
              className={`py-2 px-4 ${activeUploadTab === 'image' ? 'text-white border-b-2 border-white' : 'text-[#626262]'}`}
              onClick={() => setActiveUploadTab('image')}
            >
              Image
            </button>
            <button
              className={`py-2 px-4 ${activeUploadTab === 'video' ? 'text-white border-b-2 border-white' : 'text-[#626262]'}`}
              onClick={() => setActiveUploadTab('video')}
            >
              Video
            </button>
            <button
              className={`py-2 px-4 ${activeUploadTab === 'audio' ? 'text-white border-b-2 border-white' : 'text-[#626262]'}`}
              onClick={() => setActiveUploadTab('audio')}
            >
              Audio
            </button>
          </div>

          {/* Upload Area */}
          <div
            className="flex-1 flex flex-col items-center justify-center border border-[#626262] cursor-pointer transition-all duration-300 relative overflow-hidden bg-[#FFFFFF0A] hover:border-gray-400 mb-6"
            onClick={handleFileClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ minHeight: '300px', maxHeight: '400px' }}
          >
            {isUploading ? (
              <div className="text-white">Uploading...</div>
            ) : previewUrl ? (
              activeUploadTab === 'image' ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
              ) : activeUploadTab === 'video' ? (
                <video controls className="w-full h-full object-contain">
                  <source src={previewUrl} type="video/mp4" />
                </video>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 w-full">
                  <div className="text-4xl mb-4">🎵</div>
                  <div className="text-lg">Audio File Uploaded</div>
                  <div className="text-sm text-[#626262] mt-2 truncate w-full text-center">
                    {formData.file_name}
                  </div>
                </div>
              )
            ) : (
              <>
                <div className="text-4xl text-[#626262] mb-2 font-light">+</div>
                <span className="text-[#626262] text-sm text-center">
                  Click + or Drag your File Here
                </span>
                <div className="text-xs text-[#626262] mt-1">
                  {activeUploadTab === 'image' && 'JPG, PNG, SVG, GIF'}
                  {activeUploadTab === 'video' && 'MP4, MOV, AVI'}
                  {activeUploadTab === 'audio' && 'MP3, WAV, AAC'}
                </div>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={getAcceptType()}
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Right Column - Form Fields (scrollable) */}
        <div className="lg:w-[60%] flex flex-col overflow-hidden pt-6">
          <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 100px)' }}>
            <div className="space-y-10 pb-4">
              {/* Title */}
              <div>
                <label className="block text-base font-normal mb-2 text-white">Title*</label>
                <input
                  type="text"
                  className="w-[60%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-base font-normal mb-2 text-white">Type*</label>
                <input
                  type="text"
                  className="w-[60%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                  placeholder="Enter type (e.g., Painting, Music, Video)"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                />
              </div>

              {/* Geo */}
              <div>
                <label className="block text-base font-normal mb-2 text-white">Location</label>
                <input
                  type="text"
                  className="w-[60%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                  placeholder="Country"
                  value={formData.geo}
                  onChange={(e) => handleInputChange('geo', e.target.value)}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-base font-normal mb-2 text-white">Tags</label>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-[#626262] text-white text-xs rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-gray-400 hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  className="w-[60%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                  placeholder="Add tags (press Enter to add)"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                />
              </div>

              {/* Price and Scarcity Row */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-normal mb-2 text-white">Price</label>
                  <input
                    type="text"
                    className="w-[60%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-base font-normal mb-2 text-white">Scarcity</label>
                  <input
                    type="text"
                    className="w-[60%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                    placeholder="Enter scarcity"
                    value={formData.scarcity}
                    onChange={(e) => handleInputChange('scarcity', e.target.value)}
                  />
                </div>
              </div>

              {/* Utility */}
              <div>
                <label className="block text-base font-normal mb-2 text-white">Utility</label>
                <input
                  type="text"
                  className="w-[60%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                  placeholder="Enter utility"
                  value={formData.utility}
                  onChange={(e) => handleInputChange('utility', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="sticky bottom-0 left-0 right-0 flex justify-end border-t border-[#626262] py-4 px-6 bg-[#121214] z-10">
        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            className="py-3 px-6 bg-transparent border border-[#626262] text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-[#1e1e1e]"
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            className="py-3 px-6 bg-white border border-white text-black text-sm font-medium rounded-lg cursor-pointer hover:bg-gray-200"
            disabled={isUploading}
          >
            {isUploading ? 'UPLOADING...' : 'SEND FOR APPROVAL'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostSingle;