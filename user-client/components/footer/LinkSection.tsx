import Link from "next/link";
import styles from "@/styles/components/footer/link-section.module.scss";

interface Props {
  title: string;
  links: {
    title: string;
    href: string;
    disable?: boolean;
  }[];
}

const LinkSection: React.FC<Props> = ({ title, links }): React.JSX.Element => {
  return (
    <div className={styles.footer_link_section}>
      <h6>{title}</h6>
      <div className={styles.footer_link_section__links}>
        {links.map((link, index) => {
          return (
            <>
              {link.disable ? (
                <p>{link.title}</p>
              ) : (
                <Link href={link.href} key={index}>
                  {link.title}
                </Link>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default LinkSection;
