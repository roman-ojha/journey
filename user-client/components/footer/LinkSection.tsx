import Link from "next/link";
import styles from "@/styles/components/footer/link-section.module.scss";
import { HTMLAttributeAnchorTarget } from "react";

interface Props {
  title: string;
  links: {
    title: string;
    href: string;
    disable?: boolean;
    target?: HTMLAttributeAnchorTarget;
  }[];
}

const LinkSection: React.FC<Props> = ({ title, links }): React.JSX.Element => {
  return (
    <div className={styles.footer_link_section}>
      <h6>{title}</h6>
      <div className={styles.footer_link_section__links}>
        {links.map((link, index) => {
          if (link.disable) {
            return <p key={index}>{link.title}</p>;
          }
          return (
            <Link
              href={link.href}
              key={index}
              target={link.target ? link.target : ""}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LinkSection;
