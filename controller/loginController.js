import signjwtAccessToken from "../services/jwtSignAccesstoken";
import signup from "../model/signup";
import bcrypt from "bcrypt";

export const loginUser = async (req, res, next) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password both are required",
      });
    }

    const user = await signup.findOne({ email: email });
    if (user) {
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        const userobject = {
          userid: user._id,
          email: email,
        };
        const accessToken = signjwtAccessToken(userobject);
        return res
          .status(200)
          .cookie("accessToken", accessToken)
          .json({ success: true });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Email or password is wrong" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Email or password is wrong" });
    }
  } catch (error) {
    console.log("error in loginController");
    return res
      .status(400)
      .json({ success: false, message: "error occur while logging in" });
  }
};
