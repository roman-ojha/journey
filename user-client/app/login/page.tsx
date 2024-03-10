"use client";
import authStyles from "@/styles/page/(auth)/auth.module.scss";
import styles from "@/styles/page/(auth)/login/login.module.scss";
import LoginIllustration from "@/assets/svg/login.svg";
import Image from "next/image";
import Link from "next/link";
import JourneyIcon from "@/assets/images/appIcon.png";
import AppIcon from "@/components/appIcon/AppIcon";
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

const Login = (): React.JSX.Element => {
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
    <main className={authStyles.main}>
      <section className={authStyles.auth_illustration}>
        <Image src={LoginIllustration} alt="login" height={600} width={600} />
      </section>
      <section className={authStyles.auth_form_container}>
        <Link href="/" className={authStyles.app_link}>
          <Image src={JourneyIcon} width={100} height={100} alt="journey" />
          <h5>Journey</h5>
        </Link>
        <h6>Sign in to your account</h6>
        <span className={styles.login_with_container}>
          <AppIcon
            iconName="devicon:google"
            use="iconify"
            className={styles.login_with_icon}
          />
          <p>Login with Google</p>
        </span>
        <span className={styles.login_with_container}>
          <AppIcon
            iconName="logos:facebook"
            use="iconify"
            className={styles.login_with_icon}
          />
          <p>Login with Facebook</p>
        </span>
        <div className={styles.login_form_divider}>
          <span></span>
          <p>OR</p>
          <span></span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={authStyles.auth_form}
        >
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
        <span className={authStyles.auth_form__auth_link}>
          <p>Don&apos;t have an account?</p>
          <Link href={`/register${nextPath ? "?next=" + nextPath : ""}`}>
            Register
          </Link>
        </span>
      </section>
    </main>
  );
};

export default Login;
