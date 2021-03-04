import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// dummy data
const dummyReviews = [
  {
    username: 'codesmithbro',
    rating: 3,
    text: 'Not my cup of tea.'
  },
  {
    username: 'anotherperson1234',
    rating: 5,
    text: 'Best show ever!'
  },
  {
    username: 'i_love_tv',
    rating: 1,
    text: 'Worst show ever.'
  }
];

const ShowPage = ({ openModal }) => {
  const [show, setShow] = useState(undefined);
  const [reviews, setReviews] = useState([]);
  const [inQueue, setInQueue] = useState(undefined);
  let { id } = useParams();
  id = Number(id);

  useEffect(() => {
    // call api here
    setReviews(dummyReviews);

    fetch(`/app/showInfo/tv/${id}`)
      .then(res => res.json())
      .then(res => {
        setShow(res);
      })
      .catch(err => console.log(err));

    // check if show's in user's watch list
    fetch('/app/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(shows => {
        let queued = false;
        for (let i = 0; i < shows.length; i++) {
          if (shows[i].contentid === id) {
            console.log('success');
            queued = true;
            break;
          }
        }

        setInQueue(queued);
      });
  }, []);

  const renderReviews = () => {
    return reviews.map(reviewObj => <Review review={reviewObj} />);
  };

  const toggleQueue = () => {
    if (inQueue) {
      fetch('/app/deleteMedia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          media: 'tv'
        })
      })
        .then(() => {
          // check if successful
          console.log('success!');
          setInQueue(false);
        });
    } else {
      fetch('/app/addMedia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          media: 'tv',
          watching: 'queued'
        })
      })
        .then(() => {
          // check if successful
          setInQueue(true);
        });
    }
  };

  const addRating = () => {
    openModal({ type: 'RATING', show });
  };

  const calculateAverage = () => {
    const sum = reviews.reduce((a, b) => a + b.rating, 0);
    const average = sum / reviews.length;
    const avgRounded = Math.round(average * 10) / 10;
    return avgRounded.toFixed(1);
  };

  if (show && reviews && inQueue !== undefined) {
    return (
      <>
        <div className="show-page-header">
          <img
            src={`https://www.themoviedb.org/t/p/original${show.imgPath}`}
            className="show-page-poster"
          />
          <div>
            <span></span>
            <h1>{show.name}</h1>
            <button onClick={toggleQueue}>
              {inQueue ? 'Remove From Watch List' : 'Add to Watch List'}
            </button>
            <button onClick={addRating}>Rate This Show</button>
            <p>{show.description}</p>
            <div className="rating-avg">
              <img src="https://img.icons8.com/material/24/000000/star--v1.png" />
              <div>
                <span>{calculateAverage()}</span> Friends Rating
              </div>
            </div>
          </div>
        </div>
        <div>
          {renderReviews()}
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>
  }
};

const Review = ({ review }) => {
  const { username, rating, text } = review;

  const renderStars = () => {
    return [...Array(rating)].map(value => {
      return <img src="https://img.icons8.com/material/24/000000/star--v1.png"/>
    });
  }

  return (
    <div className="review">
      <div className="rating">
        {renderStars()}
      </div>
      <div>
        <h3>{username}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ShowPage;