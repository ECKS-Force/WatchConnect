const db = require('../models/databaseModel.js');

const userController = {};

userController.addUser = (req, res, next) => {
  const { username, password } = req.body;

  const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
  const values = [username, password];

  db.query(query, values, (error, result) => {
    if (error) {
      if (error.routine === '_bt_check_unique') {
        const usernameErr = {
          log: 'The username already exists',
          message: { err: 'The username already exists' },
        };
        return next(usernameErr);
      } else {
        console.log('addUser ERROR: ', error);
        return next(error);
      }
    }
    res.locals.username = username;
    return next();
  });
};

userController.checkPassword = (req, res, next) => {
  const { username, password } = req.body;

  const query = 'SELECT password FROM users WHERE username = $1';
  const values = [username];

  db.query(query, values, (error, result) => {
    if (error) {
      console.log('checkPassword ERROR: ', error);
      return next(error);
    }
    if (!result.rows[0]) {
      const usernameErr = {
        log: 'The username or password is incorrect',
        message: { err: 'The username or password is incorrect' },
      };
      return next(usernameErr);
    }
    if (password === result.rows[0].password) {
      res.locals.username = username;
      return next();
    } else {
      const passwordErr = {
        log: 'The username or password is incorrect',
        message: { err: 'The username or password is incorrect' },
      };
      return next(passwordErr);
    }
  });
};

// userController.findUserID = (req, res, next) => {
//   const { username } = req.body;

//   const query = 'SELECT _id FROM users WHERE username = $1';
//   const values = [username];

//   db.query(query, values, (error, result) => {
//     if (error) {
//       console.log('findUserID ERROR: ', error);
//       return next(error);
//     } else {
//       res.locals._id = result.rows[0]._id;
//       return next();
//     }
//   });
// };

module.exports = userController;
