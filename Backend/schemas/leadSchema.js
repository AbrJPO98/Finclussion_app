const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  moment = require("moment");

const leadSchema = new Schema({
  userId: String,
  name: String,
  lastname: String,
  secondLastname: String,
  email: { type: String, required: true, index: { unique: true } },
  phone: String,
  updatedAT: {
    type: Date,
    default: function () {
      return moment();
    },
  },
  createdAt: {
    type: Date,
    default: function () {
      return moment();
    },
  },
  isClient: { type: Boolean, default: false },
});

module.exports = leadSchema;
