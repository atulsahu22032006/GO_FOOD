import jwt from "jsonwebtoken";

const fetchData = (req, res, next) => {
      const token = req.header("auth-token");

      if (!token) {
            return res.status(401).json({
                  success: false,
                  error: "Access denied. Please log in.",
            });
      }

      try {
            const verified = jwt.verify(
                  token,
                  process.env.JWT_SECRET || "GoFoodSecureSecretKey123!"
            );
            req.user = verified.user;
            next();
      } catch (error) {
            res.status(401).json({
                  success: false,
                  error: "Invalid or expired token.",
            });
      }
};

export default fetchData;
