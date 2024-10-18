import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existsUser = await User.findOne({ email });

    if (existsUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists with this email try to login",
      });
    }
    

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User({
      name: name.toLowerCase(),
      email: email,
      password: hashPassword,
    });

    await newUser.save();
    res.json({ success: true, message: "user register successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: "Error in register user",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.json({
        success: false,
        message: "user does not exists with this email",
      });
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
      return res.json({
        success: false,
        message: "Wrong Password please enter valid password",
      });
    }

    const token = jwt.sign(
      { id: user._id, data: user },
      process.env.JWT_KEY_FOR_ACCESS_TOKEN
    );

    const userData = await User.findById(user._id).select("-password");
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(userData);
  } catch (error) {
    res.status(400).json({ success: false, message: "Error in login" });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.status(200).json({ message: "Logout user successfully" });
  } catch (error) {
    res.json({ status: false, message: "error while logout the user" });
  }
};

export { register, login, logout };
