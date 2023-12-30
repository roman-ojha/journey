import Link from "next/link";
import styles from "@/styles/components/button.module.scss";

interface Props {
  children: React.ReactNode;
  backgroundColor: "primary" | "secondary" | "tertiary" | "transparent";
  width: "100%" | "content-width";
  href?: string; // href
  border?: boolean;
  type?: "submit" | "button";
}

const Button: React.FC<Props> = ({
  children,
  backgroundColor,
  width,
  href,
  border,
  type,
}): React.JSX.Element => {
  const className = `${styles.base_button} 
  ${
    backgroundColor == "primary"
      ? styles.background_primary
      : backgroundColor == "secondary"
      ? styles.background_secondary
      : backgroundColor == "tertiary"
      ? styles.background_tertiary
      : styles.background_transparent
  }
  ${border ? styles.border : ""}
  ${width === "100%" ? styles.width_full : ""}
  `;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;
