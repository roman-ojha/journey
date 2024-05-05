"use client";
import React, { useEffect } from "react";
import AppLink from "@/components/buttons/AppLink";
import useGetAuthUserQuery from "@/hooks/reactQuery/useGetAuthUserQuery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { eraseCookie, getCookie } from "@/lib/cookie";
import { useRouter } from "next/navigation";
import useLogoutUserQuery from "@/hooks/reactQuery/useLogoutUserQuery";
import Button from "@/components/buttons/Button";
import { AUTH_USER_COOKIE_NAME } from "@/data/constants";
import { useAppDispatch } from "@/hooks/useAppStore";
import { setAuthUser } from "@/services/store/features/authUser/authUserSlice";

const AuthActionCenter = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    data,
    isSuccess,
    isError,
    refetch: refetchUser,
    isLoading,
  } = useGetAuthUserQuery({
    retry: false,
    enabled: false,
  });
  const { refetch: refetchLogout } = useLogoutUserQuery(refetchUser);
  const handleLogout = () => {
    // eraseCookie(AUTH_USER_COOKIE_NAME);
    refetchLogout();
    // refetchUser();
  };

  useEffect(() => {
    if (getCookie(AUTH_USER_COOKIE_NAME)) {
      refetchUser();
    }
  }, [refetchUser]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthUser(data.data));
    }
  }, [isSuccess, dispatch, data?.data]);

  return (
    <>
      {isSuccess ? (
        <>
          <Button
            backgroundColor="primary"
            width="content-width"
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Avatar
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              router.push("/profile");
            }}
          >
            <AvatarImage src={data?.data?.picture} />
            <AvatarFallback className="capitalize bg-secondary w-9 h-9 text-xs text-white">
              {data?.data?.f_name.slice(0, 1)}
              {data?.data?.l_name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </>
      ) : (
        <>
          <AppLink
            backgroundColor="transparent"
            href="/login"
            width="content-width"
          >
            Login
          </AppLink>
          <AppLink
            backgroundColor="primary"
            width="content-width"
            href="/register"
          >
            Sign Up
          </AppLink>
        </>
      )}
    </>
  );
};

export default AuthActionCenter;
