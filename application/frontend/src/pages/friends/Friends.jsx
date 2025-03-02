//#region - imports
  //#region - functional imports
  import { createContext, useContext, useEffect, useState, } from "react"; //react hooks
  import { useNavigate } from 'react-router-dom'
  import { useMountedEffect } from "../../logic/CustomEffects";  //custom hooks
  import { readLocal,  } from "../../logic/BrowserStorage";
  //#endregion
  //#region - component imports
  import { useAppContext } from "../../App";
  import FriendSearch from "./components/FriendSearch";
  //#endregion
  //#region - style imports
  import './Friends.css'
  //#endregion
  //#region - context creation
const FriendsContext = createContext();
export const useFriends = () => useContext(FriendsContext);
//#endregion
//#endregion

const Friends = () => {
  //#region - instantiation 

  const navigate = useNavigate();
  const [friendsList, setFriendsList] = useState([]);

  const {
    fetchMethods: {loadFriendsList},
    navigation: {hasSignedIn, navigationTrigger}, 
  } = useAppContext();


  //#endregion
  
  //#region - mount effects

  //navigation trigger on mount
  useEffect(() => { navigationTrigger() }, []);

  useMountedEffect(() => {
    if (!hasSignedIn) {
      navigate('/')
    } else {
       loadFriendsList().then(loadedList => setFriendsList(loadedList));
    }
  }, [hasSignedIn])
  //#endregion

  //#region - html return
  return(
    <FriendsContext.Provider value={{friendsList, setFriendsList}}>
      <div id='left-body'>

        <FriendSearch />

        <div className="course-list">
          <ul>
            {friendsList.map((friend, index) => 
              <p key={index}>{friend}</p>
            )}
           
          </ul>
        </div>
      </div>
      <div id='right-sect'>
        <h2>development commands</h2>
        <h3>type into the search bar for testing purposes</h3><br />
        <p>switch:username -- set current account to 'newAcc' and refreshes page</p>
        <p>pending -- see all pending requests for current account</p>
        <p>clear -- clear friendslist for this account</p>

      </div>

    </FriendsContext.Provider>
  );
  //#endregion

}

export default Friends
