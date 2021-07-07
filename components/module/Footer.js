import styles from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer style={{ backgroundColor: "#6379F4" }} className="pt-2 pb-2">
        <div className="container">
          <div className="row">
            <div className={`${styles.footerText} col-sm-4`}>
              2021 DompetMu. All right reserved.
            </div>
            <div className="col"></div>
            <div className={`${styles.footerText} col-sm-2 text-md-end`}>
              +62 5637 8882 9901
            </div>
            <div
              className={`${styles.footerText} col-sm-3 col-xl-2 text-md-end`}
            >
              contact @dompetMu.com
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
