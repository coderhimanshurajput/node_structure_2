const colors = require('colors');
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
    custom: ['red', 'underline']
});

const
    express      = require('express'),
    path         = require('path'),
    mongoo       = require('mongoose'),
    cookieParser = require('cookie-parser'),
    logger       = require('morgan'),
    bodyParser   = require('body-parser'),
    compression  = require('compression'),
    session      = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    app          = express();
require ('../helper/dbConnection')();

var sessionStore = new mongoStore({
    host: '127.0.0.1',
    port: '27017',
    db: 'session',
    url: 'mongodb://localhost:27017/support_app',
    ttl: 14 * 24 * 60 * 60 // = 14 days. Default
});
const
    UUID = require('../helper/_number'),
    uuidObject = new UUID.RandamNumber();


app.use(require('method-override')());
app.use(session({
    secret : ['veryimportantsecret','notsoimportantsecret','highlyprobablysecret'],
    genid: function(req) {
        return uuidObject.generateUUID() // use UUIDs for session IDs
    },
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
        domain: 'example.com',
        // Cookie will expire in 1 hour from when it's generated
        expires: new Date( Date.now() + 60 * 60 * 1000 )
    },
    store: new mongoStore({
        url: `mongodb://localhost:27017/support_app`,
        collection: 'sessions',
        ttl: 24 * 60 * 60
    })
}))
app.use(require(path.resolve('./src/routers')));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))

// app.get, app.post, etc called before static folder
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin' , 'http://localhost:4200');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', true);
    next();
});



app.use((req, res, next) => {
    req.identifier = uuidObject.generateUUID();
    const logString = `a request has been made with the following uuid [${req.identifier}] ${req.url} ${req.headers['user-agent']} ${JSON.stringify(req.body)}`;
    // logger.log(logString, 'info');
    console.log((logString).debug)
    // next();
});

app.use((req, res, next) => {
    // logger.log('the url you are trying to reach is not hosted on our server', 'error');
    const err = new Error('Not Found');
    err.status = 404;
        res.status(404).json({ type: 'error', message: 'the url you are trying to reach is not hosted on our server' });
});


module.exports = app;
