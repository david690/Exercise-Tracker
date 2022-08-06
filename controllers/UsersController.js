const User = require("../models/UsersModel");
const Exercise = require("../models/ExercisesModel");

exports.getUsers = (req, res) => {
  User.find().then(data => {
    let result = [];

    for (let value in data) {
      result.push({ username: data[value].username, _id: data[value]._id });
    }
    res.json(result);
  }).catch(error => {
    console.log("error:", error);
    res.json({ error });
  });
}

exports.addUser = (req, res) => {
  const newUser = new User({ username: req.body.username });

  newUser.save().then(data => {
    res.json({ username: data.username, _id: data._id });
  }).catch(error => {
    console.log("error:", error);
    res.json({ error });
  });
}

exports.addExercise = (req, res) => {
  let newExercise = null;
  if (req.body.date) {
    newExercise = new Exercise({
      description: req.body.description,
      duration: req.body.duration,
      date: new Date(req.body.date.replaceAll("-", "/")),
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

exports.getExerciseLogs = (req, res) => {
  if (req.query.from || req.query.to) {
    User.findById(req.params._id).then(userData => {
      Exercise.find({ userid: req.params._id, date: { $gte: new Date(req.query.from.replaceAll("-", "/")), $lte: new Date(req.query.to.replaceAll("-", "/")) } }, {}, { limit: req.query.limit ? req.query.limit : null }).then(exerciseData => {
        let results = [];

        for (let value in exerciseData) {
          results.push({ description: exerciseData[value].description, duration: exerciseData[value].duration, date: exerciseData[value].date.toDateString() });
        }
        res.json({ _id: userData._id, username: userData.username, count: exerciseData.length, log: results });
      }).catch(error => {
        console.log("error:", error);
        res.json({ error });
      });

    }).catch(error => {
      console.log("error:", error);
      res.json({ error });
    });
  } else {
    User.findById(req.params._id).then(userData => {
      Exercise.find({ userid: req.params._id }, {}, { limit: req.query.limit ? req.query.limit : null }).then(exerciseData => {
        let results = [];

        for (let value in exerciseData) {
          results.push({ description: exerciseData[value].description, duration: exerciseData[value].duration, date: exerciseData[value].date.toDateString() });
        }
        res.json({ _id: userData._id, username: userData.username, count: exerciseData.length, log: results });
      }).catch(error => {
        console.log("error:", error);
        res.json({ error });
      });

    }).catch(error => {
      console.log("error:", error);
      res.json({ error });
    });
  }
}