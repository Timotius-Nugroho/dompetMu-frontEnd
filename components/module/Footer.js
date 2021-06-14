import styles from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg shadow"
        style={{ backgroundColor: "#6379F4" }}
      >
        <div className="container-fluid">
          <div className={`${styles.footerText} navbar-brand`} href="#">
            2021 DompetMu. All right reserved.
          </div>
          <div className="d-flex">
            <div className={styles.footerText}>+62 5637 8882 9901</div>
            <div className={styles.footerText}>contact@dompetMu.com</div>
          </div>
        </div>
      </nav>
    </>
  );
}
