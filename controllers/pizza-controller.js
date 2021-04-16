const { Pizza } = require("../models");
//To create the first two methods now, update pizzaController so that it looks like the following code:
const pizzaController = {
  // get all pizzas
  //We just created a method for finding all pizza data and another for finding a specific pizza by its _id value. The first method, getAllPizza(), will serve as the callback function for the GET /api/pizzas route. It uses the Mongoose .find() method, much like the Sequelize .findAll() method.
  getAllPizza(req, res) {
    Pizza.find({})
      .populate({
        path: "comments",
        //Note that we also used the select option inside of populate(), so that we can tell Mongoose that we don't care about the __v field on comments either. The minus sign - in front of the field indicates that we don't want it to be returned. If we didn't have it, it would mean that it would return only the __v field.
        select: "-__v",
      })
      //Since we're doing that for our populated comments, let's update the query to not include the pizza's __v field either, as it just adds more noise to our returning data.
      .select("-__v")
      //Lastly, we should set up the query so that the newest pizza returns first. Mongoose has a .sort() method to help with this. After the .select() method, use .sort({ _id: -1 }) to sort in DESC order by the _id value. This gets the newest pizza because a timestamp value is hidden somewhere inside the MongoDB ObjectId.
      .sort({ _id: -1 })
      //restructure the getPizzaById() method in the same manner so that getting a single pizza also populates comments.
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //The second method, .getPizzaById(), uses the Mongoose .findOne() method to find a single pizza by its _id. Instead of accessing the entire req, we've destructured params out of it, because that's the only data we need for this request to be fulfilled. If we can't find a pizza with that _id, we can check whether the returning value is empty and send a 404 status back to alert users that it doesn't exist.
  // get one pizza by id
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .then((dbPizzaData) => {
        // If no pizza is found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //Time to create the method for handling POST /api/pizzas to add a pizza to the database. Add the following code into the pizzaController object as another method below the .getPizzaById() method, as shown in the following code:
  // createPizza
  //With this .createPizza() method, we destructure the body out of the Express.js req object because we don't need to interface with any of the other data it provides. Again, just like with Sequelize, in Mongoose we use the method .create() to create data. We send a 400 error back if something goes wrong, as we likely sent the wrong type of data for one of the fields.
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.json);
  },

  //Now let's add the method for updating a pizza when we make a request to PUT /api/pizzas/:id. We'll have to put a few more settings in place for this one, but we'll soon address what they mean. Add the following method after the .createPizza() method in the pizzaController object:
  // update pizza by id
  //With this .findOneAndUpdate() method, Mongoose finds a single document we want to update, then updates it and returns the updated document. If we don't set that third parameter, { new: true }, it will return the original document. By setting the parameter to true, we're instructing Mongoose to return the new version of the document.
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
  //Lastly, let's create the method to delete a pizza from the database when we make a request to DELETE /api/pizzas/:id. Add one last method to the pizzaController object, after the .updatePizza() method, with the following code:
  // delete pizza
  //In this example, we use the Mongoose .findOneAndDelete() method, which will find the document to be returned and also delete it from the database. Like with updating, we could alternatively use .deleteOne() or .deleteMany(), but we're using the .findOneAndDelete() method because it provides a little more data in case the client wants it.
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
  //So now that we have the five main CRUD methods for the /api/pizzas endpoint routes, let's create the routes and hook these methods up to them!
};

//To learn more, see the Mongoose documentation on queries https://mongoosejs.com/docs/queries.html

module.exports = pizzaController;
//Now that we've created the file and directory, let's work on the functionality. We'll create all of these functions as methods of the pizzaController object. Because these methods will be used as the callback functions for the Express.js routes, each will take two parameters: req and res.

//After adding the routes above this instruction follows:
//Unlike other Express.js applications we've built, this one already has a lot of the routing structure in place. We just need to create the API-specific routes.
//In the routes folder, create an api directory. After that, create a file called pizza-routes.js in the api directory.

//Now, once again, the client’s front-end code is pretty much set up for us. We just need to tie in the necessary API calls.
//Start by navigating to the front-end file, pizza-list.js, in the public/assets/js directory
