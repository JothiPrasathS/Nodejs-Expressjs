const exp = require('constants');
const express = require('express');
const app = express ();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');
const {logger} = require('./middleware/logEvents.js')
const errorHandler = require('./middleware/errorHandler.js')
const PORT = process.env.PORT || 3500;

// custom Middleware  (3) (looger in logEvents.js)
app.use(logger);
// Third party middleware (4)
// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// Middleware -url | -json (use before we use) (1)
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// Built-in Middlewaare to make asscess to all files - (css) (2)
app.use('/', express.static(path.join(__dirname,'./public')));
// use middleware to all app.get files (7)
app.use('/', require('./routes/root.js'));
//  Subdir middleware open further files (6)
//  Subdir middleware open further files api (8)
app.use('/employees', require('./routes/api/employees.js'));

/* 
// Open basic specific file
app.get('^/$|/index(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,'views','index.html'));
});

// Open specific file
app.get('/new-page(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,'views','new-page.html'));
});

// Redirect if call old file
app.get('/old-page(.html)?',(req,res) => {
    res.redirect(301,'new-page.html');
});

// Route option within same function
app.get('/hello(.html)?', (req, res, next) => {
    console.log('hello.html is trying to open');
    next()
}, (req, res) => {
    res.send('Hi hello EVeryone');
});

// Route multiple "Middleware"
const one = (req, res, next) => {
    console.log('one');
    next()
}
const two = (req, res, next) => {
    console.log('two');
    next()
}
const three = (req, res) => {
    console.log('three');
    res.send('Finished');
}

app.get('/chain(.html)?', [one, two, three]);

*/

// Type any file name after '/' error page display
/*
 app.get('/*',(req,res) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});
*/
// Alternative to "get" use "all"
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if(req.accepts('json')) {
        res.json({"error" : "404 Not found"});
    }
    else {
        res.type('txt').send("404 Not found");
    }
});

// err middleware (5)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));