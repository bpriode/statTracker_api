const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema     = mongoose.Schema

const statSchema = new Schema({
  activityId: {type: String},
  measurement: {type: Number},
  createdAt: {type: Date, default: Date.now}

})


const Stat = mongoose.model('Stat', statSchema);

module.exports = Stat;
