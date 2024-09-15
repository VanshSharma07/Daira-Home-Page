import { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios if you haven't already
import styles from "../../styles/SoundDiscriminationTest.module.css";

const wordPairs = [
  ["dog", "hog"],
  ["gate", "cake"],
  ["bun", "bun"],
  ["let", "net"],
  ["ride", "ride"],
  ["man", "man"],
  ["pit", "bit"],
  ["thing", "sing"],
  ["nut", "ton"],
  ["big", "big"],
  ["no", "mow"],
  ["pot", "top"],
  ["pat", "pat"],
  ["shut", "just"],
  ["name", "game"],
  ["raw", "war"],
  ["feet", "seat"],
  ["fun", "fun"],
  ["day", "bay"],
  ["in", "on"],
];

const SoundDiscriminationTest = () => {
  const [score, setScore] = useState(0);
  const [answeredPairs, setAnsweredPairs] = useState(new Set());
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedChild"));
    setStudentData(data);
  }, []);

  const handleResponse = (index, isCorrect) => {
    if (answeredPairs.has(index)) return;

    const [word1, word2] = wordPairs[index];
    const correctAnswer = word1 === word2;
    const newScore = isCorrect === correctAnswer ? 1 : -1;

    setScore((prevScore) => prevScore + newScore);
    setAnsweredPairs((prev) => new Set(prev).add(index));
  };

  const handleSubmit = async () => {
    const API_URL = process.env.REACT_APP_BACKEND_API;
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (!studentData) {
      alert(
        "No student data found. Please select a student before taking the test."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/addTest`,
        {
          childId: studentData.id,
          test_name: "Sound Discrimination",
          score: score,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Test submitted successfully!");
        // Optionally, redirect to another page or clear the test
      } else {
        alert("Failed to submit test. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("An error occurred while submitting the test. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sound Discrimination Test</h1>
      {wordPairs.map((pair, index) => (
        <div key={index} className={styles.pairContainer}>
          <audio controls>
            <source
              src={`/audio/${pair[0]}_${pair[1]}.mp3`}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.button}
              onClick={() => handleResponse(index, true)}>
              Yes
            </button>
            <button
              className={styles.button}
              onClick={() => handleResponse(index, false)}>
              No
            </button>
          </div>
        </div>
      ))}
       <div className={styles.submitContainer}>
      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit Test
      </button>
    </div>
    </div>
  );
};

export default SoundDiscriminationTest;
