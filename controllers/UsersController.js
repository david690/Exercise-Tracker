const uuid = require("uuid");

let usersArray = [];

exports.addUser = async (req, res) => {

  usersArray.push({ "username": req.body.username, "_id": uuid.v4() });
  res.send({ "username": req.body.username, "_id": uuid.v4() });
}