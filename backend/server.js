
//set the port to 5000
const port = 5000;

//require the express package
const express = require('express')
const cors = require('cors');
// const { Router } = require('express')


//create an app using the express package
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http, {
        cors: {
                origin: '*'
        }
});

app.use(cors());

const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

const bodyParser = require('body-parser');

io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
                console.log('user disconnected');
        });
        setInterval(()=>{
                socket.emit('number', parseInt(Math.random()*10));
        }, 1000);
});


// let dbConnect = require("./dbConnect");
// dbConnect.connectMysql()

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const bookmarkRoute = require('./routes/bookmarkRoute');

app.use('/bookmarks', bookmarkRoute);

app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument)
);

// app.use('/', express.static('public'))

// app.get('/test', (req,res) => {
//     res.send('Hello World!')
// })

// //new
// app.use('/mytest', testRoute);

// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
        res.header('Content-Type', 'application/json');
        next();
    });
    

http.listen(port, () => {
        console.log(`example app listening at http://localhost:${port}`)
        console.log(`doco located at http://localhost:${port}/api-docs`)
})