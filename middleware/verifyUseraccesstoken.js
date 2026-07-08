import jwt from "jsonwebtoken";

const verifyUseraccesstoken = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    let decodedToken = jwt.verify(accessToken, "secret123");
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ success: false });
    //401 go to frontend and take by axios intercepetor and get request to /refersh-token
    // also solve refresh race edge case as 5 simultaneos request make 1st refersh token acccessable and second mismatch
  }
};

export default verifyUseraccesstoken;
