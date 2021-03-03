const db = require('../models/databaseModel.js');

const followerController = {};

followerController.getFriendsList = (req, res, next) => {
  const query = 'SELECT publisher FROM followers WHERE subscriber = $1';
  const values = [req.cookies.username];

  db.query(query, values, (error, result) => {
    if (error) {
      console.log('getFriendsList ERROR: ', error);
      return next(error);
    } else {
      res.locals.friends = result.rows;
      return next();
    }
  });
};

// followerController.checkFriend = (req, res, next) => {
//   const query =
//     'SELECT * FROM followers WHERE subscriber = $1 AND WHERE publisher = $2';
//   const values = [req.cookies.username, req.body.friend];

//   db.query(query, values, (error, result) => {
//     if (error) {
//       console.log('searchFriend ERROR: ', error);
//       return next(error);
//     } else if (!result.rows[0]) {
//       return next();
//     } else {
//       const friendErr = {
//         log: 'You are already following this user!',
//         message: { err: 'You are already following this user!' },
//       };
//       return next(friendErr);
//     }
//   });
// };

followerController.addFriend = (req, res, next) => {
  const query = 'INSERT INTO followers (subscriber, publisher) VALUES ($1, $2)';
  const values = [req.cookies.username, req.body.friend];

  db.query(query, values, (error, result) => {
    if (error) {
      console.log('addFriend ERROR: ', error);
      return next(error);
    } else {
      return next();
    }
  });
};

followerController.deleteFriend = (req, res, next) => {
  const query = 'DELETE FROM followers WHERE subscriber = $1 AND publisher = $2';
  const values = [req.cookies.username, req.body.friend];

  db.query(query, values, (error, result) => {
    if (error) {
      console.log('deleteFriend ERROR: ', error);
      return next(error);
    } else {
      return next();
    }
  });
};

followerController.friendSearch = (req, res, next) => {
  const query = 'SELECT username FROM users WHERE username LIKE $1';
  const values = [req.params.search + '%'];

  db.query(query, values, (error, result) => {
    if (error) {
      console.log('friendSearch ERROR: ', error);
      return next(error);
    } else {
      res.locals.search = result.rows;
      return next();
    }
  });
};

module.exports = followerController;
