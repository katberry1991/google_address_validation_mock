var env = process.env.NODE_ENV || 'development',
    port = process.env.PORT || 3000,
    express = require('express'),
    serveStatic = require('serve-static'),
    app = express();

app.use('/', serveStatic(__dirname + '/public'));
app.listen(port);
