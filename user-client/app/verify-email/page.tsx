"use client";
import authStyles from "@/styles/page/(auth)/auth.module.scss";
import styles from "@/styles/page/(auth)/verify-email/verify-email.module.scss";
import VerificationIllustration from "@/assets/svg/verification.svg";
import Image from "next/image";
import Link from "next/link";
import JourneyIcon from "@/assets/images/appIcon.png";
import Button from "@/components/buttons/Button";
import { useEffect, useState } from "react";

const Login = (): React.JSX.Element => {
  const [otp, setOtp] = useState({
    otp_1: "",
    otp_2: "",
    otp_3: "",
    otp_4: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elm = e.target as HTMLInputElement;
    const name = e.target.name;
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;
    setOtp({ ...otp, [name]: value });
    const nextElm = elm.nextElementSibling as HTMLInputElement;
    if (nextElm) nextElm.focus();
  };

  const handleKeyUpEvent = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const key = e.key.toLowerCase();

    if (key == "backspace" && target instanceof HTMLInputElement) {
      const prevElm = target.previousElementSibling as HTMLInputElement;
      setOtp({ ...otp, [name]: "" });
      if (prevElm) prevElm.focus();
    }
  };

  useEffect(() => {
    document
      .getElementById("otp-input-field-form")
      ?.addEventListener("keyup", handleKeyUpEvent);
    return () => {
      document
        .getElementById("otp-input-field-form")
        ?.removeEventListener("keyup", handleKeyUpEvent);
    };
  });

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
        <span className={styles.verify_email_info}>
          <p>Enter the 4 digit OTP Send to your email: </p>
          <b>razz**99@gmail.com</b>
        </span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={authStyles.auth_form}
          id="otp-input-field-form"
        >
          <div className={styles.otp_input_fields}>
            <input
              type="text"
              id="opt-1"
              name="otp_1"
              maxLength={1}
              value={otp.otp_1}
              onChange={handleOnChange}
            />
            <input
              type="text"
              id="opt-2"
              name="otp_2"
              maxLength={1}
              value={otp.otp_2}
              onChange={handleOnChange}
            />
            <input
              type="text"
              id="opt-3"
              name="otp_3"
              maxLength={1}
              value={otp.otp_3}
              onChange={handleOnChange}
            />
            <input
              type="text"
              id="opt-4"
              name="otp_4"
              maxLength={1}
              value={otp.otp_4}
              onChange={handleOnChange}
            />
          </div>
          <span className={styles.resend_otp_container}>
            <p>Haven&apos;t received email yet?</p>
            <button type="button">Resend OTP</button>
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
