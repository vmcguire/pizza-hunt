const router = require("express").Router();
//Set up a route called /api/comments/:pizzaId and use the addComment() method as a POST callback. Then set up another route for /api/comments/:pizzaId/:commentId and use the removeComment method as a DELETE callback.
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require("../../controllers/comment-controller");

router.route("/:pizzaId/:commentId").put(addReply).delete(removeComment);

router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);

//Set up a route called /api/comments/:pizzaId and use the addComment() method as a POST callback. Then set up another route for /api/comments/:pizzaId/:commentId and use the removeComment method as a DELETE callback.

// /api/comments/<pizzaId>
router.route("/:pizzaId").post(addComment);

// /api/comments/<pizzaId>/<commentId>
router.route("/:pizzaId/:commentId").delete(removeComment);

//Lastly, export the routes to /routes/api/index.js. We'll give these routes the prefix of /comments, as shown in the following code:

module.exports = router;
