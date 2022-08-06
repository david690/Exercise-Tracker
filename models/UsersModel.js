const { model, Schema } = require("mongoose");

const UsersModel = new Schema({
	username: {
		type: String,
		required: true
	}
});

module.exports = model("User", UsersModel);