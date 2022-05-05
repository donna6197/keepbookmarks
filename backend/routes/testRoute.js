var express = require('express');
var router = express.Router();

router.get('/test', (req,res) => {
    res.send('Hello World!')
})

router.get('/test3', (req,res) => {
    res.send('second test')
})

module.exports = router;
