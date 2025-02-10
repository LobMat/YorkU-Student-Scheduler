class Section {
  constructor(letter, term, professor, uniqueActivities =[], commonActivities = []) {
    this.letter = letter;
    this.term = term;
    this.professor = professor,
    this.uniqueActivities = uniqueActivities,
    this.commonActivities = commonActivities;
  }

  addUniqueActivity(actName, catNum) {
    this.uniqueActivities.push({actName, catNum});
  }
  addCommonActivity(actName) {
    this.commonActivities.push(actName);
  }

  static fromFirestore(data) {
     return new Section(data.letter, data.term, data.professor, data.uniqueActivites, data.commonActivities);
  }
}

module.exports = Section;