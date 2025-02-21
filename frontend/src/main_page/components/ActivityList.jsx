import React, {useEffect} from "react";
import ActivityItem from "./ActivityItem";


const ActivityList = ({atts, subsect, commonActs}) => {

  return (
    <div className="act-list">
      {commonActs?.map((act, index) => (
          <ActivityItem key={index} atts={atts} actName={act?.name} type={"common"} pos={index}/>
        ))}  
      <ActivityItem atts={atts} actName={subsect?.name} type = {"subsect"} pos={atts.subsectIndex}/>
        
    </div>
  );
};

export default ActivityList;
