import React, { useEffect, useState } from "react";

const StatTracker = ({ courses }) => {
    console.log("Courses updated:")
    const [stats, setStats] = useState({ totalLectureHours: 0 });
    const calculateTotalTime = (schedule) => {
        let totalLectureMinutes = 0;

        schedule.forEach(course => {
            const start = course.startNum || 0;
            const end = course.endNum || 0;
            totalLectureMinutes += (end - start) * 60;
        });

        return {
            totalLectureHours: (totalLectureMinutes / 60).toFixed(2),
        };
    };

    useEffect(() => {

        const totals = calculateTotalTime(courses);
        setStats(totals);
    }, [courses]);

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
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "300px",
        backgroundColor: "#ff3333"
    }
};

export default StatTracker;