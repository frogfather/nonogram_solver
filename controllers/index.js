var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/api/puzzles', require('./puzzles'));

router.get('/', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  console.log("get in router")
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});



router.get('/about', function(req, res){
  res.json({data: "All about us!"});
})

module.exports = router;