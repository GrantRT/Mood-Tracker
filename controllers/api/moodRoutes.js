const router = require('express').Router();
// Mood is the required model.
const { Mood } = require('../../models');
const withAuth = require('../../utils/auth');

// get mood data of logged in user
router.get('/', withAuth, async (req, res) => {
  try {
    const moodData = await Mood.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(moodData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get mood data of a specific user
router.get('/:id', withAuth, async (req, res) => {
  try {
    const moodData = await Mood.findAll({
      where: {
        user_id: req.params.id,
      },
    });
    res.status(200).json(moodData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Post a mood
router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    let newMood;
    const week = await Mood.findOne({
      where: {
        week: req.body.week,
        user_id: req.session.user_id,
      },
    });
    if (week) {
      console.log('found week');
      newMood = await Mood.update(
        { ...req.body.day },
        {
          where: {
            week: req.body.week,
            user_id: req.session.user_id,
          },
        }
      );
      console.log({ newMood });
    } else {
      newMood = await Mood.create({
        week: req.body.week,
        ...req.body.day,
        user_id: req.session.user_id,
      });
    }

    res.status(200).json(newMood);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
