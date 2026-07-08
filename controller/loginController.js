import signjwtAccessToken from "../utils/jwtSignAccesstoken";
import signjwtRefreshToken from "../utils/jwtSignRefreshtoken";
import signup from "../model/signup";
import bcrypt from "bcrypt";

export const loginUser = async (req, res, next) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    if (!email || !password) {
      return res.status(401).json({
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
        const refreshToken = signjwtRefreshToken(userobject);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
          success: true,
          message: "Login successful",
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Email or password is wrong" });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Email or password is wrong" });
    }
  } catch (error) {
    console.log("error in loginController");
    return res
      .status(401)
      .json({ success: false, message: "error occur while logging in" });
  }
};
