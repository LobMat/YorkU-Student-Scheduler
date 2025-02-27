//#region - imports
import { useState } from "react";
import { useFriends } from '../Friends';
import { readLocal, writeLocal, POST } from "../../../logic/BrowserStorage";
//#endregion
const route = 'http://localhost:3000/accounts';

const FriendSearch = () => {
  
  //#region - initialization
  const [query, setQuery] = useState("");
  
  const { friendsList, setFriendsList
  } = useFriends();
  //#endregion

  //#region - handlers
  const handleSearch = async () => {
    if (!query.trim()) return;
    try {

      // clear the local storage (reset for testing)
      if (query == 'clear') {
        fetch(`${route}/dev/clear`, POST({id: readLocal('id')}))
        .then(
          setFriendsList([])
        );
      }
      // switch accounts (for testing)
      else if (query.includes('switch')) {
        const id = query.substring(query.indexOf(':')+1);
        fetch(`${route}/dev/switch`, POST({newUsername: id}))
        .then((response) => {
          if (response.status === 201){
            alert ('not found!')
          } else {
            Promise.resolve(response.json())
            .then(data => {
              writeLocal('id', data.key);
              window.location.reload();
            })
          }
        })
      }
      // log currently pending requests for this account.
      else if (query == 'pending') {
        fetch(`${route}/dev/pending`, POST({id: readLocal('id')}))
        .then((response) => response.json())
        .then(data => {
          console.log(data.pending);
        })
      }
      // attempt to add the friend.
      else {
        fetch(`${route}/addFriend`, POST({ sender: readLocal('id'), receiver: query }))    
        .then((response) => {
          switch (response.status) {
            case 200: setFriendsList((prev) => [...prev, query]);                         break;
            case 201: alert(`A friend request to ${query} has been sent successfully.`);  break;
            case 202: alert(`You have already sent a friend request to ${query}.`);       break;
            case 203: alert(`You are already friends with ${query}.`);                    break;
            case 204: alert(`Could not find user with the name ${query}.`);               break;
          }
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
        placeholder="Enter friend name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>Add</button>
    </div>
  )
  //#endregion

}

export default FriendSearch;