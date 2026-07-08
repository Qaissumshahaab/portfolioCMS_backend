import signup from "../model/signup";
import jwt from "jsonwebtoken";
import signjwtAccessToken from "../utils/jwtSignAccesstoken";
import signjwtRefreshToken from "../utils/jwtSignRefreshtoken";

export const validaterefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const decodedrefreshtokentoVerify = jwt.verify(refreshToken, "secret12345");

    const userid = decodedrefreshtokentoVerify.userid;
    const email = decodedrefreshtokentoVerify.email;
    const user = await signup.findOne({ _id: userid });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not present" });
    }
    if (refreshToken === user.refreshToken) {
      const userobject = {
        userid: user._id,
        email: user.email,
      };
      let generateaccessToken = signjwtAccessToken(userobject);
      let generaterefreshToken = signjwtRefreshToken(userobject);
      user.refreshToken = generaterefreshToken;
      await user.save();
      // i can hash the refresh token before saving into database but do that later
      res.cookie("accessToken", generateaccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refreshToken", generaterefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
      });
    } else {
      return res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .status(401)
        .json({
          success: false,
          message: "Unauthorized ,please login first",
        });
    }
  } catch (error) {
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(401)
      .json({
        success: false,
        message: "Unauthorized , please login  first",
      });
  }
};
