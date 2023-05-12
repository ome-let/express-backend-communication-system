const express = require('express');
const router = express.Router();
const { firestore } = require('../common/firebase');

router.get('/', async (req, res) => {
    res.send("Hello world");
})

exports.router = router;