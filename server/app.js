require("dotenv").config();
const express = require("express")
const cors = require('cors');
const authRouter = require("./routes/authRoute");
const jobRouter = require("./routes/jobRoute")
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const app = express();
const {createAdminWallet} = require('./utils/wallet')

app.use(cors());

app.use(express.json()); 


// all routes here
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/job', jobRouter);

// global wildcard handler
app.use('*', catchAsync(async (req, res, next) => { 
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404) 
    // res.status(404).json({
    //     status: 'fail',
    //     message: 'Route is not found'
    // })
}))

app.use(globalErrorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

async function setUpAdminWallet() {
  try {
      const wallet = await createAdminWallet();
      console.log("Wallets setup complete.");
      // set(process.env.COLD_WALLET, wallets.coldWallet, { protected: true });
      console.log("Wallet address:", wallet.address);
  } catch (error) {
      console.error("Error setting up wallets:", error);
  }
}

setUpAdminWallet();