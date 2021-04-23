const { Schema, model } = require("mongoose");
//So for the most part, this feels a lot like Sequelize. We essentially create a schema, using the Schema constructor we imported from Mongoose, and define the fields with specific data types. We don't have to define the fields, as MongoDB will allow the data anyway, but for for clarity and usability, we should regulate what the data will look like.

const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
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
      //To use a getter in Mongoose, we just need to add the key get to the field we are looking to use it with in the schema. Just like a virtual, the getter will transform the data before it gets to the controller(s).
      get: (createdAtVal) => dateFormat(createdAtVal),
      //With this get option in place, every time we retrieve a pizza, the value in the createdAt field will be formatted by the dateFormat() function and used instead of the default timestamp value. This way, we can use the timestamp value for storage, but use a prettier version of it for display.
      //make sure you've imported it at the top of the file
    },
    size: {
      type: String,
      default: "Large",
    },
    //Notice the empty brackets [] in the toppings field. This indicates an array as the data type. You could also specify Array in place of the brackets.
    toppings: [],
    //This added after Comment.js file creation
    //The type of String is just a placeholder. We'll need to update it to refer to the Comment type that we've created.
    //Specifically, we need to tell Mongoose to expect an ObjectId and to tell it that its data comes from the Comment model. We'll do this by updating the comments field of the model, as shown in the following example code:
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        //The ref property is especially important because it tells the Pizza model which documents to search to find the right comments.
        //Because we only care about comment count in respect to pizzas, we'll add the virtual to models/Pizza.js.
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      //Now again, we'll need to tell the Mongoose model that it should use any getter function we've specified
      getters: true,
    },
    id: false,
    //We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
    //Lastly, import the Comment.js model into models/index.js to package up both models, as shown in the following example code:
  }
);
//Added after updating comments field above
// get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

//Now we need to actually create the model to get the prebuilt methods that Mongoose provides. Let's add the following code to create the model and export it at the bottom of Pizza.js:
// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export the Pizza model
module.exports = Pizza;

//Again, like you did with Sequelize, you'll create a file in the models directory that will package up all of the models. Even though currently you have just one, you should set yourself up for future additions.
