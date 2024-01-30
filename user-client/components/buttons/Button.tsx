import Link from "next/link";
import styles from "@/styles/components/button.module.scss";

type BaseProps = {
  width: "100%" | "content-width";
  children: React.ReactNode;
  backgroundColor: "primary" | "secondary" | "tertiary" | "transparent";
  border?: boolean;
};

type ButtonProps = {} & React.ComponentProps<"button">;
type Props = BaseProps & ButtonProps;

const Button: React.FC<Props> = ({
  children,
  backgroundColor,
  width,
  border,
  ...props
}): React.JSX.Element => {
  const className = `${styles.base_button} ${
    backgroundColor == "primary"
      ? styles.background_primary
      : backgroundColor == "secondary"
      ? styles.background_secondary
      : backgroundColor == "tertiary"
      ? styles.background_tertiary
      : styles.background_transparent
  } ${border ? styles.border : ""} ${
    width === "100%" ? styles.width_full : ""
  } ${props.className}
  `;
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
