const db = require('../models/databaseModel');

const contentController = {};

contentController.getContentList = (req, res, next) => {
  const query = 'SELECT contentID, mediaType FROM contentLists'
    +' WHERE username = $1';
  const values = [req.cookies.username];

  db.query(query, values)
  .then((result) => {
    console.log('getContentLists db query result: ', result)
    res.locals.watchList = result.rows;
    return next();
  })
  .catch((error) => {
    console.log('getContentLists ERROR: ', error);
    return next(error);
  })
}

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
