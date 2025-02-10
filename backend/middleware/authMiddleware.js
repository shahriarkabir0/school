import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  console.log("Protect Middleware: " + token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.user = user;
    next();
  });
};
