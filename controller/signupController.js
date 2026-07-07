import signup from "../model/signup";
import bcrypt from "bcrypt";

export const signupUser = async (req, res, next) => {
  try {
    const username = req.body?.username;
    const email = req.body?.email;
    const password = req.body?.password;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }
    const findexistingsignupuser = await signup.findOne({ email: email });
    if (findexistingsignupuser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const createsignup = await signup.create({
      username,
      email,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ success: true, message: "You signup successfully" });
  } catch (error) {
    console.log("error occur while signing up");
    return res.status(400).json({
      success: false,
      message: "Error signing up user",
    });
  }
};
