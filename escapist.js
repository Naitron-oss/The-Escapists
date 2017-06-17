const fetch = require('node-fetch');
const express = require('express');
const app = express();

// disable express powered by header
app.disable('x-powered-by');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

const studios = require('./datas/studios');

app.get('/api/studios', (req, res) => {
  res.json(studios);
});

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res.status(404).send('Page not found');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(app.get('port'), () => {
  console.log('Express started, press Ctrl+C to exit.');
});
