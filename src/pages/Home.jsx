import React from "react";
import { useNavigate } from "react-router-dom";
import StudentCard from "../components/StudentCard";
import TestCard from "../components/TestCard";
import { MdOutlineEventNote } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";

const Home = ({ students, tests }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/empty'); 
  };

  return (
    <div className="p-8 overflow-auto h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center">
          <MdOutlineEventNote style={{ fontSize: "3rem" }} className="mr-2" /> 
          Take Tests
        </h2>
        <div className="overflow-x-auto whitespace-nowrap pb-4">
          <div className="inline-flex space-x-8">
            {tests.length > 0 ? (
              tests.map((test) => (
                <TestCard key={test._id} test={test} />
              ))
            ) : (
              <p>No tests available</p>
            )}
            <div
              className="flex items-center justify-center w-40 max-h-72 bg-white rounded-md cursor-pointer"
              onClick={handleClick} 
            >
              <span className="text-4xl text-gray-400">
                <CiCirclePlus style={{ fontSize: "4rem" }} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-hidden">
        <h2 className="text-3xl font-bold mb-4 flex items-center">
          <RiGraduationCapFill style={{ fontSize: "3rem" }} className="mr-2" />
          My Classroom
        </h2>
         
        <div className="overflow-x-auto whitespace-nowrap pb-4">
          <div className="inline-flex space-x-8">
            {students.length > 0 ? (
              students.map((student) => (
                <StudentCard key={student._id} student={student} buttonLabel="View Test Report" />
              ))
            ) : (
              <p>No students available</p>
            )}
            <div
              className="flex items-center justify-center w-40 max-h-72 bg-white cursor-pointer"
              onClick={handleClick} 
            >
              <span className="text-4xl text-gray-400">
                <CiCirclePlus style={{ fontSize: "4rem" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
