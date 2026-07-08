import jwt from "jsonwebtoken";

let signjwtRefreshToken = (user) => {
  let refreshtoken = jwt.sign(user, "secret123", {
    expiresIn: "7d",
  });
  return refreshtoken;
};

export default signjwtRefreshToken;
