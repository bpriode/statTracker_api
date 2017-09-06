const express       = require('express');
const Activity      = require('../models/activity')
const Stat          = require('../models/stat')
const mongoose      = require('mongoose');
const passport          = require('passport');
const BasicStrategy     = require('passport-http').BasicStrategy;
const router        = express.Router();

mongoose.connect('mongodb://localhost:27017/statTracker');


//auth to access API
router.get('/', passport.authenticate('basic', {session: false}), function(req, res) {
  res.send('Here is my Stat Tracker API')
})


// Show a list of all activities I am tracking
router.get('/activities', passport.authenticate('basic', {session: false}), function(req, res) {
  Activity.find({})
  .then(function(data){
    res.send(data)
  })
  .catch(function(err){
    res.send('No Activities Created')
  })
})


//Create a new activity for me to track.
router.post('/activities', passport.authenticate('basic', {session: false}), function(req, res) {
  Activity.create({
    activityName: req.body.activityName,
    measurementUnit: req.body.measurementUnit
  })
  .then(function(data){
    res.send(data)
  })
})


//Show information about one activity I am tracking, and give me the data I have recorded for that activity.
router.get('/activities/:id', passport.authenticate('basic', {session: false}), function(req, res) {
  Stat.find({})
  .then(function(data) {
    res.send(data)
  })
})



//Update one activity I am tracking, changing attributes such as name or type. Does not allow for changing tracked data.
router.put('/activities/:id', passport.authenticate('basic', {session: false}), function(req, res) {
  Activity.update({_id: req.params.id}, {
    activityName: req.body.activityName,
    measurementUnit: req.body.measurementUnit
  })
  .then(function(data) {
    res.send(data)
  })
})



//Delete one activity I am tracking. This should remove tracked data for that activity as well.
router.delete('/activities/:id', passport.authenticate('basic', {session: false}), function(req, res){
  Stat.deleteMany({activityId: req.params.id})
  .then(function(deleteStat) {
    Activity.deleteOne({_id: req.params.id})
    .then(function(data) {
      res.send(data)
    })
  })
})


//Add tracked data for a day. The data sent with this should include the day tracked. You can also override the data for a day already recorded.
router.post('/activities/:id/stats', passport.authenticate('basic', {session: false}), function(req, res){
  Stat.create({
    activityId: req.params.id,
    measurement: req.body.measurement
  })
  .then(function(data) {
    res.send(data)
  })
})


//Remove tracked data for a day.
router.delete('/stats/:id', passport.authenticate('basic', {session: false}), function(req, res){
  Stat.deleteOne({_id: req.params.id})
  .then(function(data) {
    res.send(data)
  })
})




// ~ ❯❯❯ curl -v -u test:test http://localhost:3000/api/auth
// *   Trying ::1...
// * TCP_NODELAY set
// * Connected to localhost (::1) port 3000 (#0)
// * Server auth using Basic with user 'test'
// > GET /api/auth HTTP/1.1
// > Host: localhost:3000
// > Authorization: Basic dGVzdDp0ZXN0
// > User-Agent: curl/7.54.0
// > Accept: */*
// >
// < HTTP/1.1 200 OK
// < X-Powered-By: Express
// < Content-Type: application/json; charset=utf-8
// < Content-Length: 16
// < ETag: W/"10-M9vS+cXnXnZqalKpdB5SbhO4uUk"
// < Date: Wed, 06 Sep 2017 15:34:13 GMT
// < Connection: keep-alive
// <
// * Connection #0 to host localhost left intact
// {"hello":"test"}%



module.exports = router
