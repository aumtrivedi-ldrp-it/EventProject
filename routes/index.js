/**
index.js for manage all parent route related stuff
**/

const apiRoute = require("./api/event")


module.exports = app => {
  app.use('/event', apiRoute);
};
