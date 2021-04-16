//Before we import the controller methods, let's dissect this new Express.js Router setup. Instead of creating duplicate routes for the individual HTTP methods, we can combine them!

//The following variations achieve the same goal:
// this code
//router.route('/').get(getCallbackFunction).post(postCallbackFunction);
// is this same as this
//router.get('/', getCallbackFunction);
//router.post('/' postCallbackFunction);

//Because we aren't actually writing the route functionality, this will keep the route files a lot cleaner and to the point. As an added benefit, it also abstracts the database methods from the routes, giving us the option to write unit tests with Jest.
//Now let's import the functionality and hook it up with the routes. Right underneath the const router... import at the top of the pizza-routes.js file, add the following import statement:

const router = require("express").Router();
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
} = require("../../controllers/pizza-controller");
// Set up GET all and POST at /api/pizzas
// /api/pizzas
//router.route("/").get().post();
//Instead of importing the entire object and having to do pizzaController.getAllPizza(), we can simply destructure the method names out of the imported object and use those names directly. Let's implement them into the routes, starting with /api/pizzas. Update the code for router.route('/') as follows:
router.route("/").get(getAllPizza).post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
// /api/pizzas/:id
//router.route("/:id").get().put().delete();
//Let's finish out this file and update the router.route('/:id') code as follows:
router.route("/:id").get(getPizzaById).put(updatePizza).delete(deletePizza);

module.exports = router;

//Remember, there's nothing wrong with how we've set up the routes and controllers in previous projects! This is just an alternative approach, with the benefit of easier-to-read code. The downside is having more files to import and export, which could making tracking more difficult.
//We've already set up the export for this Router instance in pizza-routes.js, so all we have to do now is get them hooked into the entire server.
//In the api directory, let's create a file called index.js. This file will import all of the API routes to prefix their endpoint names and package them up. Although we only have one set of endpoints now, we should always try to set ourselves up for easy scaling.
