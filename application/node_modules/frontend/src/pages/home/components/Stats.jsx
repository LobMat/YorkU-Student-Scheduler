

function Stats({termSchedule}) {

  // iterate through each day of the term schedule
  const timesSpent = [0,0,0,0,0];
  const timesBetween = [0,0,0,0,0];
  const blocksToTime = (blocks) => `${Math.floor(blocks/2)}h${(blocks%2 == 1) ? '30m' : ''}`;
  
  for (let i = 0; i < 5; i++) {
    let startFound = false;
    let timeSinceLastAct = 0;
    // iterate through each block of the day
    for (let j = 0; j < 26; j++) {
      if (termSchedule[i][j]) {
        startFound = true;
        timesSpent[i] += 1;
        timesBetween[i] += timeSinceLastAct;
        timeSinceLastAct = 0;
      } else {
        timeSinceLastAct += (startFound) ? 1 : 0;
      }
    }
  }
  return (
  <>
      <div className="stats">
        <h3><br/><u>STATS</u><br /></h3>
        <div className="stats-grid">
        <span><b>MON:</b>&emsp;</span><span>{blocksToTime(timesSpent[0])} spent in class.</span><span>{blocksToTime(timesBetween[0])} spent between classes.<br/></span>
        <span><b>TUE:</b>&emsp;</span><span>{blocksToTime(timesSpent[1])} spent in class.</span><span>{blocksToTime(timesBetween[1])} spent between classes.<br/></span>
        <span><b>WED:</b>&emsp;</span><span>{blocksToTime(timesSpent[2])} spent in class.</span><span>{blocksToTime(timesBetween[2])} spent between classes.<br/></span>
        <span><b>THU:</b>&emsp;</span><span>{blocksToTime(timesSpent[3])} spent in class.</span><span>{blocksToTime(timesBetween[3])} spent between classes.<br/></span>
        <span><b>FRI:</b>&emsp;</span><span>{blocksToTime(timesSpent[4])} spent in class.</span><span>{blocksToTime(timesBetween[4])} spent between classes.<br/></span>
        </div>
      </div>
    </>
  );

}

export default Stats;