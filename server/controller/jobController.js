const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const job  = require('../db/models/job');

const createJob = catchAsync(async (req, res) => {
    const body = req.body;
  
    // Create a job entry in the database
    const newJob = await job.create({
      jobName: body.jobName,
      jobDescription: body.jobDescription,
      jobStartDate: body.jobStartDate,
      jobEndDate: body.jobEndDate,
      employeesId: body.employeesId,
      employerId: body.employerId,
      isJobCompleted: body.isJobCompleted
    });

    if (!newJob) {
        return next(new AppError('Failed to create the job', 400));
    }

  
    // Send a response back to the client
    res.status(201).json({
      status: 'success',
      data: {
        job: newJob
      }
    });
});
  
module.exports = createJob;

