import useApp from '../AppContext';



async function courseDataFromDB (query){
  const response = await fetch(`http://localhost:5000/courses/${query}`)
    if (!response.ok) {
      alert("Course not found.")
      throw new Error("Course not found");
    } else {
      return await response.json();
    }
}


export class PrefLogic {
  
  constructor(coursePrefs, setCoursePrefs) {
    this.coursePrefs = coursePrefs;
    this.setCoursePrefs = setCoursePrefs;
    this.prefs = {
    // helper method to get the currently chosen section, or the currently chosen subsect for the currently chosen section.
    curSec:(code) => this.coursePrefs[code]?.sectChoice,
    curSub:(code) => this.coursePrefs[code]?.sectPrefs[this.prefs.curSec(code)]?.subsectChoice,
  
    // add a new empty course to the course preference list.
    newCourse: (course) => {
      this.setCoursePrefs((prev) => ({
        ...prev,
        [course.code]: {
          sectChoice: 0, 
          sectPrefs: course.sects.map(section => ({
            subsectChoice: 0, 
            times: (section.commonActs.concat(section.subsects)).map(activity => ({name: activity.name, map: actMaps.default})),
          })
        )}
      }))
    },
  
    // given a course, change the chosen section.
    setSectionChoice: (code, newSec) => {
      if (newSec != this.prefs.curSec(code)) {
        this.setCoursePrefs((prev) => ({
          ...prev,
          [code]: {...prev[code], sectChoice: newSec }
        }))
      }
    },
  
    //given a course, update the prefered subsection for the current section. If changed.
    setSubsectChoice: (code, newSub) => {
      if (newSub != this.prefs.curSub(code))  {
        this.setCoursePrefs((prev) => ({
          ...prev,
          [code]: {
            ...prev[code], 
            sects: prev[code].sects.map((sect, i) =>
              i === this.prefs.curSec(code) ? {...sect, subsectChoice: newSub } : sect
            ), 
          },
        }))
      }
    },
  
    setActivityTime: (code, timeMap) => {
      this.setCoursePrefs((prev) => ({
        ...prev,
        [code]: {
          ...prev[code], 
          sects: prev[code].sects.map((sect, i) =>
            i === this.prefs.curSec(code) ? {
              ...sect, times: sect.times.map((time) => ((time.name === timeMap.name) ? timeMap : time))
            } : sect
          ), 
        },
      }))
    },
  
    getActivityTime: (code, actName) => this.coursePrefs[code].sectPrefs[this.prefs.curSec(code)].times.find(time => (time.name === actName)).map,
  }
}
}

// turn an activity map (a hook storing dropdown choices for each day of the week for an activity) into
// a custom json string representing the times for this activity.   
export const actMaps = {

  default: `[[false,0,0],[false,0,0],[false,0,0],[false,0,0],[false,0,0]]`,
  
  stringifyActivityMap : (map) => {
    return `{"name": "${map.name}" , 
            "times": [[${map.mon.selected},${map.mon.start},${map.mon.duration}],
             [${map.tue.selected},${map.tue.start},${map.tue.duration}],
             [${map.wed.selected},${map.wed.start},${map.wed.duration}],
             [${map.thu.selected},${map.thu.start},${map.thu.duration}],
             [${map.fri.selected},${map.fri.start},${map.fri.duration}]]
            }`
  },

  parseActivityMap: (str) => {
    const arr = JSON.parse(str);
    return {
      mon: {selected: arr[0][1], start: arr[0]}
    }
  },

}

