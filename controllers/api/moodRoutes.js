const router = require('express').Router();
// Mood is the required model.
const { Mood } = require('../../models');
const withAuth = require('../../utils/auth');

// get mood data of logged in user
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all posts and JOIN with user data and comments
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

// Post a mood
router.post('/', withAuth, async (req, res) => {
  try {
    const newMood = await Mood.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMood);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
