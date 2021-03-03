import React from 'react';

const Friend = (props) => {
  
  const imgAlt = `${props.watching} movie poster`;

  return(
    <div> 
      <label>
        {props.username} is watching {props.watching}
        <img src={props.watchingImgSrc}
        alt={imgAlt}/>
        <input 
          type='checkbox'
          id={props.username}
          className='removeFriend'
          label='removeFriend'></input>
      </label>
    </div>
  )
};

export default Friend;