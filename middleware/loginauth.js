import jwt from "jsonwebtoken";

export default loginauth = (req, res, next) => {
  const accessToken = req.cookie.accessToken;
  if (accessToken) {
    try {
      let decodedToken = jwt.verify(accessToken, "secret123");
      req.user = decodedToken;
      next();
    } catch (error) {
      console.log("Error occur while decoding the access token");
      return res.status(400).json({ success: false, message: error.message });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Token not present" });
  }
};
