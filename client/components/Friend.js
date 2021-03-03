import React from 'react';

const Friend = (props) => {
  //logic for button
  // const removeFriend = id =>{
  //   fetch('/friends', {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(id)//is this right...?
  //   }).then((res) => res.json())
  //     .then((data) => {
  //       console.log('confirmation: ', data);
  //   }).catch((error) => console.log('ERROR deleting friends: ', error));
  // }
  
  console.log('these are the props: ', props);

  return(
    <div> 
      <label>
        {props.username} is watching {props.watching}
        <input 
          type='checkbox'
          id={props.username}
          className='removeFriend'
          label='removeFriend'></input>
      </label>
    </div>
  )
};

//onClick={removeFriend(props.userID)}

export default Friend;