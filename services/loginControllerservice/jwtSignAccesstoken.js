import jwt from "jsonwebtoken";

let signjwtAccessToken = (user) => {
  let accesstoken = jwt.sign(user, "secret123", {
    expiresIn: "15m",
  });
  return accesstoken;
};

export default signjwtAccessToken;
