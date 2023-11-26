import { Request, Response, NextFunction, response } from "express";
import { User } from "../config/prisma";
import { body, check } from "express-validator";
import { UserGender } from "../../models/User";
import {
  failResponse,
  successResponse,
  validationErrorResponse,
} from "../../utils/responseObject";
import { STATUS_CODES } from "../../data/constants";
import { generatePassword, issuedJWT, validPassword } from "../utils/userAuth";
import Controller from ".";

class AuthController extends Controller {
  constructor() {
    super();
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

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

  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
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
        return res.status(STATUS_CODES.VALIDATION_ERROR).json(
          validationErrorResponse({
            email: ["Given email already exist, Please try another one"],
          })
        );
      }

      const getUserByNumber = await User.findFirst({
        where: {
          number: {
            equals: number,
          },
        },
      });

      if (getUserByNumber) {
        return res.status(STATUS_CODES.VALIDATION_ERROR).json(
          validationErrorResponse({
            number: ["Given Number already exist, Please try another one"],
          })
        );
      }

      if (password !== c_password) {
        return res.status(406).json(
          validationErrorResponse({
            c_password: ["Password & confirm password did not match"],
          })
        );
      }

      const hashedPassword = generatePassword(password);
      const newUser = await this.repository.createNewUser({
        email: email,
        password: hashedPassword.hash,
        salt: hashedPassword.salt,
        gender: gender,
        f_name: f_name,
        l_name: l_name,
        number: typeof number === "string" ? parseInt(number) : number,
      });

      return res.status(STATUS_CODES.CREATED).json(
        successResponse("User Registration Successfully", {
          ...newUser,
          number: Number(newUser.number),
        })
      );
    } catch (err) {
      return next(err);
    }
  }

  loginValidation = [
    check("password").trim().notEmpty().withMessage("Password is required"),
    check("email").trim().notEmpty().withMessage("Email is required"),
  ];
  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const getUser = await this.repository.findFirstUserUsingEmail(email);

      if (!getUser) {
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json(failResponse("Given credentials doesn't exist"));
      }
      if (!validPassword(password, getUser.password, getUser.salt)) {
        return res
          .status(STATUS_CODES.VALIDATION_ERROR)
          .json(failResponse("Given credentials doesn't exist"));
      }

      const token = issuedJWT(getUser);
      res.status(STATUS_CODES.OK);
      return res.json(
        successResponse("Login Successfully", {
          token: token.token,
          expires_in: token.expiresIn,
        })
      );
    } catch (err) {
      return next(err);
    }
  }
}

export default AuthController;
