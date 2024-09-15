import React from 'react';
import Button from './Button';
import DefaultTest from "../assets/default-test.png";

const TestCard = ({ test }) => {
  return (
    <div className="w-64 h-80 bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <img
          src={test.imageUrl || DefaultTest}
          alt="Test Image"
          className="w-24 h-24 mb-4 rounded-full border-2 border-gray-300"
        />
        <h3 className="text-xl font-semibold mb-4 text-center">{test.testName}</h3>
        <p className="text-sm text-gray-600">Date: {test.date}</p>
        <p className="text-sm text-gray-600">Duration: {test.duration} mins</p>
      </div>
      <div className="flex justify-center mt-6">
        <Button label="Take Test" route="/empty" />
      </div>
    </div>
  );
};

export default TestCard;
