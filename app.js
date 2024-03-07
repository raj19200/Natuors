const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
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

// Unhandled Roter - if user specify something else than the actual route then we show this msg to them.

app.all('*', (req, res, next) => {
  next(new AppError(`Could't handle ${req.originalUrl} route`, 404));
});

// Global Error handling middleware
app.use(globalErrorHandler);
// Start Server
module.exports = app;
