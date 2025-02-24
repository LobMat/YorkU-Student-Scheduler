class Account {

  constructor(username, email, password, coursePrefObject = {}, friendsList = [], reviewList = []) {
    this.username = username;
    this.email = email;
    this.password = password

    this.coursePrefObject = coursePrefObject;
    this.friendsList = friendsList;
    this.reviewList = reviewList;
  }

  getLiteral() {
    return {
      password:         this.password,
      allCoursePrefs:      this.coursePrefObject,
      friends:          this.friendsList,
      reviews:          this.reviewList,
    }
  }

  static getAccountFromData(key, data) {
    const index = key.indexOf("|");
    return new Account(key.substring(0, index), key.substring(index+1), data.password, data.selections, data.friends, data.reviews);
  }
  addFriend(friendName) {
    
    this.friendsList.push(friendName);
  }

  getFriend(friendName) {
    return this.friendsList.find(friend => friend == friendName);
  }

}

class AccountUtils {
  static newPreference(course, sect=course.sectionList[0].sect, act=sectionList[0].activityList(), savedTimes = []) {
    return {
      course:         course,
      sectChoice:     sect,
      actChoice:      act,
      savedTimes:     savedTimes,
    };
  }
  static updatePrefSection(course, sect){
    
  }
  static updateActivitySavedTime(sect, sec, instructorName = "") {
    return {
      name:       activityName,
      cata:       catalogueNumber,
      instructor: instructorName,
    }
  }

  static activityList(section) {
      return section.commonActs.concat(section.subsects);
  }

  static findActivity(section, activityName) {
      return this.activityList(section).find((activity) => activity.name == activityName)
  }
  
  static addActivity(section, activityName, catalogueNumber = "", instructorName = "") { 
    const newActivity = this.newActivity(activityName, catalogueNumber, instructorName);
    ((catalogueNumber != "") ? section.subsects : section.commonActs).push(newActivity)
  }
}
module.exports = Account;



// addTime(timeString) {
//   timeString.split("|").forEach((time) => {s
//     let arr = time.split(";");
//     switch (arr[0]) {
//       case("M"): this.times.push(this.name + "on monday from " + arr[1] + " to " + arr[2]); break;
//       case("T"): this.times.push(this.name + "on tuesday from " + arr[1] + " to " + arr[2]); break;
//       case("W"): this.times.push(this.name + "on wednesday from " + arr[1] + " to " + arr[2]); break;
//       case("R"): this.times.push(this.name + "on thursday from " + arr[1] + " to " + arr[2]);  break;
//       case("F"): this.times.push(this.name + "on friday from " + arr[1] + " to " + arr[2]); break;
//     }
//   });
// };