const User = require("../models/UsersModel");

exports.addUser = async (req, res) => {
  const newUser = new User({ username: req.body.username });

  newUser.save().then(data => {
    return res.json({username: data.username, _id: data._id});
  }).catch(error => {
    console.log("error:", error);
  });

}