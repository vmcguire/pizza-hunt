const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

//Then, towards the bottom of server.js right before the app.listen() method, add the following code:
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pizza-hunt", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Use this to log mongo queries being executed!
mongoose.set("debug", true);
//And that's all there is to it! In the preceding code, mongoose.connect() tells Mongoose which database we want to connect to. If the environment variable MONGODB_URI exists, like on Heroku when we deploy later, it will use that. Otherwise, it will short-circuit to the local MongoDB server's database at mongodb://localhost/pizza-hunt. The second argument in the example is a set of configuration options Mongoose asks for more information about.
//To learn more about these configuration options, see the https://mongoosejs.com/docs/connections.html#options
//But wait, did we create a database called pizza-hunt? What happens if Mongoose connects to a database that isn't there? No worries—MongoDB will find and connect to the database if it exists or create the database if it doesn't.
//And with that, we've completed the first model! Now let's create the functionality to work with the pizza data.
//Think back to how you created servers in previous applications. We've used both of the following approaches:
//Set it up so that the routes directory holds not only the routes but also the functionality for those endpoints to perform.
//Tightly follow MVC patterns and hold both the routes and functionality in a controllers directory.
//Both of the preceding server structures are perfectly acceptable, and you may encounter both as you work with other developers. But how about a structure that separates routes and functionality completely? For this project, you’ll create the functionality in controllers and the endpoints in routes. You’ll end up with more files but much cleaner code.
//Let's start with a controller file to handle the Pizza model updates. First, create a directory called controllers at the root of the application, then a file called pizza-controller.js in that directory.
