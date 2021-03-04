import React from 'react';

const Friend = (props) => {
  
  const imgAlt = `${props.watching} movie poster`;

  let label = !props.watching ?
  `${props.publisher} isn't watching anything` :
  `${props.publisher} is watching ${props.watching}`;

  let img = !props.watching ?
  <span></span> :
  <img src={props.watchingImgSrc}
        alt={imgAlt}/>;

  return(
    <div> 
      <label>
        {label}
        {img}
        <input 
          type='checkbox'
          id={props.publisher}
          className='removeFriend'
          label='removeFriend'></input>
      </label>
    </div>
  )
};

export default Friend;