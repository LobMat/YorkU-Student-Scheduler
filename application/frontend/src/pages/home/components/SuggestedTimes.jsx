// import React, { useEffect, useState } from "react";
// import { readLocal, writeLocal } from "../../../logic/BrowserStorage";

// const SuggestedTimes = ({ courseName, updateCourseTime }) => {
//   const [times, setTimes] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [mostCommonTime, setMostCommonTime] = useState("");

//   useEffect(() => {
//     // Read suggested times from local storage
// //     const savedTimes = readLocal("suggestedTimes", {}); 

// //     if (savedTimes && savedTimes[courseName]) {
// //       setTimes(savedTimes[courseName]);
// //       setMostCommonTime(getMostCommonTime(savedTimes[courseName])); // Get the most common time
// //     }
// //   }, [courseName]);

//     const courseTimes = {
//         "EECS2311": "9:30 AM",
//         "EECS2200": "11:00 AM",
//         "EECS2030": "1:00 PM",
//         "EECS2101": "3:00 PM"
//     };

//     // // Function to determine the most common time
//     // const getMostCommonTime = (timeArray) => {
//     //     if (!timeArray.length) return "No suggested times";
        
//     //     const frequencyMap = {};
//     //     let maxCount = 0;
//     //     let mostFrequent = timeArray[0];

//     //     timeArray.forEach(time => {
//     //     frequencyMap[time] = (frequencyMap[time] || 0) + 1;
//     //     if (frequencyMap[time] > maxCount) {
//     //         maxCount = frequencyMap[time];
//     //         mostFrequent = time;
//     //     }
//     //     });

//     //     return mostFrequent;
//     // };
//     // Set the most common time based on the course
//     setMostCommonTime(courseTimes[courseName] || "12:00 PM"); // Default if not listed
//   }, [courseName]);

//   // Function to handle button click
//   const handleApplySuggestedTime = () => {
//     updateCourseTime(courseName, mostCommonTime);
//     setShowPopup(false);
//     //setShowPopup(true); // Show confirmation popup
//   };

//   const confirmApplyTime = () => {
//     if (mostCommonTime !== "No suggested times") {
//         console.log(`🕒 Applying suggested time: ${mostCommonTime} to ${courseName}`);
//         updateCourseTime(courseName, mostCommonTime); // Update time

//         setTimeout(() => {
//             window.location.reload(); // **Temporary fix to force a re-render**
//         }, 500);
//     }
//     setShowPopup(false); 
// };

// //   return (
// //     <div>
// //       <h3>Suggested Times for {courseName}</h3>
// //       <ul>
// //         {times.length > 0 ? (
// //           times.map((time, index) => <li key={index}>{time}</li>)
// //         ) : (
// //           <li>No suggested times available.</li>
// //         )}
// //       </ul>

// //       {/* Button to apply most common time */}
// //       <button onClick={handleApplySuggestedTime}>Use Suggested Time</button>

// //       {/* Confirmation Popup */}
// //       {showPopup && (
// //         <div className="popup">
// //           <p>Are you sure you want to change to the most common time: {mostCommonTime}?</p>
// //           <button onClick={confirmApplyTime}>Yes</button>
// //           <button onClick={() => setShowPopup(false)}>No</button>
// //         </div>
// //       )}
// //     </div>
// return (
//     <div>
//       <h3>Suggested Times for {courseName}</h3>
//       <p>{mostCommonTime}</p>

//       {/* Button to apply most common time */}
//       <button onClick={() => setShowPopup(true)}>Use Suggested Time</button>

//       {/* Confirmation Popup */}
//       {showPopup && (
//         <div className="popup">
//           <p>Are you sure you want to change to {mostCommonTime}?</p>
//           <button onClick={handleApplySuggestedTime}>Yes</button>
//           <button onClick={() => setShowPopup(false)}>No</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SuggestedTimes;
import React, { useEffect, useState } from "react";
import { readLocal, writeLocal } from "../../../logic/BrowserStorage";

const SuggestedTimes = ({ courseName, updateCourseTime }) => {
  const [times, setTimes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [mostCommonTime, setMostCommonTime] = useState("");

  useEffect(() => {
    // Simulated data (Replace this with actual data when API or backend is available)
    const courseTimes = {
      "EECS2311": ["9:30 AM", "10:00 AM", "9:30 AM"], 
      "EECS2200": ["11:00 AM", "11:00 AM", "1:00 PM"], 
      "EECS2030": ["1:00 PM", "2:00 PM", "1:00 PM"], 
      "EECS2101": ["3:00 PM", "3:30 PM", "3:00 PM"]
    };

    if (courseTimes[courseName]) {
      setTimes(courseTimes[courseName]); 
      setMostCommonTime(getMostCommonTime(courseTimes[courseName])); 
    }
  }, [courseName]);

  // Function to determine the most common time
  const getMostCommonTime = (timeArray) => {
    if (!timeArray.length) return "No suggested times";

    const frequencyMap = {};
    let maxCount = 0;
    let mostFrequent = timeArray[0];

    timeArray.forEach(time => {
      frequencyMap[time] = (frequencyMap[time] || 0) + 1;
      if (frequencyMap[time] > maxCount) {
        maxCount = frequencyMap[time];
        mostFrequent = time;
      }
    });

    return mostFrequent;
  };

  // Function to apply the suggested time
  const confirmApplyTime = () => {
    if (mostCommonTime !== "No suggested times") {
      console.log(`🕒 Applying suggested time: ${mostCommonTime} to ${courseName}`);
      updateCourseTime(courseName, mostCommonTime); 
    }
    setShowPopup(false); 
  };

  return (
    <div>
      <h3>Suggested Times for {courseName}</h3>
      <p>Most Common Time: <strong>{mostCommonTime}</strong></p>

      {/* Button to apply most common time */}
      <button onClick={() => setShowPopup(true)}>Use Suggested Time</button>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="popup">
          <p>Are you sure you want to change {courseName} to {mostCommonTime}?</p>
          <button onClick={confirmApplyTime}>Yes</button>
          <button onClick={() => setShowPopup(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default SuggestedTimes;