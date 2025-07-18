import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const CollectionSingle = () => {
    const navigate = useNavigate();
    const { userId, assetId } = useParams();
    const [formData, setFormData] = useState({
        fileName: '',
        collection: 'None',
        listPriceUSD: '',
        listPriceETH: '',
        royaltyFee: '',
        scarcity: '',
        notes: ''
    });

    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [nftImage, setNftImage] = useState(null);
    const nftInputRef = React.useRef(null);
    const { user, userData } = useUser();

    

    useEffect(() => {
        const savedAsset = localStorage.getItem(`asset_${assetId}`);
        if (savedAsset) {
            const parsedAsset = JSON.parse(savedAsset);
            setFormData({
                fileName: parsedAsset.fileName || '',
                collection: parsedAsset.collection || 'None',
                listPriceUSD: parsedAsset.listPriceUSD || '',
                listPriceETH: parsedAsset.listPriceETH || '',
                royaltyFee: parsedAsset.royaltyFee || '',
                scarcity: parsedAsset.scarcity || '',
                notes: parsedAsset.notes || ''
            });
            setTags(parsedAsset.tags || []);
            setNftImage(parsedAsset.image || null);
        }
    }, [assetId]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNftUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setNftImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNftClick = () => {
        nftInputRef.current?.click();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setNftImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleTagInputKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSave = () => {
        const assetData = {
            ...formData,
            tags,
            image: nftImage,
            id: assetId
        };

        localStorage.setItem(`asset_${assetId}`, JSON.stringify(assetData));
        navigate(`/${userId}/collection`);
    };

    return (
        <div className="relative h-[calc(100vh-4rem)] flex flex-col text-white">


            <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
                
                <div className="lg:w-1/3 flex flex-col bg-[#121214]">
                    <div className="px-6 pt-6">
                        <h1 className="text-white mb-6 text-2xl font-semibold">
                            <span onClick={()=>{navigate(`/${userId}/collection`);}} className="cursor-pointer">Collection</span> &gt; {formData.fileName || 'New Asset'}
                        </h1>
                    </div>
                    <div
                        className="flex-1 mx-10 flex flex-col items-center justify-center border border-[#626262] cursor-pointer transition-all duration-300 relative overflow-hidden bg-[#FFFFFF0A] hover:border-gray-400"
                        onClick={handleNftClick}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        style={{ minHeight: '300px', maxHeight: '400px' }}
                    >
                        {nftImage ? (
                            <img src={nftImage} alt="NFT" className="w-full h-full object-contain" />
                        ) : (
                            <>
                                <div className="text-4xl text-[#626262] mb-2 font-light">+</div>
                                <span className="text-[#626262] text-sm text-center">
                                    Click + or Drag your File Here
                                </span>
                                <div className="text-xs text-[#626262] mt-1">
                                    1000 x 1000 • JPG, PNG, SVG, GIF, MP4
                                </div>
                            </>
                        )}
                    </div>
                    <input
                        ref={nftInputRef}
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleNftUpload}
                        className="hidden"
                    />
                </div>

                <div className="lg:w-[60%] flex flex-col overflow-hidden pt-6">
                    <div className="flex-1 overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 100px)' }}>
                        <div className="space-y-10 pb-4">
                            <div>
                                <label className="block text-base font-normal mb-2 text-white">File Name</label>
                                <input
                                    type="text"
                                    className="w-[30%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                                    placeholder="Type here"
                                    value={formData.fileName}
                                    onChange={(e) => handleInputChange('fileName', e.target.value)}
                                />
                                <div className="text-xs text-[#626262] mt-1">Your files name can't be updated later</div>
                            </div>

                            <div>
                                <label className="block text-base font-normal mb-2 text-white">Collection</label>
                                <select
                                    className="w-[30%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm cursor-pointer focus:outline-none focus:border-white appearance-none"
                                    value={formData.collection}
                                    onChange={(e) => handleInputChange('collection', e.target.value)}
                                >
                                    <option value="None">None</option>
                                    <option value="Collection 1">Collection 1</option>
                                    <option value="Collection 2">Collection 2</option>
                                </select>
                                <div className="text-xs text-[#626262] mt-1">Select if you want to add this file in a collection</div>
                            </div>

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
                                    className="w-[30%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                                    placeholder="Add tags"
                                    value={tagInput}
                                    onChange={handleTagInputChange}
                                    onKeyDown={handleTagInputKeyDown}
                                />
                                <div className="text-xs text-[#626262] mt-1">Select tags that best describe your file</div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-base font-normal mb-2 text-white">List Price</label>
                                    <input
                                        type="text"
                                        className="w-[60%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                                        placeholder="Add price"
                                        value={formData.listPriceUSD}
                                        onChange={(e) => handleInputChange('listPriceUSD', e.target.value)}
                                    />
                                    <div className="text-xs text-[#626262] mt-1">Individually or Matched (USD)</div>
                                </div>
                                <div>
                                    <label className="block text-base font-normal mb-2 text-white">List Price</label>
                                    <input
                                        type="text"
                                        className="w-[60%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                                        placeholder="Add price"
                                        value={formData.listPriceETH}
                                        onChange={(e) => handleInputChange('listPriceETH', e.target.value)}
                                    />
                                    <div className="text-xs text-[#626262] mt-1">ETH</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-base font-normal mb-2 text-white">Royalty Fee</label>
                                    <input
                                        type="text"
                                        className="w-[60%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                                        placeholder="Add fee %"
                                        value={formData.royaltyFee}
                                        onChange={(e) => handleInputChange('royaltyFee', e.target.value)}
                                    />
                                    <div className="text-xs text-[#626262] mt-1">What % of secondary sales royalties do you want?</div>
                                </div>
                                <div>
                                    <label className="block text-base font-normal mb-2 text-white">Scarcity</label>
                                    <input
                                        type="text"
                                        className="w-[60%] py-3 px-0 bg-transparent border-b border-[#626262] text-white text-sm placeholder-[#626262] focus:outline-none focus:border-white"
                                        placeholder="Type here"
                                        value={formData.scarcity}
                                        onChange={(e) => handleInputChange('scarcity', e.target.value)}
                                    />
                                    <div className="text-xs text-[#626262] mt-1">Maximum limit of minted / sales for this song/ art piece...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 flex justify-end border-t border-[#626262] py-2 px-6 z-10">
                <div className="flex gap-4 w-[10%] justify-end items-end">
                    <button
                        onClick={handleSave}
                        className="flex-1 py-3 px-4 bg-white border border-white text-black text-sm font-medium cursor-pointer hover:bg-gray-200"
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CollectionSingle;