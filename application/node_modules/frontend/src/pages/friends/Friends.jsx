//#region - imports
  //#region - functional imports
  import { createContext, useContext, useEffect, useState } from "react"; // React hooks
  import { useNavigate } from 'react-router-dom';
  import { useMountedEffect } from "../../logic/CustomEffects"; // Custom hooks
  import { readLocal, POST } from "../../logic/BrowserStorage";
  //#endregion
  //#region - component imports
  import { useAppContext } from "../../App";
  import FriendSearch from "./components/FriendSearch";
  //#endregion
  //#region - style imports
  import './Friends.css';
  //#endregion
  //#region - context creation
const FriendsContext = createContext();
export const useFriends = () => useContext(FriendsContext);
//#endregion
//#endregion

const Friends = () => {
  //#region - instantiation
  const navigate = useNavigate();
  const [friendsList, setFriendsList] = useState([]); // State to store the friend list
  const [pendingRequests, setPendingRequests] = useState([]); // State to store pending friend requests
  const [showPendingRequests, setShowPendingRequests] = useState(false); // Toggle for pending requests

  const {
    fetchMethods: { loadFriendsList },
    navigation: { hasSignedIn, navigationTrigger },
  } = useAppContext();
  //#endregion

  //#region - mount effects

  // Trigger navigation check on mount
  useEffect(() => {
    navigationTrigger();
  }, []);

  // Load the friend list and pending requests after the component mounts
  useMountedEffect(() => {
    if (!hasSignedIn) {
      navigate('/');
    } else {
      // Load the friend list
      loadFriendsList().then((loadedList) => setFriendsList(loadedList));

      // Fetch pending friend requests
      fetch(`http://localhost:3000/accounts/dev/pending`, POST({ id: readLocal('id') }))
        .then((response) => response.json())
        .then((data) => setPendingRequests(data.pending || []));
    }
  }, [hasSignedIn]);
  //#endregion

  //#region - handlers
  const handleAcceptRequest = async (username) => {
    try {
      const response = await fetch(`http://localhost:3000/accounts/acceptFriend`, POST({ receiver: readLocal('id'), sender: username }));
      if (response.ok) {
        setFriendsList((prev) => [...prev, username]); // Add to friend list
        setPendingRequests((prev) => prev.filter((req) => req !== username)); // Remove from pending requests
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDenyRequest = async (username) => {
    try {
      const response = await fetch(`http://localhost:3000/accounts/denyFriend`, POST({ receiver: readLocal('id'), sender: username }));
      if (response.ok) {
        setPendingRequests((prev) => prev.filter((req) => req !== username)); // Remove from pending requests
      }
    } catch (error) {
      console.error("Error denying friend request:", error);
    }
  };

  const togglePendingRequests = () => {
    setShowPendingRequests((prev) => !prev);
  };
  //#endregion

  //#region - html return
  return (
    <FriendsContext.Provider value={{ friendsList, setFriendsList }}>
      <div id="friends-page">
        {/* Friend Search Component */}
        <div className="friend-search-bar">
          <FriendSearch />
        </div>

        {/* Friend List */}
        <div className="friend-list">
          <h3>Your Friends</h3>
          <ul>
            {friendsList.map((friend, index) => (
              <li key={index}>{friend}</li>
            ))}
          </ul>
        </div>

        {/* Toggleable Pending Friend Requests */}
        <div className="pending-requests">
          <button onClick={togglePendingRequests}>
            {showPendingRequests ? "Hide Pending Requests" : "Show Pending Requests"}
          </button>
          {showPendingRequests && (
            <div className="pending-requests-list">
              <h3>Pending Friend Requests</h3>
              <ul>
                {pendingRequests.map((request, index) => (
                  <li key={index}>
                    {request}
                    <button onClick={() => handleAcceptRequest(request)}>Accept</button>
                    <button onClick={() => handleDenyRequest(request)}>Deny</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </FriendsContext.Provider>
  );
  //#endregion
};

export default Friends;
