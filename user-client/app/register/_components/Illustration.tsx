import RegisterSVG from "@/assets/svg/register.svg";
import Image from "next/image";
import authStyles from "@/styles/page/(auth)/auth.module.scss";

const RegisterIllustration = () => {
  return (
    <section className={authStyles.auth_illustration}>
      <Image src={RegisterSVG} alt="register" height={600} width={600} />
    </section>
  );
};

export default RegisterIllustration;
