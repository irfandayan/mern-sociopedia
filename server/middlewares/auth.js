import jwt from "jsonwebtoken";

// middleware to verify jwt token for authorization
export const verifyToken = async (req, res, next) => {
  try {
    // get token (authorization) from request header
    // const { authorization } = req.headers;

    // or - use the below recomended way to get from header - https://stackoverflow.com/questions/60855411/req-header-vs-req-headers-in-express
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // if token exists then just get token value
    if (token.startsWith("Bearer ")) {
      // authorization format is 'Bearer yourtoken' so you have to slice to get token
      token = token.slice(7, token.length).trimLeft();
    }
    // verify jwt token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // set custom user property on req object so that it can be passed to the next middleware - like user is verified
    req.user = verified;

    // run the next middleware
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
