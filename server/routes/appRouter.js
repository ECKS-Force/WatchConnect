const express = require('express');
const { getFriendsList, addFriend, deleteFriend, friendSearch } = require('../controllers/followerController.js');
const { showSearch, showInfo } = require('../controllers/apiController.js')
const { addMedia, deleteMedia, updateMedia } = require('../controllers/contentController.js')

const appRouter = express.Router();

// output: [ {publisher:<username1>}, {publisher:<username2>}, ...]
appRouter.get('/friendsList', getFriendsList, (req, res) => {
  return res.status(200).json(res.locals.friends);
});

// input: body { friend:<username> }
// output: [ {publisher:<username1>}, {publisher:<username2>}, ...]
appRouter.post('/follow', addFriend, getFriendsList, (req, res) => {
  return res.status(200).json(res.locals.friends);
});

// input: body { friend:<username> }
// output: [ {publisher:<username1>}, {publisher:<username2>}, ...]
appRouter.delete('/unfollow', deleteFriend, getFriendsList, (req, res) => {
  return res.status(200).json(res.locals.friends);
});

// output: [ {username:<username1>}, {username:<username2>}, ...]
appRouter.get('/friendSearch/:search', friendSearch, (req, res) => {
  return res.status(200).json(res.locals.search);
});

// input: params, search = <media name>
// output: [ { id: <mediaID>, name: <media name>, mediaType: <tv or movie>, imgPath: <path end>, description: <text> }, {}, ...]
appRouter.get('/showSearch/:search', showSearch, (req, res) => {
  return res.status(200).json(res.locals.search);
})

// input: params, type = <tv or movie>, id = <mediaID>
// output: { id: <mediaID>, name: <media name>, imgPath: <path end>, description: <text> }
appRouter.get('/showInfo/:type/:id', showInfo, (req, res) => {
  return res.status(200).json(res.locals.info);
})

// input: body { id:<mediaID>, media:<tv or movie>, watching:<current watching, watchlist, watched>}
appRouter.post('/addMedia', addMedia, (req, res) => {
  return res.sendStatus(200);
})

// input: body { id:<mediaID>, media:<tv or movie> }
appRouter.post('/deleteMedia', deleteMedia, (req, res) => {
  return res.sendStatus(200);
})

// input: body { id:<mediaID>, update:<watching or rating or review>, value:<new value> }
appRouter.post('/updateMedia', updateMedia, (req, res) => {
  return res.sendStatus(200);
})

module.exports = appRouter;
