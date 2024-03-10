const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
// Uncaught Exception occurs due to any error in the syncronous code
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED CAUGHT 🔥. SHUTTING DOWN.....');
  server.close(() => {
    process.exit(1);
  });
});

const DB = process.env.DATABASE_URI.replace('<PASSWORD>', process.env.PASSWORD);
mongoose
  .connect(DB)
  .then(() => console.log('Database connected successfully....'));

const app = require('./app');
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// Unhandled Rejection occurs due to any error in the asyncronous code
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECCTION🔥 SHUTTING DOWN.....');
  server.close(() => {
    process.exit(1);
  });
});
