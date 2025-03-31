import { useEffect, useState } from "react";
import "../styles/Stats.css";

function Stats({ termSchedule, term, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fallStats, setFallStats] = useState({ timesSpent: [], timesBetween: [] });
  const [winterStats, setWinterStats] = useState({ timesSpent: [], timesBetween: [] });

  const dayLabels = ["MON", "TUE", "WED", "THU", "FRI"];

  const getStats = (schedule = []) => {
    const timesSpent = [0, 0, 0, 0, 0];
    const timesBetween = [0, 0, 0, 0, 0];

    for (let i = 0; i < 5; i++) {
      let startFound = false;
      let timeSinceLastAct = 0;
      const day = schedule[i] || [];
      for (let j = 0; j < 26; j++) {
        if (day[j]) {
          startFound = true;
          timesSpent[i]++;
          timesBetween[i] += timeSinceLastAct;
          timeSinceLastAct = 0;
        } else {
          timeSinceLastAct += startFound ? 1 : 0;
        }
      }
    }

    return { timesSpent, timesBetween };
  };

  useEffect(() => {
    if (isOpen) {
      setFallStats(getStats(term.FALL));
      setWinterStats(getStats(term.WINTER));
    }
  }, [isOpen, term]);

  const blocksToTime = (blocks) =>
    `${Math.floor(blocks / 2)}h${blocks % 2 === 1 ? "30m" : ""}`;

  return (
    <>
      <button className="open-modal-btn" onClick={() => setIsOpen(true)}>
        📊 View Weekly Stats
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content scrollable" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={onClose}>
              ✖ Close
            </button>

            {/* Fall Term */}
            <h3 className="stat-title">🍂 Fall Term</h3>
            <div className="stat-table">
              {dayLabels.map((day, i) => (
                <div className="stat-row" key={`fall-${i}`}>
                  <div className="stat-day">{day}</div>
                  <div className="stat-entry">
                    <span className="in-class">
                      {blocksToTime(fallStats.timesSpent[i])} in class
                    </span>
                    <span className="between-class">
                      {blocksToTime(fallStats.timesBetween[i])} between
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Winter Term */}
            <h3 className="stat-title">❄️ Winter Term</h3>
            <div className="stat-table">
              {dayLabels.map((day, i) => (
                <div className="stat-row" key={`winter-${i}`}>
                  <div className="stat-day">{day}</div>
                  <div className="stat-entry">
                    <span className="in-class">
                      {blocksToTime(winterStats.timesSpent[i])} in class
                    </span>
                    <span className="between-class">
                      {blocksToTime(winterStats.timesBetween[i])} between
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Stats;
