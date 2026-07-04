import signjwtAccessToken from "../services/loginControllerservice/jwtSignAccesstoken";
import signup from "../model/signup";
import bcrypt from "bcrypt";

export const loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await signup.findOne({ email: email });
  if (user) {
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (verifyPassword) {
      const userobject = {
        userid: user._id,
        email: email,
      };
      const accessToken = signjwtAccessToken(userobject);
      res
        .status(200)
        .cookie("accessToken", accessToken)
        .json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Email or password is wrong" });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, message: "User not signed up" });
  }
};
