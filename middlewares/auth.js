import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized. Token not available" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (decodedToken.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden. Admin access required" });
    }

    next();
  });
};

const userAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized. Token not available" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (decodedToken.role !== "user") {
      return res
        .status(403)
        .json({ message: "Forbidden. User access required" });
    }

    next();
  });
};

export { adminAuth, userAuth };
