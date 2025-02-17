class AccountPrefs {
  constructor(username, coursePrefList={}) {
    username = username;
    coursePrefList = coursePrefList;
  }

  writeActTimes(course, actName, timeString) {
    coursePrefList[course].activities[actName] = timeString;    
  }

  setPrefs(course, sect, act) {
    coursePrefList[course].sect=sect;
    coursePrefList[course].act=act;
  }

}