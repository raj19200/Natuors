const express = require('express');
const helmet = require('helmet');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const rateLimit = require('express-rate-limit');
// Creating route
const app = express();
// Middleware _ the use of middleware is use to do some process before data sending to client.

// Global Middleware

// Set security HTTP headers
app.use(helmet());

// Rate limiter -it is use to limit the user to send request in sprcific time frame.
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
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

// Unhandled Roter - if user specify something else than the actual route then we show this msg to them.

app.all('*', (req, res, next) => {
  next(new AppError(`Could't handle ${req.originalUrl} route`, 404));
});

// Global Error handling middleware
app.use(globalErrorHandler);
// Start Server
module.exports = app;
