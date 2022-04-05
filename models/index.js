const User = require('./User');
const Mood = require('./Mood');

User.hasOne(Mood, {
  foreignKey: 'user_id',
});

Mood.belongsTo(User, {
  onDelete: 'CASCADE',
  foreignKey: 'user_id',
});

module.exports = { User, Mood };
