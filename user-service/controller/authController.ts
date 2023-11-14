import { Request, Response } from "express";
import { User } from "../config/prisma";
import {
  Result,
  body,
  check,
  query,
  validationResult,
} from "express-validator";

class AuthController {
  validateRegistration = [
    body("email").isEmail().withMessage("Invalid Email Address"),
    check("f_name").trim().notEmpty().withMessage("First name is required"),
  ];

  registerUser(req: Request, res: Response) {
    const validationErr = validationResult(req);
    console.log(validationErr.array());
    const validationMsg = validationErr.formatWith((error) => error.msg);
    console.log(validationMsg.array());

    console.log(req.body);
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
