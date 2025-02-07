//#region - imports
  import { createContext, useContext,  } from "react"; //react hooks
  import SearchBar from "./components/SearchBar";
  import './styles/LeftBody.css'
//#endregion

//#region - context creation
const SchedulingContext = createContext();
export const useMainContext = () => useContext(SchedulingContext);
//#endregion

const MainPage = () => {
  //#region - html return
  return(
    <SchedulingContext.Provider value={{}}>
      <div id='left-body'>

        <SearchBar />

        <div className="course-list">
        </div>
      </div>
      <div id='right-body'>
      </div>

    </SchedulingContext.Provider>
  );
  //#endregion

}

export default MainPage
