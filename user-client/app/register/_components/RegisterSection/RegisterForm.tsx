"use client";
import styles from "@/styles/page/(auth)/register/register.module.scss";
import authStyles from "@/styles/page/(auth)/auth.module.scss";
import AppIcon from "@/components/appIcon/AppIcon";
import Button from "@/components/buttons/Button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import User, { signUpSchema, UserSignUp } from "@/schema/User";
import { FormControlLabel, RadioGroup } from "@mui/material";
import Radio from "@/components/Radio";
import useRegisterUser from "@/hooks/reactMutation/userRegisterUser";
import { APIValidationErrorResponse } from "@/services/api/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import FormFieldError from "@/components/FormFieldError";

const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");

  const {
    register,
    handleSubmit,
    formState: { errors: validationError },
    control,
  } = useForm<UserSignUp>({
    // resolver: zodResolver(signUpSchema),
  });

  const {
    mutate: registerUser,
    error,
    status,
    isSuccess,
    data,
  } = useRegisterUser();

  const onSubmit: SubmitHandler<UserSignUp> = (data) => {
    registerUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(`/login${nextPath ? "?next=" + nextPath : ""}`);
    }
  }, [isSuccess, nextPath, router]);

  const renderError = (field: keyof UserSignUp) => {
    if (error?.response?.status === 422) {
      const responseError = (
        error?.response?.data as APIValidationErrorResponse
      ).errors;

      return (
        <span
          className={`${authStyles.auth_form__input_field__error} ${responseError[field]
              ? authStyles.auth_form__input_field__error__show
              : ""
            }`}
        >
          <AppIcon iconName="material-symbols:error" use="iconify" />
          <p>{responseError[field] && responseError[field][0]}</p>
        </span>
      );
    }
    return (
      <span
        className={`${authStyles.auth_form__input_field__error} ${validationError[field]
            ? authStyles.auth_form__input_field__error__show
            : ""
          }`}
      >
        <AppIcon iconName="material-symbols:error" use="iconify" />
        <p>{validationError[field]?.message}</p>
      </span>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={authStyles.auth_form}>
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
          <FormFieldError
            model="User"
            field="f_name"
            clientValidationError={validationError}
            serverValidationError={error}
          />
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
          <FormFieldError
            model="User"
            field="l_name"
            clientValidationError={validationError}
            serverValidationError={error}
          />
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
        <FormFieldError
          model="User"
          field="email"
          clientValidationError={validationError}
          serverValidationError={error}
        />
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
                setValueAs: (value: string) => parseInt(value),
              })}
            />
          </span>
        </label>
        <FormFieldError
          model="User"
          field="number"
          clientValidationError={validationError}
          serverValidationError={error}
        />
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
        <FormFieldError
          model="User"
          field="password"
          clientValidationError={validationError}
          serverValidationError={error}
        />
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
        <FormFieldError
          model="User"
          field="c_password"
          clientValidationError={validationError}
          serverValidationError={error}
        />
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
        <FormFieldError
          model="User"
          field="gender"
          clientValidationError={validationError}
          serverValidationError={error}
        />
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
  );
};

export default RegisterForm;
