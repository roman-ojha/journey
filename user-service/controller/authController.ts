import { Request, Response } from "express";
import { User } from "../config/prisma";
import { body, check } from "express-validator";
import { UserGender } from "../model/User";

class AuthController {
  validateRegistration = [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email Address"),
    check("f_name")
      .trim()
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3, max: 25 })
      .withMessage("Length needs to be greater then 2 & small then 25"),
    check("l_name")
      .trim()
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 3, max: 25 })
      .withMessage("Length needs to be greater then 2 & small then 25"),
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6, max: 25 })
      .withMessage("Length needs to be greater then 5 & small then 25"),
    check("c_password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6, max: 25 })
      .withMessage("Length needs to be greater then 5 & small then 25"),
    check("gender")
      .trim()
      .notEmpty()
      .withMessage("Gender is required")
      .custom(async (value) => {
        if (!Object.values(UserGender).includes(value)) {
          throw new Error("Given gender is not valid");
        }
      }),
    check("number").trim().notEmpty().withMessage("Number is required"),
  ];

  async registerUser(req: Request, res: Response) {
    const { email, password, c_password, gender, number, f_name, l_name } =
      req.body;

    const getUserByEmail = await User.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (getUserByEmail) {
      return res.status(406).json({
        message: "The given data was invalid",
        errors: {
          email: ["Given email already exist, Please try another one"],
        },
      });
    }

    const getUserByNumber = await User.findFirst({
      where: {
        number: {
          equals: number,
        },
      },
    });

    if (getUserByNumber) {
      return res.status(406).json({
        message: "The given data was invalid",
        errors: {
          email: ["Given Number already exist, Please try another one"],
        },
      });
    }

    if (password !== c_password) {
      return res.status(406).json({
        message: "The given data was invalid",
        errors: { c_password: ["Password & confirm password did not match"] },
      });
    }

    const newUser = await User.create({
      data: {
        email: email,
        password: password,
        gender: gender,
        f_name: f_name,
        l_name: l_name,
        number: typeof number === "string" ? parseInt(number) : number,
      },
      select: {
        id: true,
        f_name: true,
        l_name: true,
        email: true,
        number: true,
        gender: true,
      },
    });

    return res.status(201).json({
      status: true,
      data: { ...newUser, number: Number(newUser.number) },
    });
  }
}

export default AuthController;
