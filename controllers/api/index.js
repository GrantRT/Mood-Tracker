const router = require('express').Router();
const userRoutes = require('./userRoutes');
const moodRoutes = require('./moodRoutes');

router.use('/users', userRoutes);
router.use('/moods', moodRoutes);

module.exports = router;
