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
  const [showRemoveButtons, setShowRemoveButtons] = useState(false); // Toggle for showing remove buttons

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
      const response = await fetch(`http://localhost:3000/accounts/acceptFriendRequest`, POST({ key: readLocal('id'), senderUsername: username }));
      if (response.ok) {
     
        loadFriendsList().then((loadedList) => setFriendsList(loadedList));
        fetch(`http://localhost:3000/accounts/dev/pending`, POST({ id: readLocal('id') }))
          .then((response) => response.json())
          .then((data) => setPendingRequests(data.pending || []));
      } else {
        alert(`Failed to accept friend request from ${username}.`);
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };
  
  
  const handleDenyRequest = async (username) => {
    try {
      const response = await fetch(`http://localhost:3000/accounts/denyFriendRequest`, POST({ key: readLocal('id'), senderUsername: username }));
      if (response.ok) {

        fetch(`http://localhost:3000/accounts/dev/pending`, POST({ id: readLocal('id') }))
          .then((response) => response.json())
          .then((data) => setPendingRequests(data.pending || []));
      } else {
        alert(`Failed to deny friend request from ${username}.`);
      }
    } catch (error) {
      console.error("Error denying friend request:", error);
    }
  };
  
  
  
  
  
  const handleRemoveFriend = async (friend) => {
    try {

      const response = await fetch(`http://localhost:3000/accounts/removeFriend`, POST({ key: readLocal('id'), friendUsername: friend}));
  
      if (response.ok) {

        const updatedFriendsList = await loadFriendsList();
        setFriendsList(updatedFriendsList);

        alert(`${friend} has been removed from your friends.`);
      } else {

        const errorData = await response.json();
        alert(`Failed to remove ${friend}: ${errorData.message || "Unknown error occurred."}`);
      }
    } catch (error) {

      console.error("Error removing friend:", error);
      alert(`An error occurred while removing ${friend}. Please try again.`);
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

        {/* Horizontal Layout */}
        <div className="friends-container">
          {/* Pending Friend Requests */}
          <div className="pending-requests">
            <h3>Pending Friend Requests</h3>
            <button onClick={togglePendingRequests}>
              {showPendingRequests ? "Hide Pending Requests" : "Show Pending Requests"}
            </button>
            {showPendingRequests && (
              <ul>
                {pendingRequests.map((request, index) => (
                  <li key={index}>
                    {request}
                    <button onClick={() => handleAcceptRequest(request)}>Accept</button>
                    <button onClick={() => handleDenyRequest(request)}>Deny</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Friend List */}
          <div className="friend-list">
            <h3>Your Friends</h3>

            {/* Toggle Remove Buttons */}
            <button onClick={() => setShowRemoveButtons(prev => !prev)}>
              {showRemoveButtons ? "Hide Remove Buttons" : "Remove Friends"}
            </button>

            <ul>
              {friendsList.map((friend, index) => (
                <li key={index}>
                  {friend}
                  {showRemoveButtons && (
                    <button 
                    className="remove-friend-icon"
                    onClick={() => handleRemoveFriend(friend)}
                    title="Remove friend"
                    >
                      ×
                      </button>
                    )}

                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </FriendsContext.Provider>
  );
  //#endregion
};

export default Friends;
