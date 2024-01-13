"use client";
import authStyles from "@/styles/page/(auth)/auth.module.scss";
import styles from "@/styles/page/(auth)/verify-email/verify-email.module.scss";
import VerificationIllustration from "@/assets/svg/verification.svg";
import Image from "next/image";
import Link from "next/link";
import JourneyIcon from "@/assets/images/appIcon.png";
import AppIcon from "@/components/appIcon/AppIcon";
import CheckBox from "@/components/CheckBox";
import Button from "@/components/buttons/Button";

const Login = (): React.JSX.Element => {
  return (
    <main className={authStyles.main}>
      <section className={authStyles.auth_illustration}>
        <Image
          src={VerificationIllustration}
          alt="login"
          height={600}
          width={600}
        />
      </section>
      <section className={authStyles.auth_form_container}>
        <Link href="/" className={authStyles.app_link}>
          <Image src={JourneyIcon} width={100} height={100} alt="journey" />
          <h5>Journey</h5>
        </Link>
        <h6>Verify you email address</h6>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={authStyles.auth_form}
        >
          <div className={styles.otp_input_fields}>
            <input type="text" id="opt-1" name="otp_1" maxLength={1} />
            <input type="text" id="opt-2" name="otp_2" maxLength={1} />
            <input type="text" id="opt-3" name="otp_3" maxLength={1} />
            <input type="text" id="opt-4" name="otp_4" maxLength={1} />
          </div>
          <span className={styles.resend_otp_container}>
            <p>Don&apos;t have an account?</p>
            <Link href="/register">Register</Link>
          </span>
          <Button
            backgroundColor="primary"
            width="100%"
            type="submit"
            className="!font-bold !text-xl !w-11/12"
          >
            Verify Email
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Login;
