import { useAppContext } from "../../App";
import Schedule from "./components/Schedule";
import { useEffect, useState } from "react";
import { useMountedEffect } from "../../logic/CustomEffects";
import { useNavigate } from "react-router-dom";
import './styles/ComparePage.css';
import { readLocal } from "../../logic/BrowserStorage";
const ComparePage = () => {

  const [myCourseList, setMyCourseList] = useState([]);
  const [friendCourseList, setFriendCourseList] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  const [selectedFriend, setSelectedFriend] = useState('');

  const navigate = useNavigate();

  const {
    fetchMethods: { courseListFromPrefs, loadFriendsList },
    navigation: { hasSignedIn, navigationTrigger },
  } = useAppContext();


  //#endregion

  //#region - mount effects

  //navigation trigger on mount
  useEffect(() => { navigationTrigger() }, []);

  useMountedEffect(() => {
    if (!hasSignedIn) {
      navigate('/')
    } else {
      loadFriendsList().then(loadedList => { if (loadedList) setFriendsList([''].concat(loadedList)) });
      courseListFromPrefs(readLocal('coursePrefs')).then(loadedList => setMyCourseList(loadedList));
    }
  }, [hasSignedIn])

  //fetch request for list of course objects in the pref object.

  useMountedEffect(() => {
    const qp = new URLSearchParams();
    qp.append('user', selectedFriend);
    if (selectedFriend == '') {
      setFriendCourseList([]);
    } else {
      fetch(`http://localhost:3000/accounts/getPrefs?${qp.toString()}`, { method: "GET" })
        .then(response => response.json())
        .then(data => {
          if (data) {
            courseListFromPrefs(data.prefs).then(list => setFriendCourseList(list));
          }
        })
    }
  }, [selectedFriend])

  //#region - html return
  return (
    <>
      <div id='compare-left-body'>
        <p>Choose Friend:</p>
        <select value={selectedFriend} onChange={(e) => setSelectedFriend(e.target.value)}>
          {friendsList?.map(friendName => (
            <option key={friendName} value={friendName}>
              {friendName}
            </option>
          ))}
        </select>
      </div>
      <div id='compare-right-body'>

        <Schedule term="FALL" courses={myCourseList} />
        <Schedule term="WINTER" courses={myCourseList} />
        <Schedule term="FALL" courses={friendCourseList} />
        <Schedule term="WINTER" courses={friendCourseList} />


      </div>


    </>
  );
  //#endregion
}

export default ComparePage;
