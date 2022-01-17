const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  moment = require("moment");
 
const objectiveSchema = new Schema({
  /*objectId: String,
  userId: String,
  name: String,
  description: String,
  type: String,
  cost:String,
  moneySaved:String,
  moneyPerMonth:String,
  updatedAt: {
    type: Date,
    default: function () {
      return moment();
    }
  },
  createdAt: {
    type: Date,
    default: function () {
      return moment();
    },
  }*/

  userId: String,
  objectiveId:String,
  name: String,
  description:String,
  type: String,
  progress:Number,
  metaData: [],
  updatedAT: {
    type: Date,
    default: function () {
      return moment();
    },
  },
  updatedBy: String,
  createdAt: {
    type: Date,
    default: function () {
      return moment();
    },
  },
  createdBy: String,
});

module.exports = { objectiveSchema };