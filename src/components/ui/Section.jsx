import React from "react";
import MaterialCard from "../MaterialCard";

const Section = ({ title, materials, icon: Icon, iconColor }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Icon className={`w-6 h-6 ${iconColor}`} />
        {title} ({materials.length})
      </h2>
      {materials.length === 0 ? (
        <p className="text-gray-600">No {title.toLowerCase()} available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <MaterialCard key={material.MaterialID} material={material} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;
