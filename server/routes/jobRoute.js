const createJob = require('../controller/jobController');
const { authentication } = require('../controller/authController')

const router = require('express').Router();


router.route('/createJob')
    .post(authentication, createJob);

     

module.exports = router;