"use client";
import styles from "@/styles/page/(auth)/register/register.module.scss";
import authStyles from "@/styles/page/(auth)/auth.module.scss";
import RegisterIllustration from "@/assets/svg/register.svg";
import Image from "next/image";
import Link from "next/link";
import JourneyIcon from "@/assets/images/appIcon.png";
import AppIcon from "@/components/appIcon/AppIcon";
import CheckBox from "@/components/CheckBox";
import Button from "@/components/buttons/Button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, UserSignUp } from "@/model/User";
import { useState } from "react";
import { FormControlLabel, RadioGroup } from "@mui/material";
import Radio from "@/components/Radio";

const Register = (): React.JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
    control,
  } = useForm<UserSignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<UserSignUp> = (data) => {
    console.log(data);
  };

  // const [gender, setGender] = useState<User["gender"] | undefined>(undefined);
  const [gender, setGender] = useState<string | undefined>(undefined);

  // console.log(errors);
  // console.log(defaultValues);

  return (
    <main className={authStyles.main}>
      <section className={authStyles.auth_form_container}>
        <Link href="/" className={authStyles.app_link}>
          <Image src={JourneyIcon} width={100} height={100} alt="journey" />
          <h5>Journey</h5>
        </Link>
        <h6>Create a new account</h6>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={authStyles.auth_form}
        >
          <div className={styles.name_input_field_container}>
            <div className={authStyles.auth_form__input_field}>
              <label
                htmlFor="first-name"
                className={authStyles.auth_form__input_field__label}
              >
                <AppIcon
                  iconName="basil:user-solid"
                  use="iconify"
                  className={authStyles.auth_form__input_field__icon}
                />
                <span className={authStyles.auth_form__input_field__main}>
                  <p>First Name</p>
                  <input
                    type="text"
                    {...register("f_name")}
                    placeholder="Enter Your First Name"
                    id="first-name"
                  />
                </span>
              </label>
              <span
                className={`${authStyles.auth_form__input_field__error} ${
                  errors.f_name
                    ? authStyles.auth_form__input_field__error__show
                    : ""
                }`}
              >
                <AppIcon iconName="material-symbols:error" use="iconify" />
                <p>{errors.f_name?.message}</p>
              </span>
            </div>
            <div className={authStyles.auth_form__input_field}>
              <label
                htmlFor="last-name"
                className={authStyles.auth_form__input_field__label}
              >
                <AppIcon
                  iconName="basil:user-solid"
                  use="iconify"
                  className={authStyles.auth_form__input_field__icon}
                />
                <span className={authStyles.auth_form__input_field__main}>
                  <p>Last Name</p>
                  <input
                    type="text"
                    placeholder="Enter Your Last Name"
                    id="last-name"
                    {...register("l_name")}
                  />
                </span>
              </label>
              <span
                className={`${authStyles.auth_form__input_field__error} ${
                  errors.l_name
                    ? authStyles.auth_form__input_field__error__show
                    : ""
                }`}
              >
                <AppIcon iconName="material-symbols:error" use="iconify" />
                <p>{errors.l_name?.message}</p>
              </span>
            </div>
          </div>
          <div className={authStyles.auth_form__input_field}>
            <label
              htmlFor="email"
              className={authStyles.auth_form__input_field__label}
            >
              <AppIcon
                iconName="ic:baseline-email"
                use="iconify"
                className={authStyles.auth_form__input_field__icon}
              />
              <span className={authStyles.auth_form__input_field__main}>
                <p>Email</p>
                <input
                  type="email"
                  placeholder="Enter Email address"
                  id="email"
                  {...register("email")}
                />
              </span>
            </label>
            <span
              className={`${authStyles.auth_form__input_field__error} ${
                errors.email
                  ? authStyles.auth_form__input_field__error__show
                  : ""
              }`}
            >
              <AppIcon iconName="material-symbols:error" use="iconify" />
              <p>{errors.email?.message}</p>
            </span>
          </div>
          <div className={authStyles.auth_form__input_field}>
            <label
              htmlFor="number"
              className={authStyles.auth_form__input_field__label}
            >
              <AppIcon
                iconName="mingcute:phone-fill"
                use="iconify"
                className={authStyles.auth_form__input_field__icon}
              />
              <span className={authStyles.auth_form__input_field__main}>
                <p>Number</p>
                <input
                  type="number"
                  placeholder="Enter Your Number"
                  id="number"
                  {...register("number", {
                    setValueAs: (value: string) => BigInt(value),
                  })}
                />
              </span>
            </label>
            <span
              className={`${authStyles.auth_form__input_field__error} ${
                errors.number
                  ? authStyles.auth_form__input_field__error__show
                  : ""
              }`}
            >
              <AppIcon iconName="material-symbols:error" use="iconify" />
              <p>{errors.number?.message}</p>
            </span>
          </div>
          <div className={authStyles.auth_form__input_field}>
            <label
              htmlFor="password"
              className={authStyles.auth_form__input_field__label}
            >
              <AppIcon
                iconName="ph:key-fill"
                use="iconify"
                className={authStyles.auth_form__input_field__icon}
              />
              <span className={authStyles.auth_form__input_field__main}>
                <p>Password</p>
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  {...register("password")}
                />
              </span>
            </label>
            <span
              className={`${authStyles.auth_form__input_field__error} ${
                errors.password
                  ? authStyles.auth_form__input_field__error__show
                  : ""
              }`}
            >
              <AppIcon iconName="material-symbols:error" use="iconify" />
              <p>{errors.password?.message}</p>
            </span>
          </div>
          <div className={authStyles.auth_form__input_field}>
            <label
              htmlFor="c-password"
              className={authStyles.auth_form__input_field__label}
            >
              <AppIcon
                iconName="ph:key-fill"
                use="iconify"
                className={authStyles.auth_form__input_field__icon}
              />
              <span className={authStyles.auth_form__input_field__main}>
                <p>Confirm Password</p>
                <input
                  type="password"
                  placeholder="Confirm password"
                  id="c-password"
                  {...register("c_password")}
                />
              </span>
            </label>
            <span
              className={`${authStyles.auth_form__input_field__error} ${
                errors.c_password
                  ? authStyles.auth_form__input_field__error__show
                  : ""
              }`}
            >
              <AppIcon iconName="material-symbols:error" use="iconify" />
              <p>{errors.c_password?.message}</p>
            </span>
          </div>
          <div className={authStyles.auth_form__input_field}>
            <label
              htmlFor="gender-male"
              className={authStyles.auth_form__input_field__label}
            >
              <AppIcon
                iconName="basil:user-solid"
                use="iconify"
                className={authStyles.auth_form__input_field__icon}
              />
              <span className={authStyles.auth_form__input_field__main}>
                <p>Gender</p>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <RadioGroup
                      className={styles.register_form_gender_container}
                      name="gender"
                      style={{ display: "flex", flexDirection: "row" }}
                      value={value ?? null}
                      onChange={onChange}
                    >
                      <FormControlLabel
                        value="MALE"
                        label="Male"
                        control={<Radio />}
                      />
                      <FormControlLabel
                        value="FEMALE"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="OTHER"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  )}
                />
              </span>
            </label>
            <span
              className={`${authStyles.auth_form__input_field__error} ${
                errors.gender
                  ? authStyles.auth_form__input_field__error__show
                  : ""
              }`}
            >
              <AppIcon iconName="material-symbols:error" use="iconify" />
              <p>{errors.gender?.message}</p>
            </span>
          </div>
          <Button
            backgroundColor="primary"
            width="100%"
            type="submit"
            className="!font-bold !text-xl !w-11/12"
          >
            Sign Up
          </Button>
        </form>
        <span className={authStyles.auth_form__auth_link}>
          <p>Have an account?</p>
          <Link href="/login">SignIn</Link>
        </span>
      </section>
      <section className={authStyles.auth_illustration}>
        <Image
          src={RegisterIllustration}
          alt="register"
          height={600}
          width={600}
        />
      </section>
    </main>
  );
};

export default Register;
