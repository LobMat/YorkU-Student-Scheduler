//#region - imports
import { useState } from "react";
import { useMainContext } from '../Scheduling';
//#endregion

const SearchBar = () => {
  
  //#region - initialization
  const [query, setQuery] = useState("");
  
  const { 
    hooks:    {prefs}, 
    setters:  {pushCourse, pushAct},
    dev:      {initObj, initList, clear}
  } = useMainContext();
  //#endregion

  //#region - handlers
  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      // clear the local storage (reset for testing)
      if (query == 'clear') {
        initObj({});
        initList([]);
        clear(prefs);
        localStorage.setItem('coursePrefs', JSON.stringify(prefs))

      // check if course is on the courselist already, if not make fetch request.
      }
      
      // handle add duplicate course attempt 
      else if (prefs[query]) {
        alert("Course already added");
      }

      // make fetch request course otherwise
      else {
        const queryParams = new URLSearchParams();
        queryParams.append('code', `${query}`);
        
        fetch(`http://localhost:5000/courses/add?${queryParams.toString()}`, {method: "GET"})
          .then(response => response.json())
          .then(data => {
            console.log(data.courseObj);

            //create a 'default' preference object -- have backend handle this at a later point.
            prefs[query] = {
              sectionChoice: 0,
              sectionPreferences: data.courseObj.sections.map(section=>({
                uniqueActChoice: 0,
                commonActBlocks:  section.commonActs.map(()=>[[false,0,0],[false,0,0],[false,0,0],[false,0,0],[false,0,0]]),
                uniqueActBlocks:  section.uniqueActs.map(()=>[[false,0,0],[false,0,0],[false,0,0],[false,0,0],[false,0,0]]),
              }))
            }

            // write new preference object to local storage and write loaded course/activity data to state hooks. 
            localStorage.setItem('coursePrefs', JSON.stringify(prefs))
            pushCourse(data.courseObj)
            pushAct(query, data.activityObj);
          })
        .catch(error => {
          throw new Error(error.message);
        })
      }
    } catch (error) {
      console.error(error.message);
    }
    setQuery("");
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