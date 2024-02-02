import User, { UserLogin, UserSignUp } from "@/model/User";
import authStyles from "@/styles/page/(auth)/auth.module.scss";
import AppIcon from "@/components/appIcon/AppIcon";
import { APIValidationErrorResponse } from "@/services/api/routes";
import { FieldErrors } from "react-hook-form";
import { AxiosError } from "axios";

type UserFieldPropsType = {
  model: "User";
  field: keyof User;
  clientValidationError: FieldErrors<User>;
};

type PropsType = {
  serverValidationError: AxiosError<unknown, any> | null;
} & UserFieldPropsType;

const FormFieldError: React.FC<PropsType> = ({
  field,
  clientValidationError,
  serverValidationError,
}) => {
  if (serverValidationError?.response?.status === 422) {
    const responseError = (
      serverValidationError?.response?.data as APIValidationErrorResponse
    ).errors;

    return (
      <span
        className={`${authStyles.auth_form__input_field__error} ${
          responseError[field]
            ? authStyles.auth_form__input_field__error__show
            : ""
        }`}
      >
        <AppIcon iconName="material-symbols:error" use="iconify" />
        <p>{responseError[field] && responseError[field][0]}</p>
      </span>
    );
  }
  return (
    <span
      className={`${authStyles.auth_form__input_field__error} ${
        clientValidationError[field]
          ? authStyles.auth_form__input_field__error__show
          : ""
      }`}
    >
      <AppIcon iconName="material-symbols:error" use="iconify" />
      <p>{clientValidationError[field]?.message}</p>
    </span>
  );
};

export default FormFieldError;
