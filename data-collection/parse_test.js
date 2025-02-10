/* 
   This console application interprets HTML data from York University's 
   Course Description Module (CDM) and collects the relevant data.
   
    To accomplish this, the 'Cheerio' JS library was used.

    > This program will be connected to the data gatherer to automate the process
    > This program will be set up later to send data to our database

    > Need to work on an iterative process to extract all data from a page.
*/


// Dependencies 
//filesystem, just for testing.
//const {addCourse} = require('./firebase')

const cheerio = require('cheerio');

//lets write some awesome functionalities
 async function process (htmData) {

  
  

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

class Section {
  constructor(letter, term, prof, unique, common, diffBy) {
  this.letter= letter,
  this.term= term,
  this.prof= prof,
  this.unique= unique, //array of classes.
 this.common= common,
  this.diffBy= diffBy; // true or false
  }
}

// Get html data from file.

//const data = fs.readFileSync('./samples/example2.html', { encoding: 'utf8', flag: 'r' }).toString();
const sectTable = ChNode(cheerio.load(htmData)('table > tbody')).cell(1,1).table().child('tr',1).table(3); 
let courseName = ChNode(cheerio.load(htmData)('table > tbody')).table(4).cell(0,0).text();
courseName = courseName.replace('/', ' ')
console.log(courseName);
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
  let uniqueType = ""; // the type of activity which separates catalogue entries.
  let unique = [];     // activities linked to a cat entry
  let common = [];     // activites common to all cat entries.

  // Iterate through all activities in the section.

  for (let actNode, j = 0; actNode = sectNode.realAct(j); j++) {

    // Get current activity name and catalogue number
    let actName = actNode.child('td',0).text();
    let actCata = actNode.child('td',2).text();

    // First instance of a non-empty catalogue number indicates that activity is unique.
    if (uniqueType == "" && actCata != "") uniqueType = actName.substring(0,4);

    // If unique type has been found and matches current activity, add to unique array. 
    if (uniqueType != "" && actName.includes(uniqueType))
       unique[unique.length] = {id: actName, cata: actCata}
    else // Otherwise add to common array.
        common[common.length] = actName
   }
  
  //add section object with this info to section array.
  console.log("section " + letter + " term " + term)
  console.log("taught by: " + prof)
  console.log(unique);
  console.log(common);
  }
  
}
module.exports = process
//addCourse(courseName, sections)