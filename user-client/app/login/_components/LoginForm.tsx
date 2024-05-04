"use client";
import React from "react";
import CheckBox from "@/components/CheckBox";
import Button from "@/components/buttons/Button";
import { useForm } from "react-hook-form";
import { UserLogin, userLoginSchema } from "@/schema/User";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldError from "@/components/FormFieldError";
import useLoginUser from "@/hooks/reactMutation/useLoginUser";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import authStyles from "@/styles/page/(auth)/auth.module.scss";
import styles from "@/styles/page/(auth)/login/login.module.scss";
import Link from "next/link";
import AppIcon from "@/components/appIcon/AppIcon";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");

  const {
    register,
    handleSubmit,
    formState: { errors: clientValidationError },
  } = useForm<UserLogin>({
    resolver: zodResolver(userLoginSchema),
  });

  const {
    mutate: loginUser,
    error: serverError,
    isSuccess,
    isError,
  } = useLoginUser();

  const { toast } = useToast();

  const onSubmit = (data: UserLogin) => {
    loginUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      if (nextPath) router.push(nextPath);
      else router.push("/");
    }
  }, [isSuccess, router, nextPath]);

  useEffect(() => {
    if (isError) {
      // Toast
      // toast({
      //   description: serverError?.response?.data.message,
      // });
    }
  }, [isError, serverError?.response?.data.message, toast]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={authStyles.auth_form}>
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
              placeholder="Enter your email address"
              id="email"
              {...register("email")}
            />
          </span>
        </label>
        <FormFieldError
          model="User"
          field="email"
          clientValidationError={clientValidationError}
          serverValidationError={serverError}
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
              placeholder="Enter your password"
              id="password"
              {...register("password")}
            />
          </span>
        </label>
        <FormFieldError
          model="User"
          field="password"
          clientValidationError={clientValidationError}
          serverValidationError={serverError}
        />
      </div>
      <div className={styles.login_form__remember_me_and_forgot_password}>
        <span className={styles.login_form__remember_me}>
          <CheckBox
            checked={false}
            inputProps={{ "aria-label": "remember-me" }}
            name="remember-me"
            onClick={() => {}}
            id="remember-me"
          />
          <label htmlFor="remember-me">Remember me</label>
        </span>
        <Link href="/forgot-password">Forgot Password?</Link>
      </div>
      <Button
        backgroundColor="primary"
        width="100%"
        type="submit"
        className="!font-bold !text-xl !w-11/12"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
