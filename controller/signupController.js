import signup from "../model/signup";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 12);

  const createsignup = await signup.create({
    username,
    email,
    hashedPassword,
  });
  await createsignup.save();
  return res
    .status(200)
    .json({ success: true, message: "You signup successfully" });
};
