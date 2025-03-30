//#region - imports
import { useState } from "react";
import { writeLocal } from "../../../logic/BrowserStorage";
import { useMainContext } from "../HomePage";
//#endregion

const defaultTimeBlocks = () =>
  Array.from({ length: 5 }, () => [false, 0, 0]);

const buildSectionPreferences = (section) => ({
  uniqueActChoice: 0,
  commonActBlocks: section.commonActs.map((act) => ({
    name: act.actName,
    times: defaultTimeBlocks(),
  })),
  uniqueActBlocks: section.uniqueActs.map((act) => ({
    name: act.actName,
    times: defaultTimeBlocks(),
  })),
});

const isClearCommand = (query) => query.trim().toLowerCase() === "clear";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const {
    hooks: { prefs },
    setters: { pushCourse },
    dev: { initList, initMap },
  } = useMainContext();

  const handleClear = () => {
    initList([]);
    initMap();
    writeLocal("coursePrefs", {});
  };

  const handleAddCourse = async () => {
    const parameters = new URLSearchParams();
    parameters.append("code", query);

    const response = await fetch(
      `http://localhost:3000/courses/add?${parameters}`,
      { method: "GET" }
    );
    const data = await response.json();

    if (!data.courseObject) {
      alert("Course does not exist!");
      return;
    }

    const newPrefs = {
      sectionChoice: 0,
      sectionPreferences: data.courseObject.sections.map(buildSectionPreferences),
    };

    prefs.current[query] = newPrefs;
    writeLocal("coursePrefs", prefs.current);
    pushCourse(data.courseObject);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    if (isClearCommand(query)) {
      handleClear();
    } else if (prefs.current[query]) {
      alert("Course already added.");
    } else {
      await handleAddCourse();
    }
  };

  return (
    <div className="search-box">
      <input
        className="search-input"
        type="text"
        placeholder="Enter course name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;