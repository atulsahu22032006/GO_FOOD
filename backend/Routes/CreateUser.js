import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post(
      "/createuser",
      [
            body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
            body("email", "Please enter a valid email").isEmail(),
            body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
            body("location", "Location is required").notEmpty(),
      ],
      async (req, res) => {
      try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        success: false,
                        errors: errors.array(),
                  });
            }

            const { name, location, email, password } = req.body;

            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(password, salt);

            await User.create({
                  name,
                  location,
                  email,
                  password: secPassword,
            });

            res.json({ success: true });
      } catch (error) {
            console.error(error);

            if (error.code === 11000) {
                  return res.status(400).json({
                        success: false,
                        error: "A user with this email already exists",
                  });
            }

            res.status(500).json({
                  success: false,
                  error: "Server error while creating user",
            });
      }
      }
);

router.post(
      "/loginuser",
      [
            body("email", "Please enter a valid email").isEmail(),
            body("password", "Password cannot be blank").exists(),
      ],
      async (req, res) => {
            try {
                  const errors = validationResult(req);

                  if (!errors.isEmpty()) {
                        return res.status(400).json({
                              success: false,
                              errors: errors.array(),
                        });
                  }

                  const { email, password } = req.body;
                  const userData = await User.findOne({ email });

                  if (!userData) {
                        return res.status(400).json({
                              success: false,
                              error: "Invalid email or password",
                        });
                  }

                  const pwdCompare = await bcrypt.compare(password, userData.password);
                  if (!pwdCompare) {
                        return res.status(400).json({
                              success: false,
                              error: "Invalid email or password",
                        });
                  }

                  const data = {
                        user: {
                              id: userData.id
                        }
                  };

                  const authToken = jwt.sign(data, process.env.JWT_SECRET || "GoFoodSecureSecretKey123!");
                  res.json({
                        success: true,
                        authToken,
                        user: {
                              name: userData.name,
                              email: userData.email,
                        },
                  });
            } catch (error) {
                  console.error(error);
                  res.status(500).json({
                        success: false,
                        error: "Server error while logging in",
                  });
            }
      }
);
export default router;
