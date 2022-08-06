const Exercise = require("../models/ExercisesModel");
const User = require("../models/UsersModel");

exports.addExercise = (req, res) => {
  let newExercise = null;
  if (req.body.date) {
    newExercise = new Exercise({
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date,
      userid: req.params._id
    });
  } else {
    newExercise = new Exercise({
      description: req.body.description,
      duration: req.body.duration,
      date: new Date(),
      userid: req.params._id
    });
  }

  newExercise.save().then(exerciseData => {
    User.findById(req.params._id).then(userData => {
      res.json({ _id: userData._id, username: userData.username, date: exerciseData.date.toDateString(), duration: exerciseData.duration, description: exerciseData.description });
    }).catch(error => {
      console.log("error:", error);
      res.json({ error });
    });
  }).catch(error => {
    console.log("error:", error);
    res.json({ error });
  });
}