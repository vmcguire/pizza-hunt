//const router = require('express').Router();
//const htmlRoutes = require('./html/html-routes');
//router.use('/', htmlRoutes);
//router.use((req, res) => {
//res.status(404).send('<h1>😝 404 Error!</h1>');
//});
//module.exports = router;/
//Update the /routes/index.js file as follows:

const router = require("express").Router();
// Import all of the API routes from /api/index.js (no need for index.js though since it's implied)
const apiRoutes = require("./api");
const htmlRoutes = require("./html/html-routes");

// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;
//Fantastic, we've set up all the API endpoints now! Because this file is already imported and used in server.js, we don't even have to update that file.
//Like always, before we implement the functionality to the front-end code, we should test it in Insomnia Core first. Let's do that next!
//Let's start up the server with npm start and open Insomnia Core to test the newly created routes. Because we have no data yet, let's start with the POST route.

//After we run the tests POST, GET ALL, GET ID, PUT, DELETE:
//Let's turn our attention to the form on the front-end page located at localhost:3001/add-pizza. More specifically, we'll open the JavaScript file that powers it.
//Open the file /public/assets/js/add-pizza.js and take a few minutes to study what's happening here. It seems that all of the functionality for handling the form submission is already in place. For example, there's functionality to dynamically handle the addition of custom pizza toppings so that users don't feel hindered by the hardcoded list. There's also functionality to collect all of the form's data and validate it on submission. It seems that the people at Pizza Hunt know how to code a bit!
