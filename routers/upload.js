const express = require('express');
const router = express.Router();
const { uploadFile } = require('../common/uploader');

router.post('/', async (req, res) => {
    try {
        const file = req.files;
        const url = await uploadFile('uploader/', file[0]);
        res.json({
            url: url,
            message: "Upload file success"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        });   
    }
})

exports.router = router;