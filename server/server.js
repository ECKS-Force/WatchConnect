const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const appRouter = require('./routes/appRouter')
const authRouter = require('./routes/authRouter')

const PORT = 3000;

const app = express();

// parsing JSON bodies
app.use(express.json());
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, '../client/static')));
app.use('/build', express.static(path.join(__dirname, '../build')));

//app.use('/app', appRouter);

app.use('/auth', authRouter);

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}.`);
});