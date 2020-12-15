'use strict';
const secret = 'mysecretsshhh';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport");


// DB Config
const db = require('./config/keys').mongoURI;


var index = require('./routes/index');
var trade = require('./routes/trade');
var contact = require('./routes/contact');
var login = require('./routes/login');

//LOGIC MODULES IMPORTED HERE
var txns = require('./logic/txns.js');
var stocks = require('./logic/stocks.js');
var subs = require('./logic/subs.js');
var finnhub = require('./logic/finnhub.js');


//authentication users
const apiUsers = require("./routes/api/users");


//MAIN DATA STORAGE ARRAYS
var userBase = []
var stockBase = [
    {
        "symbol": "AXP"
    },
    {
        "symbol": "AMGN"
    },
    {
        "symbol": "AAPL"
    },
    {
        "symbol": "BA"
    },
    {
        "symbol": "CAT"
    },
    {
        "symbol": "CSCO"
    },
    {
        "symbol": "CVX"
    },
    {
        "symbol": "GS"
    },
    {
        "symbol": "HD"
    },
    {
        "symbol": "HON"
    },
    {
        "symbol": "IBM"
    },
    {
        "symbol": "INTC"
    },
    {
        "symbol": "JNJ"
    },
    {
        "symbol": "KO"
    },
    {
        "symbol": "JPM"
    },
    {
        "symbol": "MCD"
    },
    {
        "symbol": "MMM"
    },
    {
        "symbol": "MRK"
    },
    {
        "symbol": "MSFT"
    },
    {
        "symbol": "NKE"
    },
    {
        "symbol": "PG"
    },
    {
        "symbol": "TRV"
    },
    {
        "symbol": "UNH"
    },
    {
        "symbol": "CRM"
    }
];
var txnBase = [];
var subBase = [];


//first call to get seed data
syncStocks();

//finnhub loop to sync stocks in database with real market data
setInterval(syncStocks, 32000);

//finnhub sync function
function syncStocks(){
    console.log("Sync with Finnhub started.");
    for (let c = 0; c < stockBase.length; c++) {
        finnhub.update(c,stockBase);
    }
};


// Connect to MongoDB Atlas
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("Successfully connected to MongoDB Atlas"))
    .catch(err => console.log(err));


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cookie-parser
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/trade', trade);
app.use('/contact', contact);


//Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Auth Routes [PUBLIC ROUTE]
app.use('/api/users', apiUsers);

//stocks GET [PUBLIC ROUTE]
app.get('/api/stocks', (req, res) => {
    var symbol = req.query.symbol;
    var minprice = req.query.minprice;
    var maxprice = req.query.maxprice;
    var list = [];

    if (maxprice == undefined && minprice == undefined && symbol == undefined) {
        res.status(200).send(JSON.stringify(stockBase));
    }

    else if (symbol !== undefined && minprice == undefined && maxprice == undefined) {
        var index = stocks.getStockbySym(symbol, stockBase);
        if (index == -1) { res.sendStatus(404); return; }
        else {
            res.status(200).send(JSON.stringify(stockBase[index]));
        }
    }

    else if (symbol == undefined && minprice !== undefined && maxprice == undefined) {
        var temp = stocks.getStocksbyMinPrice(minprice, stockBase, list);
        if (temp != -1) {
            res.status(200).send(JSON.stringify(list));
            list.pop();
        }
        else res.sendStatus(404);
    }

    else if (symbol == undefined && minprice == undefined && maxprice !== undefined) {
        var temp = stocks.getStocksbyMaxPrice(minprice, stockBase, list);
        if (temp != -1) {
            res.status(200).send(JSON.stringify(list));
            list.pop();
        }
        else res.sendStatus(404);
    }

    else if (symbol == undefined && minprice !== undefined && maxprice !== undefined) {
        var temp;
        var status = -1;
        for (var i = 0; i < stockBase.length; i++) {
            temp = stockBase[i].current;
            if (temp >= minprice && temp <= maxprice) {
                list.push(JSON.parse(JSON.stringify(stockBase[i])));
                status = 0;
            }
        }
        if (status != -1) {
            res.status(200).send(JSON.stringify(list));
        }
        else res.sendStatus(404);
        list.splice(0, list.length);
    }

    else {
        res.sendStatus(404);
    }


});

//txns POST + GET  [PRIVATE ROUTE]
app.post('/api/txns', passport.authenticate('jwt', { session: false }), (req, res) => {
    var newTxn = new Object();
    newTxn = req.body;
    if (!newTxn.hasOwnProperty('txnID')) {
        var newID = txns.newTxn(txnBase);
        if (newID == -1) {
            res.sendStatus(404);
        }
        else {
            newTxn.txnID = newID;
            newTxn.email = req.user.email;
            //users.addTxn(newID, globUserIndex, userBase);
            res.status(201).send(JSON.stringify(newTxn));
        }
    }
    else {
        var status = txns.editTxn(newTxn, txnBase);
        if (status == 0) {
            res.status(200).send(JSON.stringify(newTxn));
        }
        else {
            res.sendStatus(404);
        }
    }
});
app.get('/api/txns', passport.authenticate('jwt', { session: false }), (req, res) => {

    //to get speicific txns
    //var ID = req.body.txnID;
    //var index = txns.getTxn(ID, txnBase);

    var uemail = req.user.email;
    var temp = [];

    let flag = 0;

    for (let i = 0; i < txnBase.length; i++) {
        if (txnBase[i].email == uemail) {
            temp.push(txnBase[i]);
            flag = 1;
        }
    }

    if (flag == 1) {
        res.status(200).send(JSON.stringify(temp));
    }
    else {
        res.sendStatus(404);
    }

});

//subs POST + GET + DELETE  [PRIVATE ROUTE]
app.post('/api/subs', passport.authenticate('jwt', { session: false }), (req, res) => {
    var newSub = new Object();
    newSub = req.body;
    if (!newSub.hasOwnProperty('subID')) {
        var newID = subs.newSub(subBase);
        if (newID == -1) {
            res.sendStatus(404);

        }
        else {
            newSub.subID = newID;
            newSub.email = req.user.email;
            //users.addSub(newID, globUserIndex, userBase);
            res.status(201).send(JSON.stringify(newSub));
        }
    }
    else {
        var status = subs.editSub(newSub, subBase);
        if (status == 0) {
            res.status(200).send(JSON.stringify(newSub));
        }
        else {
            res.sendStatus(404);
        }
    }
});
app.get('/api/subs', passport.authenticate('jwt', { session: false }), (req, res) => {

    //var ID = req.body.subID;
    //var index = subs.getSub(ID, subBase);

    var uemail = req.user.email;
    var temp = [];
    let flag = 0;

    for (let i = 0; i < subBase.length; i++) {
        if (subBase[i].email == uemail) {
            temp.push(subBase[i]);
            flag = 1;
        }
    }

    if (flag == 1) {
        res.status(200).send(JSON.stringify(temp));
    }
    else {
        res.sendStatus(404);
    }

});
app.delete('api/subs', passport.authenticate('jwt', { session: false }), (req, res) => {
    var ID = req.query.subID;
    var status = subs.deleteSub(ID, subBase);
    

    if (status !== -1) {
        //users.deleteSub(ID, globUserIndex, userBase);
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,

            error: err
        });
    });
}




// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});


