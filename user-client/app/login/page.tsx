"use client";
import styles from "@/styles/page/login/login.module.scss";
import LoginIllustration from "@/assets/svg/login.svg";
import Image from "next/image";
import Link from "next/link";
import JourneyIcon from "@/assets/images/appIcon.png";
import AppIcon from "@/components/appIcon/AppIcon";
import CheckBox from "@/components/CheckBox";
import Button from "@/components/buttons/Button";

const Login = (): React.JSX.Element => {
  return (
    <main className={styles.main}>
      <section className={styles.login_illustration}>
        <Image src={LoginIllustration} alt="login" height={600} width={600} />
      </section>
      <section className={styles.login_form_container}>
        <Link href="/" className={styles.app_link}>
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
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={styles.login_form}
        >
          <div className={styles.login_form__input_field}>
            <label
              htmlFor="email"
              className={styles.login_form__input_field__label}
            >
              <AppIcon
                iconName="ic:baseline-email"
                use="iconify"
                className={styles.login_form__input_field__icon}
              />
              <span className={styles.login_form__input_field__main}>
                <p>Email</p>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  id="email"
                  name="email"
                />
              </span>
            </label>
            <span className={styles.login_form__input_field__error}>
              <AppIcon iconName="material-symbols:error" use="iconify" />
              <p>Email is not valid</p>
            </span>
          </div>
          <div className={styles.login_form__input_field}>
            <label
              htmlFor="password"
              className={styles.login_form__input_field__label}
            >
              <AppIcon
                iconName="ph:key-fill"
                use="iconify"
                className={styles.login_form__input_field__icon}
              />
              <span className={styles.login_form__input_field__main}>
                <p>Password</p>
                <input
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                />
              </span>
            </label>
            <span className={styles.login_form__input_field__error}>
              <AppIcon iconName="material-symbols:error" use="iconify" />
              <p>Password is not valid</p>
            </span>
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
        <span className={styles.login_form__register_link}>
          <p>Don&apos;t have an account?</p>
          <Link href="/register">Register</Link>
        </span>
      </section>
    </main>
  );
};

export default Login;
