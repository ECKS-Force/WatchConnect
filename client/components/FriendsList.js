import React, { useEffect } from 'react';
import Friend from './Friend';

document.cookie ='username=judy';

const testRes1 = [
  {
    publisher:'KellyP',
    watching:'Halt and Catch Fire',
    watchingImgSrc:'https://www.themoviedb.org/t/p/w220_and_h330_face/l4qvJ0lq59wR3ODX42DxBVFGoxx.jpg'
  },
  {
    publisher:'Ruby',
    watching:'Muppet Babies',
    watchingImgSrc:'https://www.themoviedb.org/t/p/w220_and_h330_face/oJc14qy42hABKKWlQwEguFdeTdU.jpg'
  }
]

const testRes2 = {
  publisher:'BreakerBeam',
  watching:'Dirty Dancing',
  watchingImgSrc:'https://www.themoviedb.org/t/p/w220_and_h330_face/dvEggyDTTIBDvrUNjTEa9depT0f.jpg'
}

const FriendsList = ({ friends, setFriends }) => {
  
  useEffect(() => {
    //Req current user's friends from db & use res to set state
    //Iterate thru res & save each
    fetch('/app/friendsList')
     .then((res) => res.json())
     .then((data) => {
        console.log('friends list: ', data);
        setFriends(data);
      }).catch((error) => console.log('ERROR retrieving Friends List: ', error));
  }, []);

  //create a Friend component for each friend in state 
  const renderFriendTags = () => {
    return friends.map(friend => {
      return (
        <li>
          <Friend 
            publisher={friend.publisher}
            watching={friend.watching}
            watchingImgSrc={friend.watchingImgSrc}
          />
        </li>   
      );
    });    
  };

  //for each box that is checked, delete entry in followers table
  //then update state to trigger list rerender
  const unFollow = (e) =>{

    e.preventDefault();

    //create a list of checked items
    const checkboxes = document.getElementsByClassName('removeFriend');
    const removeList = {};
    
    for (let box of checkboxes){
      if(box.checked){
        removeList[box.id] = true;
      }
    }

    //update state to only show unchecked friends
    let friendsCopy = [...friends];
    
    friendsCopy.forEach((friend, i) => {
      if (removeList[friend.publisher]){
        friendsCopy.splice(i, 1);
      }
    });
    
    setFriends([...friendsCopy]);

    //send req with list of friends to remove & use res to update state
    for(let publisher in removeList){
      
      let unfollowUser = {friend: publisher};

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

  }

  return(
    <div>
      <h1>
      Friends List
      </h1>
      <div>
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

export default FriendsList
        
        
       