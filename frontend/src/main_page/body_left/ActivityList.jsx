import React from "react";
import ActivityItem from "./ActivityItem";


const ActivityList = ({courseActivities = []}) => {
  return (
    <div className="act-list">
      <div className="common-list">
        {courseActivities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
        
      </div>
      
    </div>
  );
};

export default ActivityList;
