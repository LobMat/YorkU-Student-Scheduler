import React, {useEffect} from "react";
import ActivityItem from "./ActivityItem";


const ActivityList = ({atts, courseActivities = []}) => {

  return (
    <div className="act-list">
      <div className="common-list">
        {courseActivities.map((actName, index) => (

          <ActivityItem key={index} atts={atts} actName={actName} />
        ))}
        
      </div>
      
    </div>
  );
};

export default ActivityList;
