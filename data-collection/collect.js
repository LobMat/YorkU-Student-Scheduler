/* 
   This console application accesses and collects PUBLIC data from York University's 
   Course Description Module (CDM). This program fully controls the scraping bot
   and may send collected data to other programs to be processed and sent to a database.

  To accomplish such data collection, Google's Puppeteer JS library was with some plugins.

  > I think the program does mostly work in its current state
  > Need to remove login process
  > Need to actually extract data
  > Work on iteration process
  > need more thorough commenting
*/


// Dependencies 
const { connect } = require('puppeteer-real-browser');
const process = require('./parse_test')
function sleep(ms) { return new Promise((resolve) => { setTimeout(resolve, ms)})}

//function that ensures a page is reached. 
async function ensurePage(page, pagename) {
  
  let pt = await page.title();
  
  while (pt != pagename) {
    pt = null;
    pt = await page.title();
    sleep(500);
  }
  pt = null;
}
//program 'main' function
async function start() {
  for (let i = 0; i < 219; i++) {
  // init puppeteer instance
  const { browser, page } = await connect({
    args: ["--window-size=1,1",
       '--disable-infobars',
     ],
    turnstile: true,
    headless: false,
    customConfig: {},

    plugins: [
      require('puppeteer-extra-plugin-stealth')()
    ],
    connectOption: {
      defaultViewport: null
    },

    disableXvfb: false,
    ignoreAllFlags: false
})

  try {
  
  // go to the york course website
  await page.goto("https://w2prod.sis.yorku.ca/Apps/WebObjects/cdm",{waitUntil: 'networkidle2'});

  // // get unique link and create login link 
  await page.waitForSelector('a[href*="/Apps/WebObjects/cdm.woa/"]');
  let csl = await page.$$('a[href*="/Apps/WebObjects/cdm.woa/"]') 
  csl = 'https://w2prod.sis.yorku.ca' + await csl[0].evaluate(e1 => e1.getAttribute('href'))
 
  //const loginLink = 'https://w2prod.sis.yorku.ca/Apps/WebObjects/cdm.woa/wa/loginppy?url=' + ;

  //go to login page and switch to manual for login (possibly we can fix this).
  await page.goto(csl, {waitUntil: 'networkidle0'});

  //reached the course page logged in. grab the link to the menu to return.
  await ensurePage(page, "York University Courses Website - Search Courses by Subject");  
  const menulink = await page.url();
  //course link root
  let clr = 'https://w2prod.sis.yorku.ca';

  
    await page.waitForSelector('#subjectSelect');
    await page.evaluate("document.getElementById('subjectSelect').value = " + i); //select Ith subject
    await page.evaluate("document.getElementsByName('3.10.3.7')[0].click()");  //click th button
    await page.waitForNavigation();                                                


    //create the base of a link for a course in this subject
    links = await page.$$('a[href*="/Apps/WebObjects/cdm.woa/"]');
    for(link of links){
      const text = await link.evaluate(e1 => e1.textContent);
      if (text === "Fall/Winter 2024-2025 Course Schedule") {
        clr += await link.evaluate(e1 => e1.getAttribute('href'));
        break;
      }
    }
    clr = clr.substring(0, clr.length - 5);

    links = null;
    
    
    //iterate through courses in the subject

    let j = 0;
    while (true) {
      
      console.log(clr + j + 0.5)
      await page.goto(clr + j + '.0.5', {waitUntil: 'networkidle0'});
      let pt = await page.title();
      if (pt == "York University Courses Website - Course View List") break;
      j++
      const htmData = await page.evaluate(() => document.querySelector('*').outerHTML);
      process(htmData)
      console.log();
      await sleep(500);

      //write something that resets J if read the same page twice. 
      // then, write data grabbing here
      // dont know where im storing it rn 
      // at least it all works mashallah

      
      
    }
    //return to subject list
    await page.goto(menulink, {waitUntil: 'networkidle0'});
  
  
  //end browser
  await page.close();
  await browser.close();
} catch (error) {
  await page.close();
  await browser.close();
  throw (error);
}
}
  
}

start();