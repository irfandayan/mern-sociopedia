import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// register user
export const register = async (req, res) => {
  try {
    // destructure request body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // encrypt password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, // use encrypted password
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // random number
      impressions: Math.floor(Math.random() * 10000), // random number
    });

    // save the new user
    const savedUser = await newUser.save();

    // response back with saved user data (in json form)
    res.status(201).json(savedUser);
  } catch (error) {
    // in case any error - response back with mongodb error message
    res.status(500).json({ error: error.message });
  }
};

// logging in
export const login = async (req, res) => {
  try {
    // destructure request body
    const { email, password } = req.body;

    // find the user in mongodb
    let user = await User.findOne({ email: email });

    // return in case user not found
    if (!user)
      return res.status(400).json({ message: "User does not exits. " });

    // verify user password
    const isMatch = await bcrypt.compare(password, user.password);

    // if not matched then return with error message
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials. " });

    // generate the jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // delete password so it does not get sent back to the frontend. So just want to make sure that is kept safe
    // but first convert mongoose document object into an ordinary object then delete otherwise it will not be delted
    user = user.toObject();
    delete user.password; // the delete operator removes a property from an object

    // response back with token and user
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
