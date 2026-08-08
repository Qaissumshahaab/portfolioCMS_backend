import "dotenv/config"; // must be the first import, otherwise app load first and then dotenv will load and the env variables will not be available when app loaded so functionailty broken.
import app from "../App.js";
import connectDB from "../config/mongoconfig.js";

await connectDB();

export default app;
