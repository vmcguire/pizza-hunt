const router = require("express").Router();
const pizzaRoutes = require("./pizza-routes");
const commentRoutes = require("./comment-routes");

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use("/pizzas", pizzaRoutes);

router.use("/comments", commentRoutes);
//All right, now restart the server. Remember that with MongoDB, we don’t need to worry about dropping the database information beforehand.

module.exports = router;

//Lastly, let's navigate to the /routes/index.js file to import the API routes and set them up.

//So, to populate comments, we can update the getAllPizzas() method in pizza-controller.js with the following code:
