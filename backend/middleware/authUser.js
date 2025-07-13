import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;  

    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

export default authUser;
