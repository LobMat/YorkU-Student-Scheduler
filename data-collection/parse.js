/* 
   This console application interprets HTML data from York University's 
   Course Description Module (CDM) and collects the relevant data.
   
    To accomplish this, the 'Cheerio' JS library was used.

    > This program will be connected to the data gatherer to automate the process
    > This program will be set up later to send data to our database

    > Need to work on an iterative process to extract all data from a page.
*/


// Dependencies 
const cheerio = require('cheerio');  
const fs = require('fs');             //filesystem, just for testing.

const Course = require('../backend/src/business-objects/Course.js')
const Section = require('../backend/src/business-objects/Section.js')

//lets write some awesome functionalities
const ChNode = (element) => Object.assign(element, {
  table: (n = 0) =>       ChNode((n > 0) ? element.find('table').eq(n).children('tbody:first') : element.find('table > tbody:first')),
  child: (type, n = 0) => ChNode(element.children(type).eq(n)),
  cell: (row, col) =>     ChNode(element.children('tr').eq(row).children('td').eq(col)),
  realSect (i) {
    let ret = sectTable.child('tr',i).table(); 
    return (ret.html()) ? ret : null;
  },
  realAct (j) {
    let ret = this.table().child('tr', j+1)
    return (ret.html()) ? ret : null;
  }
});


// Get html data from file.
const data = fs.readFileSync('./samples/example2.html', { encoding: 'utf8', flag: 'r' }).toString();
const sectTable = ChNode(cheerio.load(data)('table > tbody')).cell(1,1).table().child('tr',1).table(3); 
let courseName = ChNode(cheerio.load(data)('table > tbody')).table(4).cell(0,0).text();
currentCourse = new Course(courseName.replace('/', ' '));

let sections = [];  //array of all section and their info

//Iterate through all sections on the page.
for (let sectNode, i = 0; sectNode = sectTable.realSect(i); i++) {

  // Get current section's letter and term markers.
  let letter = sectNode.cell(0,0).text().charAt(19);
  let term   = sectNode.cell(0,0).text().charAt(5);

  //Get current section's professor's name
  let prof = sectNode.cell(1, 0).text();
      prof = prof.substring(prof.lastIndexOf(':')+2, prof.length).replace(/\s+/g, ' ').trim();
  

  // Initialize variables storing activity info.
  currentSection = new Section(letter, term, prof);
  let uniqueType = "";
  
  // Iterate through all activities in the section.
  for (let actNode, j = 0; actNode = sectNode.realAct(j); j++) {

    // Get current activity name and catalogue number
    let actName = actNode.child('td',0).text();
    let actCata = actNode.child('td',2).text();

    // First instance of a non-empty catalogue number indicates that activity is unique.
    if (uniqueType == "" && actCata != "") uniqueType = actName.substring(0,4);

    // If unique type has been found and matches current activity, add to unique array. 
    if (uniqueType != "" && actName.includes(uniqueType))
       currentSection.addUniqueActivity(actName, actCata);
    else // Otherwise add to common array.
        currentSection.addCommonActivity(actName, actCata);
   }
   
  //add section object with this info to section array.  
  currentCourse.addSection(currentSection);
}
currentCourse.save();