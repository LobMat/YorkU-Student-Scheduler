import InteractiveGrid from './InteractiveGrid.jsx';
import '../styles/Schedule.css';
import { useMainContext } from '../HomePage.jsx';
import { useMemo, useState } from 'react';
import Stats from './Stats.jsx';

function Schedule({ term, bool }) {

  const customActivityColors = new Map();
  let customActivityIndex = 0;


  const termChar = term.charAt(0);
  const {
    hooks: { courses, customActivityList },
    getters: { getCourseValue }
  } = useMainContext();

  const [showStats, setShowStats] = useState(false);

  // Function to generate the schedule for a given term character
  const generateSchedule = (targetTermChar) => {
    const returnArr = Array.from({ length: 5 }, () => new Array(26).fill(undefined));

    courses?.forEach((course, courseIndex) => {
      const { code, sectionChoice } = course;
      const [sectionData] = getCourseValue(code, [`sections[${sectionChoice}]`]);

      if (sectionData.termChar === targetTermChar) {
        const [blocks] = getCourseValue(code, [`blocks`]);
        blocks.forEach((block) => {
          block?.times.forEach((dayInBlock, dayIndex) => {
            const [active, start, span] = dayInBlock;
            if (active && span > 0 && start + span <= 26) {
              let canPopulate = true;
              for (let i = 0; i < 2; i++) {
                for (let j = start; j < start + span; j++) {
                  if (i === 0 && returnArr[dayIndex][j]) {
                    canPopulate = false;
                    break;
                  } else if (i === 1 && canPopulate) {
                    returnArr[dayIndex][j] = {
                      courseIndex,
                      sect: sectionData.sectChar,
                      act: block.name,
                      span
                    };
                  }
                }
              }
            }
          });
        });
      }
    });

    customActivityList?.forEach(activity => {
      if (activity.semesters.find(sem => sem == termChar) && activity.start < activity.end) {
        if (!customActivityColors.has(activity.name)) {
          customActivityColors.set(activity.name, customActivityIndex++);
        }

        activity.weekdays.forEach(weekday => {
          let prevTile = null; // To track the previous tile
          let prevIndex = -1; // To track the index of the previous tile

          for (let k = activity.start; k < activity.end; k++) {
            // If the slot is already occupied, mark it as a conflict
            if (returnArr[weekday][k]) {
              returnArr[weekday][k] = {
                isCustom: false,
                isConflict: true,
                name: "CONFLICT", // Mark the slot as a conflict
                span: 1,
                customIndex: -1, // Use consistent color index
              };
            }
            // If the slot is empty, populate with the custom activity
            else {
              returnArr[weekday][k] = {
                isCustom: true,
                isConflict: false,
                name: activity.name,
                span: 1,  // Each slot gets a custom activity with a span of 1
                customIndex: customActivityColors.get(activity.name) % 5, // Use consistent color index
              };

            }
            // Check if the current tile is the same as the previous one (adjacent)
            if (prevTile && returnArr[weekday][k].name === prevTile.name && returnArr[weekday][k].isCustom === prevTile.isCustom) {
              // Merge the tiles by increasing the span of the previous tile
              prevTile.span += 1;
              returnArr[weekday][prevIndex].span = prevTile.span;  // Update the span in the returnArr
            } else {
              // Update the previous tile with the current one details
              prevTile = returnArr[weekday][k];
              prevIndex = k;
            }

          }
        });
      }
    });

    return returnArr;
  };

  // ⬇ Memoized schedules for each term
  const fallTermSchedule = useMemo(() => generateSchedule('F'), [courses, customActivityList]);
  const winterTermSchedule = useMemo(() => generateSchedule('W'), [courses, customActivityList]);

  // Actual visible schedule (either Fall or Winter depending on which grid)
  const termSchedule = term === 'FALL' ? fallTermSchedule : winterTermSchedule;

  return (
    <>
      <div className={`schedule ${bool ? 'focused' : ''}`}>
        <div>{term}</div>
        <div className="days">
          <p>Mon</p>
          <p>Tues</p>
          <p>Wed</p>
          <p>Thurs</p>
          <p>Fri</p>
        </div>
        <div className="times">
          <p>8:00</p>
          <p>9:00</p>
          <p>10:00</p>
          <p>11:00</p>
          <p>12:00</p>
          <p>1:00</p>
          <p>2:00</p>
          <p>3:00</p>
          <p>4:00</p>
          <p>5:00</p>
          <p>6:00</p>
          <p>7:00</p>
          <p>8:00</p>
        </div>
        <InteractiveGrid termSchedule={termSchedule} bool={bool} />
      </div>

      {/* 📊 Stats Modal Button */}
      <button className="open-modal-btn" onClick={() => setShowStats(true)}>
        📊 View Weekly Stats
      </button>

      {showStats && (
        <Stats
          term={{ FALL: fallTermSchedule, WINTER: winterTermSchedule }}
          onClose={() => setShowStats(false)}
        />
      )}
    </>
  );
}

export default Schedule;
