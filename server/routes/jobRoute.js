const {createJob, markJobAsComplete, getAllJobsOfCompany} = require('../controller/jobController');
const { authentication } = require('../controller/authController')

const router = require('express').Router();


router.route('/createJob')
    .post(authentication, createJob);


router.route('/completeJob')
    .post(authentication, markJobAsComplete)

router.route('/getAllJobsOfCompany')
    .post(authentication, getAllJobsOfCompany)
     

module.exports = router;