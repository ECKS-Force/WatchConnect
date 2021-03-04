const db = require('../models/databaseModel');

const contentController = {};

contentController.getContentList = (req, res, next) => {
  const query = 'SELECT contentID, mediaType FROM contentList'
    +' WHERE username = $1';
  const values = [req.body.username];

  db.query(query, values)
  .then((result) => {
    console.log('getContentList db query result: ', result)
    res.locals.watchList = result.rows;
    return next();
  })
  .catch((error) => {
    console.log('getContentList ERROR: ', error);
    return next(error);
  })
}



module.exports = contentController;