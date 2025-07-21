// components/WorksGrid.jsx
import React from 'react';
import { Edit, Plus } from 'lucide-react';

const WorksGrid = ({ works }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {works.map((work) => (
        <div key={work.id} className=" overflow-hidden hover:transform hover:scale-101 transition-transform duration-200">
          <div className="aspect-square bg-gray-700 relative overflow-hidden">
            {work.image_url && (
              <img 
                src={work.image_url} 
                alt={work.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{work.title}</h3>
                <p className="text-sm text-gray-400">{work.type}</p>
                {work.price && (
                  <p className="text-sm text-gray-400">{work.price} ETH {work.scarcity && `• ${work.scarcity} editions`}</p>
                )}
              </div>
              
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default WorksGrid;