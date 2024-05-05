import authStyles from "@/styles/page/(auth)/auth.module.scss";
import RegisterSection from "./_components/RegisterSection";
import RegisterIllustration from "./_components/Illustration";

const Register = (): React.JSX.Element => {
  return (
    <main className={authStyles.main}>
      <RegisterSection />
      <RegisterIllustration />
    </main>
  );
};

export default Register;
