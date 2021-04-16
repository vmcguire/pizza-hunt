const { Schema, model } = require("mongoose");
//Copying from Pizza.js and adjusting for comments

const CommentSchema = new Schema({
  writtenBy: {
    type: String,
  },
  commentBody: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
//We've set up a model for the comments, but we still need to define the relationship so that comments belong to a pizza.
//Navigate to Pizza.js and add a comments array field to the schema.
