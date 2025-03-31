import InteractiveGrid from './InteractiveGrid.jsx';
import '../styles/Schedule.css';
import { useMainContext } from '../HomePage.jsx';
import { useMemo, useState } from 'react';
import Stats from './Stats.jsx';

function Schedule({ term, bool }) {
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
      if (activity.semesters.includes(targetTermChar) && activity.start < activity.end) {
        activity.weekdays.forEach(weekday => {
          let canPopulate = true;
          for (let j = 0; j < 2; j++) {
            for (let k = activity.start; k < activity.end; k++) {
              if (j === 0 && returnArr[weekday][k]) {
                canPopulate = false;
                break;
              } else if (j === 1 && canPopulate) {
                returnArr[weekday][k] = {
                  isCustom: true,
                  name: activity.name,
                  span: activity.end - activity.start
                };
              }
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
