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
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import User, { signUpSchema } from "@/model/User";
import { useState } from "react";

const Register = (): React.JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: User) => {
    console.log(data);
  };

  const [gender, setGender] = useState<User["gender"] | undefined>(undefined);

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
                    // name="first_name"
                    {...register("f_name")}
                    placeholder="Enter Your First Name"
                    id="first-name"
                  />
                </span>
              </label>
              <span className={authStyles.auth_form__input_field__error}>
                <AppIcon iconName="material-symbols:error" use="iconify" />
                <p>Invalid First Name</p>
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
                    // name="last_name"
                    {...register("l_name")}
                  />
                </span>
              </label>
              <span className={authStyles.auth_form__input_field__error}>
                <AppIcon iconName="material-symbols:error" use="iconify" />
                <p>Invalid Last Name</p>
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
                  // name="email"
                  {...register("email")}
                />
              </span>
            </label>
            <span className={authStyles.auth_form__input_field__error}>
              <AppIcon iconName="material-symbols:error" use="iconify" />
              <p>Email is not valid</p>
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
                  // name="number"
                  {...register("number")}
                />
              </span>
            </label>
            <span className={authStyles.auth_form__input_field__error}>
              <AppIcon iconName="material-symbols:error" use="iconify" />
              <p>Number is not valid</p>
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
                  // name="password"
                  {...register("password")}
                />
              </span>
            </label>
            <span className={authStyles.auth_form__input_field__error}>
              <AppIcon iconName="material-symbols:error" use="iconify" />
              <p>Password is not valid</p>
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
                  // name="c_password"
                  {...register("c_password")}
                />
              </span>
            </label>
            <span className={authStyles.auth_form__input_field__error}>
              <AppIcon iconName="material-symbols:error" use="iconify" />
              <p>Confirm password doesn&apos;t match</p>
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
                <span className={styles.register_form_gender_container}>
                  {/* Note add Radio */}
                  <span className={styles.single_gender}>
                    <CheckBox
                      checked={gender === "MALE"}
                      inputProps={{ "aria-label": "gender-male" }}
                      name="gender"
                      value="male"
                      onClick={() =>
                        gender === "MALE"
                          ? setGender(undefined)
                          : setGender("MALE")
                      }
                      id="gender-male"
                    />
                    <label htmlFor="gender-male">Male</label>
                  </span>
                  <span className={styles.single_gender}>
                    <CheckBox
                      checked={gender === "FEMALE"}
                      inputProps={{ "aria-label": "gender-female" }}
                      name="gender"
                      value="female"
                      onClick={() =>
                        gender === "FEMALE"
                          ? setGender(undefined)
                          : setGender("FEMALE")
                      }
                      id="gender-female"
                    />
                    <label htmlFor="gender-female">Female</label>
                  </span>
                  <span className={styles.single_gender}>
                    <CheckBox
                      checked={gender == "OTHER"}
                      inputProps={{ "aria-label": "gender-other" }}
                      name="gender"
                      value="other"
                      onClick={() =>
                        gender === "OTHER"
                          ? setGender(undefined)
                          : setGender("OTHER")
                      }
                      id="gender-other"
                    />
                    <label htmlFor="gender-other">Other</label>
                  </span>
                </span>
              </span>
            </label>
            <span className={authStyles.auth_form__input_field__error}>
              <AppIcon iconName="material-symbols:error" use="iconify" />
              <p>Confirm password doesn&apos;t match</p>
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
