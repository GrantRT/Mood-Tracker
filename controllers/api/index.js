const router = require('express').Router();
const userRoutes = require('./userRoutes');
const moodRoutes = require('./moodRoutes');
// const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/moods', moodRoutes);
// router.use("/dashboard", dashboardRoutes);

module.exports = router;
