import React, { useState } from 'react';

const RatingModal = ({ show, closeModal }) => {
  const { id, name } = show;

  const [numStars, setNumStars] = useState(0);
  const [selectedStars, setSelectedStars] = useState(undefined);
  const [review, setReview] = useState('');
  const [errMessage, setErrMessage] = useState(undefined);

  const renderStars = () => {
    return [...Array(5)].map((value, index) => {
      const starVersion = index + 1 <= numStars ? 1 : 2;

      return <img
        src={`https://img.icons8.com/material/52/000000/star--v${starVersion}.png`}
        data-idx={index}
        onMouseEnter={handleHover}
        onClick={handleClick}
      />
    });
  };

  const handleHover = (e) => {
    setNumStars(Number(e.target.dataset.idx) + 1);
  };

  const handleMouseLeave = (e) => {
    const newNumStars = selectedStars || 0;
    setNumStars(newNumStars);
  }

  const handleClick = (e) => {
    setSelectedStars(Number(e.target.dataset.idx) + 1);
  };

  const handleChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedStars) {
      setErrMessage('Select a rating and try again.');
      return;
    }

    alert('Submit rating!');
    closeModal();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h3>Rate {name}</h3>
        <div onMouseLeave={handleMouseLeave}>
          {renderStars()}
        </div>
        <textarea
          placeholder="Leave a review (optional)"
          onChange={handleChange}
        >
        </textarea>
        <input type="submit" value="Submit Review" />
        {errMessage !== undefined &&
          <div className="err-message">{errMessage}</div>
        }
      </form>
    </div>
  )
};

export default RatingModal;