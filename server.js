const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const clientDir = __dirname + '/dist/App';
app.use(express.static(clientDir));

const port = process.env.PORT || 4200;

// app.use(express.static(__dirname + '/dist/App'));

app.get('/*', (req, res) => {
  res.format({
    html: function(){
        res.sendFile(path.join(clientDir, 'index.html'));
    },
    json: function(){
        next();
    }
});
  // res.sendFile(path.join(__dirname))
});

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));