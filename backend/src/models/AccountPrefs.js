class AccountPrefs {
  
  // this model stores the preferences for a user's course selections. the purpose of this is so
  // each time a course is modified, only the preference database object will be updated. rather than whole account
  constructor(username, coursePrefObject={}) {
    username = username;
    a  = coursePrefObject;  //object containing the course preferences. 
  }
  
  getPreferedSection() {

  }
  writeActTimes(course, actName, timeString) {
    coursePrefList[course].activities[actName] = timeString;    
  }

  setPrefs(course, sect, act) {
    coursePrefList[course].sect=sect;
    coursePrefList[course].act=act;
  }

}