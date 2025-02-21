import React, {useEffect, useState} from "react";
import useApp from '../../AppContext';




function SearchBar () {
    
  const { addNewCourse, prefObject} = useApp();
    
    

    const addCourse = async (query) => {
      try {
        await addNewCourse(query);
      } catch (error) {
        console.error("Error adding course.", error);
      }
    }
    
    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        if (!query.trim()) return;
        if (query == "clear"){
          localStorage.setItem('coursePrefList', "{}");
          return;
        }
        if (prefObject[query]) {                   // if course already is in list
         
            alert("You have added this course!")    // error message.
            setQuery("");
            return;
        }
        try {
            await addCourse(query);
            setQuery("");
        } catch (error) {
            console.error("Error fetching courses");
        }
    }

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
}

export default SearchBar;