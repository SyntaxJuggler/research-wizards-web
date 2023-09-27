import styles from "./Logo.module.css";
import ResarchWizardsLogo from "../../Images/ResearchWizards.png";

const Logo = () => {
  return (
    <section className={styles.Logo}>
      <img src={ResarchWizardsLogo} />
      <p>ResearchWizards</p>
    </section>
  );
};

export default Logo;
