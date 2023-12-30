import Link from "next/link";
import styles from "@/styles/components/button.module.scss";

interface Props {
  children: React.ReactNode;
  backgroundColor: "primary" | "secondary" | "tertiary" | "transparent";
  width: "100%" | "content-width";
  href?: string; // href
}

const Button: React.FC<Props> = ({
  children,
  backgroundColor,
  width,
  href,
}): React.JSX.Element => {
  const className = `${styles.base_button} 
  ${backgroundColor == "primary" && styles.background_primary}
  ${backgroundColor == "secondary" && styles.background_secondary}
  ${backgroundColor == "tertiary" && styles.background_tertiary}
  ${backgroundColor == "transparent" && styles.background_transparent}
  ${width === "100%" && styles.width_full}
  `;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return <button className={className}>{children}</button>;
};

export default Button;
