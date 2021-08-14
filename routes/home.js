const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/record', (req, res) => {
    res.render('recorder');
});

router.get('/contact', (req, res) => {
    res.render('contactList');
});




module.exports = router;
