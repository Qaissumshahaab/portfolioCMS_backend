import signjwtAccessToken from "../utils/jwtSignAccesstoken.js";
import signjwtRefreshToken from "../utils/jwtSignRefreshtoken.js";
import signup from "../model/signup.js";
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
          secure: true, //comment them when testing locally and uncomment them when deploying to production with https
          sameSite: "none", //comment them when testing locally and uncomment them when deploying to production on different domain
          path: "/",
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          secure: true,
          sameSite: "none",
          path: "/",
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
