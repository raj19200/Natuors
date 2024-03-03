const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// Creating route
const app = express();
// Middleware _ the use of middleware is simple it is use to do some process before data sending to client.
app.use(express.json());
// Creating middleware to access static file in browser.
app.use(express.static(`${__dirname}/public`));
// Define your own middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Router
app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);
// Start Server
module.exports = app;
