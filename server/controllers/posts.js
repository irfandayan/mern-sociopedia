import Post from "../models/Post.js";
import User from "../models/User.js";

// create
// create post
export const createPost = async (req, res) => {
  try {
    // destructure the request body
    const { userId, description, picturePath } = req.body;
    // check for user in database
    const user = await User.findById(userId);

    // create new post
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });
    console.log("🚀 ~ file: posts.js:25 ~ createPost ~ newPost", newPost);

    // save new post to database
    await newPost.save();

    // grab all the posts so to be retured to the frontend, so the frontend has the list of update posts
    const posts = await Post.find();

    // send back all the posts to frontend
    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// read
// get all feed posts
export const getFeedPosts = async (req, res) => {
  try {
    // grab all the posts
    const posts = await Post.find();

    // send back all the posts to frontend
    res.status(200).json(posts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// get user posts
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    // grab all the posts
    const posts = await Post.find({ userId });

    // send back all the posts to frontend
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update
// like post
export const likePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postId);

    // check if post is liked or not - if user id exist that means the post is liked by that particular user
    const isLiked = post.likes.get(userId); // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get

    if (isLiked) {
      post.likes.delete(userId); // delete if liked
    } else {
      post.likes.set(userId, true); // otherwise set to liked
    }

    const isLiked2 = post.likes.get(userId); // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get

    // update the post and return the updated post
    // ref: https://mongoosejs.com/docs/api.html#model_Model-findByIdAndUpdate
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );

    // return updated post to frontend
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
