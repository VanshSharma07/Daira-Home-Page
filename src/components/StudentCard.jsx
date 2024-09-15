import React from 'react';
import Button from './Button';
import DefaultProfile from "../assets/default-profile.jpg";

const StudentCard = ({ student, buttonLabel, buttonRoute = "/empty" }) => {
  const handleSelectChild = () => {
    // Store student information in local storage
    localStorage.setItem('selectedChild', JSON.stringify({
      name: student.name,
      rollNumber: student.rollno,
      id: student._id // Assuming the student object has an _id field
    }));
  };

  return (
    <div className="w-64 h-80 bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <img
          src={student.imageUrl || DefaultProfile}
          alt={`Profile picture of ${student.name}`}
          className="w-24 h-24 mb-4 rounded-full object-cover"
        />
        <h3 className="text-xl font-semibold mb-4 text-center">
          {student.name || 'Unknown Student'}
        </h3>
      </div>
      <div className="flex flex-col items-start text-sm text-gray-700 space-y-1">
        <p className="flex justify-between w-full">
          <span>Roll number</span> <span>{student.rollno}</span>
        </p>
        <p className="flex justify-between w-full">
          <span>Tests Taken</span> <span>{student.tests_taken}</span>
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <Button 
          label={buttonLabel} 
          route={buttonRoute} 
          onClick={handleSelectChild}
        />
      </div>
    </div>
  );
};

export default StudentCard;