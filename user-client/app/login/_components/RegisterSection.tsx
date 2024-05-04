"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import authStyles from "@/styles/page/(auth)/auth.module.scss";

const RegisterSection = () => {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next");
  return (
    <span className={authStyles.auth_form__auth_link}>
      <p>Don&apos;t have an account?</p>
      <Link href={`/register${nextPath ? "?next=" + nextPath : ""}`}>
        Register
      </Link>
    </span>
  );
};

export default RegisterSection;
