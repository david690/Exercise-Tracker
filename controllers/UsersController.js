const User = require("../models/UsersModel");

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
