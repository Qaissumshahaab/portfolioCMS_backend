import signup from "../model/signup";

export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await signup.findOne({ refreshToken });
      //in future if i am hashing the refreshToken then i cannot use refershToken to find user instead i will need to verify refershtoken by jwt to get userid and find by ({_id:userid}).

      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    return res
      .clearCookie("accessToken") // if cookie is not clearing then use options field that you put during creation of cookie like http:true,samesite:strict etc
      .clearCookie("refreshToken")
      .status(200)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(500)
      .json({
        success: false,
        message: "Error occurred while logging out",
      });
  }
};
