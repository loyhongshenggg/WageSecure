const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const job  = require('../db/models/job');
const user = require('../db/models/user');
const { getWalletAddressFromSeed, sendXRP, getWalletBalance, sendXRPGroup } = require("../utils/wallet");
const { daysBetweenDates } = require("../utils/date");


// 1. Checks if employer has enough XRP to deploy job
// 2. Deploy the job
// 3. Return transaction
const createJob = catchAsync(async (req, res, next) => {
  const body = req.body;

  const days = daysBetweenDates(body.jobStartDate, body.jobEndDate);
  const totalXRP = parseFloat((days * body.hoursPerDay * body.ratePerHour * body.employeesId.length).toFixed(2));


  const employer = await user.findByPk(body.employerId, {
    attributes: ['walletSeed']
  });

  // handles XRP transfer from company to admin wallet
  const companyWalletSeed = employer.walletSeed;
  const adminWalletSeed = "sEdVjHZN4oQ1LTJSxCjTGbpq4Puu3Z3";

  if ((await getWalletBalance(employer.walletSeed)) < totalXRP) {
    return next(new AppError('Employer does not have enough XRP', 500));
  }

  try {
      await sendXRP(companyWalletSeed, adminWalletSeed, totalXRP);
  } catch (error) {
      return next(new AppError('Failed to transfer XRP', 500));
  }

  const newJob = await job.create({
    jobName: body.jobName,
    jobDescription: body.jobDescription,
    jobStartDate: body.jobStartDate,
    jobEndDate: body.jobEndDate,
    employeesId: body.employeesId,
    employerId: body.employerId,
    recruiterId: body.recruiterId || null,
    ratePerHour: body.ratePerHour,
    hoursPerDay: body.hoursPerDay,
    recruiterCommission: body.recruiterCommission,
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

// SENDS XRP OVER TO THE EMPLOYEES
const markJobAsComplete = catchAsync(async (req, res, next) => {
  const { jobId } = req.body; 

  // Find the job by its ID
  const existingJob = await job.findByPk(jobId);

  if (!existingJob) {
    return next(new AppError('Job not found', 404)); 
  }

  if (existingJob.isJobCompleted) {
    return next(new AppError('Job has already been completed', 400)); 
  }

  // Handles XRP transfer from company to admin wallet
  const adminWalletSeed = "sEdVjHZN4oQ1LTJSxCjTGbpq4Puu3Z3";

  // Fetch the users by their IDs
  const employeesToPay = await user.findAll({
    where: {
      id: existingJob.employeesId
    },
    attributes: ['walletSeed'] // Only fetch the walletSeed field
  });
  // Extract the walletSeed field from the users
  const walletSeedsArray = employeesToPay.map(user => user.walletSeed);

  const recruiterToPay = await user.findByPk(existingJob.recruiterId, {
    attributes: ['walletSeed'] // Only fetch the walletSeed field
  });

  // Calculate totalXRP
  const days = daysBetweenDates(existingJob.jobStartDate, existingJob.jobEndDate);
  const totalXRP = days * existingJob.hoursPerDay * existingJob.ratePerHour * existingJob.employeesId.length;

  try {
    if (recruiterToPay) {
      const recruiterWalletSeed = recruiterToPay.walletSeed; // Get the recruiter walletSeed
      const recruiterCommissionEarned = totalXRP * existingJob.recruiterCommission;
      const xrpPerWallet = parseFloat(((totalXRP - recruiterCommissionEarned) / existingJob.employeesId.length).toFixed(2));

      // Execute sendXRP for recruiter
      await sendXRP(adminWalletSeed, recruiterWalletSeed, recruiterCommissionEarned);

      // Execute sendXRP for each employee walletSeed in parallel (parallel does not work) synchronous
      await sendXRPGroup(adminWalletSeed, walletSeedsArray, xrpPerWallet);
    } else {
      const xrpPerWallet = parseFloat((totalXRP / existingJob.employeesId.length).toFixed(2));

      // Execute sendXRP for each employee walletSeed in parallel (parallel does not work)
      await sendXRPGroup(adminWalletSeed, walletSeedsArray, xrpPerWallet);
    }
  } catch (error) {
    return next(new AppError('Failed to transfer XRP', 500));
  }

  // Once transaction done, mark the job as completed
  existingJob.isJobCompleted = true;
  await existingJob.save();

  res.status(200).json({
    status: 'success',
    message: 'Job marked as completed',
    data: {
      job: existingJob,
    },
  });
});

const getAllJobsOfCompany = catchAsync(async (req, res, next) => {
  const body = req.body;
  
  const allJobs = await job.findAll({
    where: {
      employerId: body.id
    },
  });

  // Send a response back to the client
  res.status(201).json({
    status: 'success',
    data: {
      job: allJobs
    }
  });
});
  
module.exports = {createJob, markJobAsComplete, getAllJobsOfCompany};

