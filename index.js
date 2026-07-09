import app from "./App.js";
import dotenv from "dotenv";
import connectDB from "./config/mongoconfig.js";

dotenv.config({ quiet: true });

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("App is listening on port :" + port);
    });
  })

  .catch((error) => {
    console.error("Error while connecting to port" + error.message);
  });
