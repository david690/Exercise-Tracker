const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/UsersController");

router.get("/", UsersController.getUsers);

router.post("/", UsersController.addUser);

router.post("/:_id/exercises", UsersController.addExercise);

router.get("/:_id/logs", UsersController.getExerciseLogs);

module.exports = router;