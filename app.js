const express = require('express');
const port = process.env.PORT || 3000;

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const app = express();


const indexRouter = require('./routers/index');
const usersRout = require('./routers/userRout');
const addUpRouter = require('./routers/addUpload');


const allowedOrigins = [
    '*',
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'https://probox.lk',
    'http://probox.lk',
    'https://supbox.lk',
    'http://supbox.lk',
    'http://localhost:4200',
    'http://localhost:8080',
    'http://localhost:8100',
    'http://dapp.tradexzone.com',
    'https://dapp.tradexzone.com',
    'http://tradexzone.com',
    'https://tradexzone.com'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    }
}

app.options('*', cors(corsOptions));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/user', usersRout);
app.use('/addUp', addUpRouter);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    console.log(error.message);
    next(error);
});



app.get('/', cors(corsOptions), (req, res, next) => {
    res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
})


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


app.listen(port);