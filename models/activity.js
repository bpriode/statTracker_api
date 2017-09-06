const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema     = mongoose.Schema

const activitySchema = new Schema({
  activityName: {type: String, required: true},
  measurementUnit: {type: String},
})


const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
