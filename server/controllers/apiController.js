const fetch = require('node-fetch');
const apiKey = require('./apiKey');

const apiController = {};

apiController.showSearch = (req, res, next) => {
  const query = req.params.search.replace(/ /g, '%20').replace(/'/g, '%27');
  const url =
    'https://api.themoviedb.org/3/search/multi?api_key=' +
    apiKey +
    '&language=en-US&query=' +
    query +
    '&page=1&include_adult=false';
  res.locals.search = [];
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      json.results.forEach((ele) => {
        let media;
        if (ele.media_type === 'tv') media = 'name';
        else media = 'title';
        res.locals.search.push({
          id: ele.id,
          name: ele[media],
          mediaType: ele.media_type,
          imgPath: ele.poster_path,
          description: ele.overview,
        });
      });
    })
    .then(() => next())
    .catch((error) => next(error));
};

apiController.showInfo = (req, res, next) => {
  const url =
    'https://api.themoviedb.org/3/' +
    req.params.type +
    '/' +
    req.params.id +
    '?api_key=' +
    apiKey;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (req.params.type === 'tv') media = 'name';
      else media = 'title';
      res.locals.info = {
        id: json.id,
        name: json[media],
        imgPath: json.poster_path,
        description: json.overview,
      };
    })
    .then(() => next())
    .catch((error) => next(error));
};

module.exports = apiController;
