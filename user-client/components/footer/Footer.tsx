import Logo from "../Logo";
import styles from "@/styles/components/footer/footer.module.scss";
import AvailableAppSection from "./AvailableAppSection";
import LinkSection from "./LinkSection";
import CopyRightAndSocialLinks from "./CopyRightAndSocialLinks";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.divider}></div>
      <section className={styles.main_footer_section}>
        <div className={styles.main_footer_section__left}>
          <Logo />
          <div className={styles.available_on_container}>
            <h6>Available On</h6>
            <AvailableAppSection title="User App" />
            <AvailableAppSection title="Merchant App" />
          </div>
        </div>
        <section className={styles.main_footer_section__right}>
          <LinkSection
            title="Feature"
            links={[
              {
                title: "Search Vehicle",
                href: "/search-vehicle",
                disable: true,
              },
              { title: "Explore Vehicle", href: "/explore" },
              { title: "Profile", href: "/profile", disable: true },
              { title: "Be Merchant", href: "/be-merchant" },
            ]}
          />
          <LinkSection
            title="Privacy-First"
            links={[
              {
                title: "Security at Journey",
                href: "/security-at-journey",
                disable: true,
              },
              { title: "Data Security", href: "/data-security", disable: true },
              { title: "Cookie Policy", href: "/cookie-policy", disable: true },
              {
                title: "Our Privacy Promise",
                href: "/our-privacy-promise",
                disable: true,
              },
              {
                title: "Data and Privacy",
                href: "/data-and-privacy",
                disable: true,
              },
            ]}
          />
          <LinkSection
            title="About"
            links={[
              {
                title: "About Us",
                href: "/about-us",
              },
              { title: "Contact Us", href: "/contact-us" },
              { title: "api-docs", href: "/api-docs", disable: true },
              {
                title: "Jobs",
                href: "/jobs",
                disable: true,
              },
              {
                title: "Changelog",
                href: "https://github.com/roman-ojha/journey",
                target: "_blank",
              },
              {
                title: "Source code",
                href: "https://github.com/roman-ojha/journey",
                target: "_blank",
              },
              {
                title: "Blog",
                href: "/blog",
                disable: true,
              },
            ]}
          />
        </section>
      </section>
      <div className={styles.divider}></div>
      <CopyRightAndSocialLinks />
    </footer>
  );
};

export default Footer;
