//#region - imports
import { useState } from "react";
import { writeLocal } from "../../../logic/BrowserStorage";
import { useMainContext } from "../HomePage";
//#endregion

const SearchBar = () => {
  
  //#region - initialization
  const [query, setQuery] = useState("");

  const {
    hooks: {prefs}, 
    setters: {pushCourse},
    dev: {initList, initMap},
  } = useMainContext();
         
  //#endregion

  //#region - handlers
  const handleSearch = () => {
    
    // do nothing on empty query
    if (!query.trim) return;
      
    // testing function: enter clear to empty course list
    if (query == 'clear') {
      initList([]);
      initMap();
      writeLocal('coursePrefs', {});
    } 
    // duplicate course
    else if (prefs.current[query]) {
      alert('Course already added.');
    }

    // add course
    else {
      const parameters = new URLSearchParams();
      parameters.append('code', `${query}`);
      fetch(`http://localhost:3000/courses/add?${parameters.toString()}`, {method: 'GET'})
      .then(response => response.json())
      .then(data => {
        if (data.courseObject)  {
          console.log(data.courseObject);  //console test

          prefs.current[query] = {
            sectionChoice: 0,
            sectionPreferences: data.courseObject.sections.map(section=>({
              uniqueActChoice: 0,
              commonActBlocks:  section.commonActs.map((act)=>({name: act.actName, times: [[false,0,0],[false,0,0],[false,0,0],[false,0,0],[false,0,0]]})),
              uniqueActBlocks:  section.uniqueActs.map((act)=>({name: act.actName, times: [[false,0,0],[false,0,0],[false,0,0],[false,0,0],[false,0,0]]})),
            }))
          }
          writeLocal('coursePrefs', prefs.current);
          pushCourse(data.courseObject);


        } else {
          alert('Course does not exist!');
        }
      })
    }
  }
  //#endregion

  //#region - html return
  return(
    <div className="search-box">
      <input className="search-input"
        type="text"
        placeholder="Enter course name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  )
  //#endregion

}

export default SearchBar;