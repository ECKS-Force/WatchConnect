import React, { Fragment, useEffect } from 'react';

// dummy data
// https://www.themoviedb.org/t/p/w220_and_h330_face/azL2ThbJMIkts3ZMt3j1YgBUeDB.jpg
const shows = {
  watching: [
    {
      id: 42,
      poster_path: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSkRG4HUYivOdDapY5-E2CUZ-IvT41J2ZmnY6zEOiUN1gT3LDNc',
      original_title: 'Sex and the City',
    },
    {
      id: 289,
      poster_path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw2zXdEOd3MM-E-4CHn12yXipBS6jnAZYIJvacWzPBclnWBdlq',
      original_title: 'Frasier'
    },
    {
      id: 19,
      poster_path: 'data:image/jpeg;base64,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',
      original_title: '30 Rock'
    },
    // {
    //   image: '',
    //   title: 'The Office'
    // }
  ],
  upNext: [
    {
      id: 184,
      poster_path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLsdRucK164zodyQeX0GXVbxhFUV_GTst0Hg&usqp=CAU',
      original_title: 'The Office'
    },
    {
      id: 285,
      poster_path: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQnVt9EVV3AmoEKp9h1oAabOF8v3MoXxMtq_dmbPIRtdRQrNqzb',
      original_title: 'The Undoing'
    },
    {
      id: 39,
      poster_path: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSmCg8Pi95oFkB1axpC1xpAFxsZaRCrwMGCSbZW4ZDfJLQu5U3u',
      original_title: 'Brooklyn Nine-Nine'
    },
    {
      id: 274,
      poster_path: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQo0ohzrQhUvUMEE37Ienmr--iDmQ0rAMFKJZeCQDZ4UZGgL79U',
      original_title: 'The Inbetweeners'
    },
    {
      id: 479,
      poster_path: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQRfgOjyRzuClxEz8F5mkoGNHkoUvhLzfIS_ebXT6NIy_MqCLsL',
      original_title: 'The Queen\'s Gambit'
    },
    {
      id: 792,
      poster_path: 'https://i.pinimg.com/originals/1b/88/4b/1b884bffabfe27f2271752c8c9da3f08.jpg',
      original_title: 'Sherlock'
    }
  ]
};

const WatchList = ({ openModal }) => {
  useEffect(() => {
    fetch('/app/content')
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  }, []);

  const renderWatching = (showArr) => {
    return showArr.map(show => <ShowIcon show={show} />);
  };

  return (
    <>
      <section className="watching">
        <div className="watch-list-header">
          <h2>Currently Watching</h2>
        </div>
        <div className="show-container">
          {renderWatching(shows.watching)}
        </div>
      </section>
      <section className="queue">
        <div className="watch-list-header">
          <h2>My Queue</h2>
        </div>
        <div className="show-container">
          {renderWatching(shows.upNext)}
        </div>
      </section>
    </>
  );
};

const ShowIcon = ({ show }) => {
  return (
    <div className="show-icon">
      <a href={`/shows/${show.id}`}>
        <img src={show.poster_path} />
      </a>
      <div className="show-button-container">
        <i class="fas fa-user"></i>
        <button>Mark as Watched</button>
        <button>Move to My Queue</button>
        <button>Remove From List</button>
      </div>
    </div>
  );
}

export default WatchList;