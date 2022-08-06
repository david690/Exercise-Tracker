const User = require("../models/UsersModel");

exports.getUsers = async (req, res) => {
  User.find().then(data => {
    res.json({ data });
  }).catch(error => {
    console.log("error:", error);
    res.json({ error });
  });
}

exports.addUser = async (req, res) => {
  const newUser = new User({ username: req.body.username });

  newUser.save().then(data => {
    res.json({ username: data.username, _id: data._id });
  }).catch(error => {
    console.log("error:", error);
    res.json({ error });
  });

}