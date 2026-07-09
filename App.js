import express from "express";
import cookieParser from "cookie-parser";

// Import all routes
import signupRouter from "./routes/signupRoute.js";
import loginRouter from "./routes/loginRoute.js";
import logoutRouter from "./routes/logoutRoute.js";
import refreshTokenRouter from "./routes/refreshTokenRoute.js";
import portfolioRouter from "./routes/portfolioRoute.js";
import homepageRouter from "./routes/homepageRoute.js";
import aboutRouter from "./routes/aboutRoute.js";
import contactRouter from "./routes/contactRoute.js";
import experienceRouter from "./routes/experienceRoute.js";
import skillsRouter from "./routes/skillsRoute.js";
import projectsRouter from "./routes/projectsRoute.js";
import blogRouter from "./routes/blogRoute.js";
import resumeRouter from "./routes/resumeRoute.js";
import sociallinksRouter from "./routes/sociallinksRoute.js";
import visitorRouter from "./routes/visitorRoute.js";
import dashboardRouter from "./routes/dashboardRoute.js";
import clientscontactedRouter from "./routes/clientscontactedRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Register all routes
app.use("/api/auth", signupRouter);
app.use("/api/auth", loginRouter);
app.use("/api/auth", logoutRouter);
app.use("/api/auth", refreshTokenRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/homepage", homepageRouter);
app.use("/api/about", aboutRouter);
app.use("/api/contact", contactRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/blog", blogRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/social", sociallinksRouter);
app.use("/api/visitors", visitorRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/clientcontact", clientscontactedRouter);

export default app;
