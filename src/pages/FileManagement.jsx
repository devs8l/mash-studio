// pages/FileManagement.jsx
import React, { useState, useEffect } from 'react';
import { fetchWorksData } from '../services/data';
import WorksGrid from '../components/WorksGrid';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const FileManagement = () => {
  const [activeTab, setActiveTab] = useState('Listed');
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();

  const tabs = ['Drafts', 'Submissions', 'Reviewed', 'Listed', 'Rejected'];


  useEffect(() => {

    const loadData = async () => {
      if (activeTab === 'Listed') {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchWorksData(user);
          setWorks(data); // Only show works with price (listed)
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [activeTab]);

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">My Files</h1>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">Loading listed works...</div>
        ) : error ? (
          <div className="text-red-400 text-center py-12">Error: {error}</div>
        ) : activeTab === 'Listed' ? (
          works.length > 0 ? (
            <WorksGrid works={works} />
          ) : (
            <div className="text-gray-400 text-center py-12">
              No listed works found
            </div>
          )
        ) : (
          <div className="text-gray-400 text-center py-12">
            Select "Listed" to view available works
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManagement;