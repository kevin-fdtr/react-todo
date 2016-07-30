var express = require('express');

//Create our app
var app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, function () {
    console.log('express server is up on port 3000');
});
