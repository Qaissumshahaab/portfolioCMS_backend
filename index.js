import "dotenv/config"; // must be the first import, otherwise app load first and then dotenv will load and the env variables will not be available when app loaded so functionailty broken.
import app from "./App.js";
import connectDB from "./config/mongoconfig.js";

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => console.log("App is listening on port :" + port));
  })
  .catch((error) => {
    console.error("Error while connecting to port" + error.message);
  });
