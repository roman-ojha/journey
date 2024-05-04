import authStyles from "@/styles/page/(auth)/auth.module.scss";
import styles from "@/styles/page/(auth)/login/login.module.scss";
import LoginIllustration from "@/assets/svg/login.svg";
import Image from "next/image";
import Link from "next/link";
import JourneyIcon from "@/assets/images/appIcon.png";
import AppIcon from "@/components/appIcon/AppIcon";
import LoginForm from "./_components/LoginForm";
import RegisterSection from "./_components/RegisterSection";

const Login = (): React.JSX.Element => {
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
        <LoginForm />
        <RegisterSection />
      </section>
    </main>
  );
};

export default Login;
