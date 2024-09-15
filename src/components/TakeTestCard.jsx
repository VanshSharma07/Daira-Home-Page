import React from 'react';
import Button from './Button';
import DefaultTest from "../assets/default-test.png";

const TakeTestCard = ({ test }) => {
  return (
    <div className="w-full h-40 m-2 bg-white rounded-lg shadow-md p-4 flex items-center justify-between space-x-4">
      {/* Left Section (Image) */}
      <div className="flex-shrink-0">
        <img
          src={test.imageUrl || DefaultTest}
          alt="Test Image"
          className="w-16 h-16 rounded-full border-2 border-gray-300"
        />
      </div>

      {/* Middle Section (Text) */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{test.testName}</h3>
        <p className="text-sm text-gray-600">Date: {test.date}</p>
        <p className="text-sm text-gray-600">Duration: {test.duration} mins</p>
      </div>

      {/* Right Section (Button) */}
      <div className="flex-shrink-0">
        <Button label="Take Test" route={`/empty`} />
      </div>
    </div>
  );
};

export default TakeTestCard;
