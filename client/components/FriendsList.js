import React, { useState, useEffect } from 'react';
import Friend from './Friend';

const testRes1 = [
  {
    username:'KellyP',
    watching:'CSI'
  },
  {
    username:'Ruby',
    watching:'Muppet Babies'
  }
]

const testRes2 = {
  username:'Shelby',
  watching:'test1'
}

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [textState, setText] = useState({value:''});

  useEffect(() => {
    //Req current user's friends from db & use res to set state
    //Iterate thru res & save each
    // fetch('/friends')
    //  .then((res) => res.json())
    //  .then((data) => {
    //     console.log('friends list: ', data);
    //     setFriends(data);
    //   }).catch((error) => console.log('ERROR retrieving Friends List: ', error));

    setFriends(testRes1);//this represents response from API call
  }, []);

  //create a Friend component for each friend in state 
  const renderFriendTags = () => {
    return friends.map(friend => {
      return (
        <li>
          <Friend 
            username={friend.username}
            watching={friend.watching}//is watching a separate request?
          />
        </li>   
      );
    });    
  };

  const submitFriend = (e) =>{
    e.preventDefault(); //prevents page refresh

    const userToAdd = textState.value //save text value for use in fetch request
    setText({value: ''}); //then reset text state to clear text field

    //check if a friend is already listed
    let friendListed = false;
    friends.forEach((friend) => {
      if(friend.username.toLowerCase() === textState.value.toLowerCase()){
        friendListed = true;
      }
    })

    if(friendListed){
      window.alert('this friend is already in your list');
    } else{
       //send fetch request to db to get info for user entered in text field
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
      //        setFriends([...friends, data]);
      //      }
      //   })

      //add friend to state
      setFriends([...friends, testRes2]);
    }
  }

  const updateTextState = (e) =>{
    setText({value: e.target.value});
  }

  //for each box that is checked, delete entry in followers table
  //then update state to trigger list rerender
  const unFollow = (e) =>{

    e.preventDefault();

    //create a list of checked items
    const checkboxes = document.getElementsByClassName('removeFriend');
    const removeList = {};
    
    for (let box of checkboxes){
      if(box.checked){
        console.log('this box is checked: ', box);
        removeList[box.id] = true;
      }
    }

    //update state to only show unchecked friends
    let friendsCopy = [...friends];
    console.log('friends copy before splice: ', friendsCopy);
    
    friendsCopy.forEach((friend, i) => {
      if (removeList[friend.username]){
        console.log('unfollow this friend: ', friend.username);
        friendsCopy.splice(i, 1);
      }
    })

    console.log('friends copy after splice: ', friendsCopy);
    setFriends([...friendsCopy]);

    //send req with list of friends to remove & use res to update state
    //fetch('/friends', {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(removeList)
    // }).then((res) => res.json())
    //   .then((data) => {
    //     setFriends([...friends, data]);
    //   })

  }

  return(
    <div>
      <h1>
      Friends List
      </h1>
      <div>
        <form onSubmit={submitFriend}>
          <input
            className='textField'
            type='text'
            value={textState.value}
            placeholder='Enter a username'
            onChange={updateTextState}/>
          <input
            type='submit'
            value='Add a Friend'/>
        </form>     
      </div>
      <form onSubmit={unFollow}>
        <ul>
          {renderFriendTags()}
        </ul>
      <input
        type='submit'
        value='Unfollow'/>
      </form>
      
    </div>    
  )
};

export default FriendsList;