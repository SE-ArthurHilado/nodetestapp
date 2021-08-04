var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');

//Mongodb test connection

const uri = "mongodb://localhost:27017";
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('newTestDB');
    const records = database.collection('myCollection');
    // Query for a movie that has the title 'Back to the Future'
    const query = { x: 1 };
    const record = await records.findOne(query);
    console.log(record);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



console.log(path.join(__dirname, '/node_modules/bootstrap/dist/css'));
app.use( express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use( express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.use( express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
