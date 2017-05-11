var express = require('express');
var router = express.Router();
var sprintf = require("sprintf-js").sprintf;
var levelup = require('level');

var db = levelup('./mydb');

router.get('/', function(req, res, next) {
    res.render('manage');
});

router.post('/add_image_url', function(req, res, next) {
    var imagesHTML = '';
    var image_urls = [];
    var url = encodeURIComponent(req.body.url);
    db.get('image_urls', function (err, value) {
        if (!(err && err.notFound)) {
            var urls = value.split(',');
            for (var i in urls) {
                image_urls.push(urls[i]);
            }
        }
        image_urls.push(url);
        db.put('image_urls', image_urls);
        for (var i in image_urls) {
            imagesHTML += sprintf('<img src="%s">', decodeURIComponent(image_urls[i]));
        }
        res.send(imagesHTML);
    });
});

module.exports = router;
