const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//Here we'll need a unique identifier instead of the default _id field that is created, so we'll add a custom replyId field. Despite the custom field name, we're still going to have it generate the same type of ObjectId() value that the _id field typically does, but we'll have to import that type of data first.
const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
    },
    writtenBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      // virtuals: true,
      getters: true,
    },
    // id: false,
  }
);

//Copying from Pizza.js and adjusting for comments

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
    },
    commentBody: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    replies: [ReplySchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

CommentSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
//We've set up a model for the comments, but we still need to define the relationship so that comments belong to a pizza.
//Navigate to Pizza.js and add a comments array field to the schema.
