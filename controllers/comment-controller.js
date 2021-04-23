//just as we've done in the pizza-controller, import the models we'll need. In this case, we need both Comment and Pizza. Now create a commentController object. Then, inside it, create two methods for adding and removing comments.
const { Comment, Pizza } = require("../models");

//We need to know exactly which pizza we’re working with.

const commentController = {
  // add comment to pizza
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        //Now that we've got an _id, we can use this to add the comment to a pizza.
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $push: { comments: _id } },
          //Note here that we're using the $push method to add the comment's _id to the specific pizza we want to update. The $push method works just the same way that it works in JavaScript—it adds data to an array. All of the MongoDB-based functions like $push start with a dollar sign ($), making it easier to look at functionality and know what is built-in to MongoDB and what is a custom noun the developer is using.
          { new: true }
          //We're also returning the pizza Promise here so that we can do something with the results of the Mongoose operation. Again, because we passed the option of new: true, we're receiving back the updated pizza (the pizza with the new comment included).
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  //Now, for the removeComment() method, remember that not only do we need to delete the comment, but we also need to remove it from the pizza it’s associated with.
  //First we'll delete the comment, then we'll use its _id to remove it from the pizza.
  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true }
    )
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  // remove reply
  removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.json(err));
  },
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then((deletedComment) => {
        if (!deletedComment) {
          return res.status(404).json({ message: "No comment with this id!" });
        }
        return Pizza.findOneAndUpdate(
          { _id: params.pizzaId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },
  //The first method used here, .findOneAndDelete(), works a lot like .findOneAndUpdate(), as it deletes the document while also returning its data. We then take that data and use it to identify and remove it from the associated pizza using the Mongo $pull operation. Lastly, we return the updated pizza data, now without the _id of the comment in the comments array, and return it to the user.
};
//Just as you've done for the pizza-routes, you now need to set up the comment-routes.

module.exports = commentController;
