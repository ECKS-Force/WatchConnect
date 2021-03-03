import React, { useState } from 'react';
import { render } from 'react-dom';

const testSearchResult = [
  'angeleq',
  'angelica2021',
  'AngelEyez'
];

const testRes3 = {
  username:'angeleq',
  watching:'Steven Universe',
  watchingImgSrc:'https://www.themoviedb.org/t/p/w220_and_h330_face/g31ZPZSjv8ySPbclyYZZU50XhZy.jpg'
}

const FriendSearch = ({ friends, setFriends }) =>{
  const [textState, setText] = useState({value:''});
  const [results, setResults] = useState([]);
  const searchResultDisplay = [];
  let searchResults = [];

  const updateTextState = (e) =>{
    setText({value: e.target.value});
  }

  const searchFriend = (e) =>{
    console.log('in searchFriend function');
    e.preventDefault(); //prevents page refresh
  
    const userToSearch = textState.value //save text value for use in fetch request
    setText({value: ''}); //then reset text state to clear text field

    
    //send fetch request to db to get list of user's matching entered username
    //display a list of usernames (links to user page) and a follow or unfollow button
    //if user is already followed, button shows 'unfollow'
    //fetch('/friends', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({username: userToSearch})
    // }).then((res) => res.json())
    //   .then((data) => {
    //      if(!data){
    //        window.alert('user not found');
    //      } else{
    //        searchResult=[...data];
    //      }
    //   })

    searchResults = [...testSearchResult];
    console.log('search results are: ', searchResults);

    return renderSearchResults();
  }

  const renderSearchResults = () =>{
    console.log('in renderSearchResults function');

    const friendNames = {};
    

    //for each username result, set the button to follow or unfollow
    //depending on if the username is already in friend state
    
    friends.forEach(friend => {
      (friendNames[friend.username.toLowerCase()] = true)
    });

    searchResults.forEach(username => {
      let followFunc = follow;
      let followText = 'Follow';
      if(friendNames[username.toLowerCase()]){
        followFunc = unfollow;
        followText = 'Unfollow';
      }
      searchResultDisplay.push(
        <li>
          {username}
          <button onClick={followFunc} username={username}>
            {followText}
          </button>
        </li>)
    })
    console.log('searchResultDisplay: ', searchResultDisplay);
    setResults(searchResultDisplay);  
  }

  const follow = () =>{
    setResults([]);
    //send fetch request to db to get info for user
    //fetch('/friends', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({username: userToAdd})
    // }).then((res) => res.json())
    //   .then((data) => {
    //      if(!data){
    //        window.alert('user not found');
    //      } else{
    //        setFriends([...data]);
    //      }
    //   })
    setFriends([...friends, testRes3]); //Remove once fetch req is functional
  }

  const unfollow = (e) =>{
    setResults([]);
    //send fetch request to db to get remove user
    //fetch('/friends', {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({username: userToRemove})
    // }).then((res) => res.json())
    //   .then((data) => {
    //      setFriends([...data]);
    //   })
    let friendsCopy = [...friends]; //Remove once fetch req is functional
    console.log('friends copy before splice: ', friendsCopy);
    
    friendsCopy.forEach((friend, i) => {
      if (friend.username === e.target.username){
        console.log('unfollow this friend: ', friend.username);
        friendsCopy.splice(i, 1);
      }
    })

    console.log('friends copy after splice: ', friendsCopy);
    setFriends([...friendsCopy]);
  }

  return(
    <div>
      <form onSubmit={searchFriend}>
        <input
          className='textField'
          type='text'
          value={textState.value}
          placeholder='Enter a username'
          onChange={updateTextState}/>
        <input
          type='submit'
          value='Search'/>
      </form>
      <ul>
        {results}
      </ul>
    </div>
  )

}

export default FriendSearch;