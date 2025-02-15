import React, { useEffect, useState } from "react";

const StatTracker = ({ courses }) => {
    console.log("Courses updated:")
    //const [stats, setStats] = useState({ totalLectureHours: 0, totalCommuteHours: 0 });
    const [stats, setStats] = useState({ totalLectureHours: 0 });
    // Function to calculate total lecture & commute time
    const calculateTotalTime = (schedule) => {
        let totalLectureMinutes = 0;
        //let totalCommuteMinutes = 0;

        schedule.forEach(course => {
            const start = course.startNum || 0;  // ✅ Default to 0 if undefined
            const end = course.endNum || 0;  // ✅ Default to 0 if undefined
            totalLectureMinutes += (end - start) * 60; // Convert to minutes
            //totalCommuteMinutes += 40; // Assume 40 min commute per lecture
        });

        return {
            totalLectureHours: (totalLectureMinutes / 60).toFixed(2),
            //totalCommuteHours: (totalCommuteMinutes / 60).toFixed(2)
        };
    };

    useEffect(() => {
        console.log("🚀 StatTracker received courses:", courses); // ✅ Debug log

        const totals = calculateTotalTime(courses);
        setStats(totals);  // ✅ Always update stats
    }, [courses]);  // ✅ Runs whenever `courses` updates

    return (
        <div style={styles.container}>
            <h2>Weekly Time Spent</h2>
            <p>Lecture Time: {stats.totalLectureHours} hrs</p>
        </div>
    );
};

// Styling
const styles = {
    container: {
        textAlign: "center",
        marginTop: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "300px",
        backgroundColor: "#ff3333"
    }
};

export default StatTracker;