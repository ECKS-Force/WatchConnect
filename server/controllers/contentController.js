const db = require('../models/databaseModel');
const fetch = require('node-fetch');
const apiKey = require('./apiKey');

const contentController = {};

contentController.getContentList = (req, res, next) => {
  const query = 'SELECT * FROM contentLists' + ' WHERE username = $1';

  const values = [];
  if (req.body.username) values.push(req.body.username);
  else values.push(req.cookies.username);

  db.query(query, values)
    .then((result) => {
      res.locals.watchList = result.rows;
      return next();
    })
    .catch((error) => {
      console.log('getContentList ERROR: ', error);
      return next(error);
    });
};

contentController.getExtendedContentList = (req, res, next) => {
  const query = 'SELECT * FROM contentLists' + ' WHERE username = $1';

  const values = [];
  if (req.body.username) values.push(req.body.username);
  else values.push(req.cookies.username);

  db.query(query, values)
    .then((result) => {
      const fetchPromises = [];
      result.rows.forEach(show => {
        const url =
          'https://api.themoviedb.org/3/' +
          show.mediatype +
          '/' +
          show.contentid +
          '?api_key=' +
          apiKey;
        console.log(url);
        const promise = fetch(url);
        fetchPromises.push(promise);
      });

      Promise.all(fetchPromises)
        .then(results => {
          return Promise.all(results.map(result => result.json()))
        }).then(data => {
          for (let i = 0; i < data.length; i++){
            data[i].watching = result.rows[i].watching;
          }
          res.locals.shows = data;
          return next();
        })
    })
    .catch((error) => {
      console.log('getExtendedContentList ERROR: ', error);
      return next(error);
    });
};




contentController.addMedia = (req, res, next) => {
  const { id, media, watching } = req.body;
  const query =
    'INSERT INTO contentLists (username, contentID, mediaType, watching, dateUpdated) VALUES ($1, $2, $3, $4, $5)';
  const values = [req.cookies.username, id, media, watching, Date.now()];

  db.query(query, values, (error, result) => {
    if (error) {
      console.log('addMedia ERROR: ', error);
      return next(error);
    } else {
      return next();
    }
  });
};

contentController.deleteMedia = (req, res, next) => {
  const { id, media } = req.body;
  const query =
    'DELETE FROM contentLists WHERE username = $1 AND contentID = $2 AND mediaType = $3';
  const values = [req.cookies.username, id, media];

  db.query(query, values, (error, result) => {
    if (error) {
      console.log('deleteMedia ERROR: ', error);
      return next(error);
    } else {
      return next();
    }
  });
};

contentController.updateMedia = (req, res, next) => {
  const { id, update, value } = req.body;
  const query = 
    'UPDATE contentLists SET (' +
    update +
    ', dateUpdated) = ($3, $4) WHERE username = $1 AND contentID = $2';
  const values = [req.cookies.username, id, value, Date.now()];

  db.query(query, values, (error, result) => {
    if (error) {
      console.log('updateMedia ERROR: ', error);
      return next(error);
    } else {
      return next();
    }
  });
};

module.exports = contentController;
