import User from "../models/User.js";

// read
export const getUser = async (req, res) => {
  try {
    // get id from request parameter
    const { id } = req.params;

    // get the user
    const user = await User.findById(id);

    // check if user exist
    if (!user) {
      return res.status(404).json({ error: "No such user found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
export const getUserFriends = async (req, res) => {
  try {
    // get id from request parameter
    const { id } = req.params;

    // get the user
    const user = await User.findById(id);

    // check if user exist
    if (!user) {
      return res.status(404).json({ error: "No such user found" });
    }

    // get all friends and their detail
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // formate frieds so it can be sent to frontend
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );
    // send friends back to frontend
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// update
export const addRemoveFriend = async (req, res) => {
  try {
    // get user and friend id from request paramenter
    const { id: userId, friendId } = req.params;

    // check for user and friend inside database
    const user = User.findById(userId);
    const friend = User.findById(friendId);

    // check user or friend exist
    if (!user || !friend)
      return res
        .status(404)
        .json({ message: "either user or friend id is invalid." });

    // check user has that friend in friend list
    if (user.friends.includes(friendId)) {
      // remove friend
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== userId);
    } else {
      // add friend
      user.friends.push(friendId);
      friend.friends.push(userId);
    }

    // save user & friend in database
    await user.save();
    await friend.save();

    // get all friends and their detail for frontend
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // formate frieds so it can be sent to frontend
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
