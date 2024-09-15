import React from "react";
import { useNavigate } from "react-router-dom";
import StudentCard from "../components/StudentCard";
import { RiGraduationCapFill } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";

export default function MyClass({ students }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/empty");
  };

  return (
    <div className="p-8 overflow-auto h-screen">
      {/* My Classroom section */}
      <h2 className="text-3xl font-bold mb-4 flex items-center">
        <RiGraduationCapFill style={{ fontSize: "3rem" }} className="mr-2" />
        My Classroom
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-4">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentCard key={student._id} student={student} buttonLabel="View Test Report" />
          ))
        ) : (
          <p>No students available</p>
        )}
        <div
          className="flex flex-col items-center justify-center w-full h-40 bg-white cursor-pointer"
          onClick={handleClick}>
          <span className="text-4xl text-gray-400">
            <CiCirclePlus style={{ fontSize: "4rem", marginTop: "100px" }} />
          </span>
          <h2 className="text-center mt-2 text-gray-500">Add Child</h2>
        </div>
      </div>
    </div>
  );
}
