const express = require('express');
const router = express.Router();
const path = require('path');

// Open basic specific file - use roter middleware
router.get('^/$|/index(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'));
});

/* // Open specific file- use roter middleware
router.get('/new-page(.html)?',(req,res) => {
    res.sendFile(path.join(__dirname,'..','views','new-page.html'));
});

// Redirect if call old file- use roter middleware
router.get('/old-page(.html)?',(req,res) => {
    res.redirect(301,'new-page.html');
}); */

module.exports = router;