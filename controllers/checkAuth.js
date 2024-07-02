import jwt from "jsonwebtoken";

const checkAuth = (req, res) => {
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
    return res
      .status(200)
      .json({ user: { id: decodedToken.id, role: decodedToken.role } });
  });
};

export default checkAuth;
