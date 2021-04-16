const { Schema, model } = require("mongoose");
//So for the most part, this feels a lot like Sequelize. We essentially create a schema, using the Schema constructor we imported from Mongoose, and define the fields with specific data types. We don't have to define the fields, as MongoDB will allow the data anyway, but for for clarity and usability, we should regulate what the data will look like.

const PizzaSchema = new Schema({
  //See how we don't have to use special imported data types for the type definitions? Using MongoDB and Mongoose, we simply instruct the schema that this data will adhere to the built-in JavaScript data types, including strings, Booleans, numbers, and so on.
  pizzaName: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    // For the timestamp field, createdAt, we set a default value to the JavaScript Date.now function. If no value is provided in this field when the user creates new data, the Date.now function will be executed and will provide a timestamp. This way we don't have to create the timestamp elsewhere and send that data.
    default: Date.now,
  },
  size: {
    type: String,
    default: "Large",
  },
  //Notice the empty brackets [] in the toppings field. This indicates an array as the data type. You could also specify Array in place of the brackets.
  toppings: [],
});

//Now we need to actually create the model to get the prebuilt methods that Mongoose provides. Let's add the following code to create the model and export it at the bottom of Pizza.js:
// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;

//Again, like you did with Sequelize, you'll create a file in the models directory that will package up all of the models. Even though currently you have just one, you should set yourself up for future additions.
