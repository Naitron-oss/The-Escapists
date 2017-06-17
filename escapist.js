const fetch = require('node-fetch');
const express = require('express');
const app = express();

// disable express powered by header
app.disable('x-powered-by');

app.set('port', process.env.PORT || 3000);

const studios = require('./datas/studios');

app.get('/', (req, res) => {
  res.json(studios);
});

app.listen(app.get('port'), () => {
  console.log('Express started, press Ctrl+C to exit.');
});
