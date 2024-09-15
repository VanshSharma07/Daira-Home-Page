import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEventNote } from "react-icons/md";
import TakeTestCard from "../components/TakeTestCard"; 

const TakeTests = ({ tests }) => {
  const navigate = useNavigate();

  const handleTestClick = (index) => {
    if (index === 2) { // Check if it's the 3rd test (index starts at 0)
      navigate("/classpage"); // Navigate to Test.jsx when the 3rd test is clicked
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl ml-6 mt-8 font-bold mb-4 flex items-center">
          <MdOutlineEventNote style={{ fontSize: "3rem" }} className="mr-2" /> 
          Take Tests
        </h2>
        
        <div className="space-y-4 max-h-screen overflow-y-auto">
          {tests.length > 0 ? (
            tests.map((test, index) => (
              <div key={test._id} onClick={() => handleTestClick(index)}>
                <TakeTestCard test={test} />
              </div>
            ))
          ) : (
            <p>No tests available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default TakeTests;
