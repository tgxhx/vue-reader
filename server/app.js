/**
 * Created by tgxhx on 2017/7/331112212.
 */
const path = require('path');
const express = require('express');
const app = express();
const appConfig = require('../config/app.config');
const serverConfig = require('../config/server.config');

const isDev = process.env.NODE_ENV === 'development';

function init(app) {
  app.disable('x-powered-by');

  const views = path.join(__dirname, '..', appConfig.outputPath);
  app.set('view engine', 'ejs');
  app.set('views', views);

  app.use(express.static(views));

  app.get('/*', (req, res, next) => {
    if (/.(js|css)$/.test(req.url)) {
      res.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    next();
  });

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/test', function(req, res) {
    res.send('index11');
  });

  app.get('/api/book', require('./router/book'));

  app.get('/api/booklist', require('./router/booklist'));

  app.get('/api/titles', require('./router/booktitles'));

  app.get('/api/type', require('./router/type'));

  const port = process.env.PORT || serverConfig.port;

  app.listen(port, () => {
    console.log(`server 1 running at port ${port}`);
  });
}

init(app);

module.exports = isDev ? init : {};
