const sequelize = require('../config/connection');
const { User, Mood } = require('../models');
const userData = require('./userData.json');
const moodData = require('./moodData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Mood.bulkCreate(moodData, {
    individualHooks: true,
    returning: true,
  });
};

seedDatabase();
