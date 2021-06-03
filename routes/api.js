const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .limit(7)
    .sort({ day: 1 })

    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Put
router.put("/api/workouts/:id", ({body, params}, res) => {
  Workout.findByIdAndUpdate(params.id, { $push: { exercises: body }}, { new: true, runValidators: true })

  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

//Post
router.post("/api/workouts", ({ body }, res) => {

  // const workout = new Workout(body);

  Workout.create(body)
    // .then(({_id}) => Workout.findOneAndUpdate({}, { $push: { exercises: _id } }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
