const db = require('../models/databaseModel.js');

const userController = {};

userController.addUser = (req, res, next) => {
  // add this user to the database. We want to get their user id.
  const { username, password } = req.body;

  // query for the _id on users table that matches the received name and password
  const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
  const values = [username, password];

  db.query(query, values, (error, result) => {
    if (error) {
      console.log('addUser ERROR: ', error);
      return next(error);
    }

    return next();
  });
};

userController.checkPassword = (req, res, next) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];

  db.query(query, values, (error, result) => {
    if (error) {
      console.log('addUser ERROR: ', error);
      return next(error);
    }
    if (password === result.rows[0].password) return next();
    else {
      const passwordErr = {
        log: 'The username or password is incorrect',
        status: 500,
        message: { err: 'The username or password is incorrect' },
      };
      return next(passwordErr);
    }
  });
};

module.exports = userController;
