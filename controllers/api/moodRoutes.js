const router = require('express').Router();
// Comment is the required model.
const { Mood } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
      Mood.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });