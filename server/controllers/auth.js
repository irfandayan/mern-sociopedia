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

    // response back with saved user datat (in json type)
    res.status(201).json(savedUser);
  } catch (error) {
    // in case any error - return back mongodb error message
    res.status(500).json({ error: error.message });
  }
};
