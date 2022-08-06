const { model, Schema } = require("mongoose");

const ExercisesModel = new Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  userid: {
    type: String,
    required: true
  }
});

module.exports = model("Exercise", ExercisesModel);