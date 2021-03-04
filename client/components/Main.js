import React, { useState }  from 'react';

import FriendsList from './FriendsList';
import WatchList from './WatchList';
import Feed from './Feed';
import FriendSearch from './FriendSearch';

const Main = () => {
  
  const [friends, setFriends] = useState([]);

  const setFriendState = (newValue) => {
    setFriends(newValue);
  }

  return (
    <div>
      <FriendSearch friends={friends} setFriends={setFriendState}/>
      <FriendsList friends={friends} setFriends={setFriendState}/>);
    </div>
  )
};

export default Main;