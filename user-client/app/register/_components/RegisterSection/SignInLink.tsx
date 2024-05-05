"use client";
import authStyles from "@/styles/page/(auth)/auth.module.scss";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const SignInLink = () => {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");

  return (
    <span className={authStyles.auth_form__auth_link}>
      <p>Have an account?</p>
      <Link href={`/login${nextPath ? "?next=" + nextPath : ""}`}>SignIn</Link>
    </span>
  );
};

export default SignInLink;
