import { useState } from "react";

const SearchBar = ({handleSearch}) => {
  
  const [query, setQuery] = useState("");


  return(
    <div className="search-box">
      <input className="search-input"
        type="text"
        placeholder="Enter friend name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" onClick={()=>handleSearch(query)}>Add</button>
    </div>
  )
}
export default SearchBar