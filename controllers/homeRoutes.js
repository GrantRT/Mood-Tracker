const router = require("express").Router();
const { User, Mood } = require("../../models");
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        
    }