class Section {
  constructor(letter, term, instructor) {
    this.letter = letter;
    this.term = term;
    this.instructor = instructor,
    this.subsections = [];
    this.commonActivities = [];
  }

  addSubsection(name, catNum){ 
    this.subsections.push({catNum, name});
  }

  addCommonActivity(name){
    this.commonActivities.push(name);
  }
}

class Activity {
  constructor(name, cat = "") {
    this.name = name;
    this.cat = cat;
    this.times = [];
  }

  addTime(timeString) {
    timeString.split("|").forEach((time) => {
      let arr = time.split(";");
      switch (arr[0]) {
        case("M"): this.times.push(this.name + "on monday from " + arr[1] + " to " + arr[2]); break;
        case("T"): this.times.push(this.name + "on tuesday from " + arr[1] + " to " + arr[2]); break;
        case("W"): this.times.push(this.name + "on wednesday from " + arr[1] + " to " + arr[2]); break;
        case("R"): this.times.push(this.name + "on thursday from " + arr[1] + " to " + arr[2]);  break;
        case("F"): this.times.push(this.name + "on friday from " + arr[1] + " to " + arr[2]); break;
      }
    });
  }

}
module.exports = Section, Activity;