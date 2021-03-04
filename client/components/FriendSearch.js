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
    searchFriend();
  }

  //send fetch request to db to get list of user's matching entered username
  const searchFriend = (e) =>{
      
    setText({value: e.target.value});

    const userToSearch = e.target.value

    fetch(`/app/friendSearch/${userToSearch}`)
      .then((res) => res.json())
      .then((data) => {
        searchResults=[...data];
        renderSearchResults();
         
      }).catch(() => ('Error searching user'))    
    
  }

  const renderSearchResults = () =>{

    if(!Object.keys(searchResults).length){
      searchResultDisplay.push(
        <li>
          no matching users
        </li>
      )
    }else{
      const friendNames = {};

      //for each username result, set the button to follow or unfollow
      //depending on if the username is already in friend state
      friends.forEach(friend => {
        (friendNames[friend.publisher] = true)
      });
  
      searchResults.forEach(result => {
        let followFunc = follow;
        let followText = 'Follow';
        if(friendNames[result.username]){
          followFunc = unfollow;
          followText = 'Unfollow';
        }
        searchResultDisplay.push(
          <li>
            {result.username}
            <button onClick={followFunc} username={result.username}>
              {followText}
            </button>
          </li>)
      })
    }
    setResults(searchResultDisplay);
  }

  //Get username from button & send in fetch request to follow user
  const follow = (e) =>{
    setResults([]);
    
    let followUser = {friend: e.target.getAttribute('username')};
    
    // let textField = document.getElementsByClassName('textField');
    // for (let text of textField){
    //   console.log(text);
    //   text.value='';
    //   console.log(text);
    // }//.value='';

    fetch('/app/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(followUser)
    }).then((res) => res.json())
      .then((data) => {
        console.log('response from follow request: ', data);
        setFriends([...data]);
      })
  }

  const unfollow = (e) =>{
    setResults([]);

    let unfollowUser = {friend: e.target.getAttribute('username')};

    //send fetch request to db to get remove user
    fetch('/app/unfollow', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(unfollowUser)
    }).then((res) => res.json())
      .then((data) => {
        setFriends([...data]);
      })
  }

  return(
    <div>
      <input
        className='textField'
        type='text'
        value={textState.value}
        placeholder='Search a Username'
        onChange={searchFriend}/>
      <ul>
        {results}
      </ul>
    </div>
  )
}

export default FriendSearch;