const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/UsersController");
const ExercisesController = require("../controllers/ExercisesController");

router.get("/", UsersController.getUsers);

router.post("/", UsersController.addUser);

router.post("/:_id/exercises", ExercisesController.addExercise);

module.exports = router;