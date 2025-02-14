import React, {useContext, useState} from "react";
import useApp from '../AppContext';
function SearchBar () {
    
    const { addCourse } = useApp();

    const [query, setQuery] = useState("");

    const handleSearch = async () => {
        if (!query.trim()) return;
        try {
            await addCourse(query);
        } catch (error) {
            console.error("Error fetching courses");
        }
        setQuery("");
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