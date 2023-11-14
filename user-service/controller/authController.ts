import { Request, Response } from "express";
import { User } from "../config/prisma";
import {
  Result,
  body,
  check,
  query,
  validationResult,
  matchedData,
} from "express-validator";

class AuthController {
  validateRegistration = [
    body("email").isEmail().withMessage("Invalid Email Address"),
    check("email").isLength({ min: 3, max: 25 }).withMessage("3 to 25"),
    check("f_name")
      .trim()
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3, max: 25 }),
    check("l_name").trim().notEmpty().withMessage("Last name is required"),
  ];

  registerUser(req: Request, res: Response) {
    // console.log(req.body);
    const { email, password, gender, number, f_name, l_name } = req.body;
    if (!email || !password || !gender || !number || !f_name || !l_name) {
      return res
        .status(406)
        .json({ status: false, msg: "Please provide all credentials" });
    }
    return res.status(201).json({
      status: true,
      data: { id: "1", name: "Roman Ojha", email: "roman@gmail.com" },
    });
  }
}

export default AuthController;
