//#region - imports
import { useState } from "react";
//#endregion

const SearchBar = () => {
  
  //#region - initialization
  const [query, setQuery] = useState("");
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
      <button className="search-button">Search</button>
    </div>
  )
  //#endregion

}

export default SearchBar;