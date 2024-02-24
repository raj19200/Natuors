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
// Include 3rd party middleware
// First download that module and import it in file
// if(process.env.NODE_ENV === 'development'){
// app.use(morgan('dev'));
// }

// Router
app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);
// Start Server
module.exports = app;

// Simple way but it doest prefer.  So go with another way.
// // get Request
// app.get('/api/tours', getTours);

// // Read Particular tour -  place ? after the varible if you are not sure about the params is present or not in URL.
// app.get('/api/tours/:id?', getTour);
// // post request
// app.post('/api/tours', createTour);
// //Patch Request
// app.patch('/api/tours/:id', updateTour);
// //Delete Tour
// app.delete('/api/tours/:id', deleteTour);

// Basic routings- it is not a preffered approach so go with sub routing approach.
// app.route('/api/tours').get(getTours).post(createTour);
// app.route('/api/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

// app.route('/api/users').get(getAllUser).post(createUser);
// app.route('/api/users/:id').get(getUser).patch(updateUser).delete(deleteUser);
