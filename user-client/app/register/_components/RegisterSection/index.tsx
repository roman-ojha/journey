import authStyles from "@/styles/page/(auth)/auth.module.scss";
import Image from "next/image";
import Link from "next/link";
import JourneyIcon from "@/assets/images/appIcon.png";
import RegisterForm from "./RegisterForm";
import SignInLink from "./SignInLink";

const RegisterSection = () => {
  return (
    <section className={authStyles.auth_form_container}>
      <Link href="/" className={authStyles.app_link}>
        <Image src={JourneyIcon} width={100} height={100} alt="journey" />
        <h5>Journey</h5>
      </Link>
      <h6>Create a new account</h6>
      <RegisterForm />
      <SignInLink />
    </section>
  );
};

export default RegisterSection;
