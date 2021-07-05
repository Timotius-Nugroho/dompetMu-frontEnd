import { useRouter } from "next/router";
import Cookie from "js-cookie";
import axios from "../../utils/axios";
import styles from "../../styles/UpperNav.module.css";

export default function Navbar(props) {
  const router = useRouter();

  const handleDashboard = () => {
    router.push("/");
  };

  const handleTransfer = () => {
    router.push("/transfer");
  };

  const handleTopUp = () => {
    router.push("/topup");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleLogout = () => {
    axios.setToken("");
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/landing");
  };

  return (
    <>
      <div className={`${styles.boxNav} row p-2 mb-2 me-1 ms-1 shadow`}>
        <div
          className="col text-center"
          style={{ cursor: "pointer" }}
          onClick={handleDashboard}
        >
          <div>
            <i className={`${styles.menu} m-2 bi bi-columns-gap`}></i>
          </div>
          <div className={styles.navText}>Dashboard</div>
        </div>
        <div
          className="col text-center"
          style={{ cursor: "pointer" }}
          onClick={handleTransfer}
        >
          <div>
            <i className={`${styles.menu} m-2 bi bi-arrow-up-circle`}></i>
          </div>
          <div className={styles.navText}>Transfer</div>
        </div>
        <div
          className="col text-center"
          style={{ cursor: "pointer" }}
          onClick={handleTopUp}
        >
          <div>
            <i className={`${styles.menu} m-2 bi bi-plus-circle`}></i>
          </div>
          <div className={styles.navText}>Top Up</div>
        </div>
        <div
          className="col text-center"
          style={{ cursor: "pointer" }}
          onClick={handleProfile}
        >
          <div>
            <i className={`${styles.menu} m-2 bi bi-person`}></i>
          </div>
          <div className={styles.navText}>Profile</div>
        </div>
        <div
          className="col text-center"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <div>
            <i className={`${styles.menu} m-2 bi bi-box-arrow-right`}></i>
          </div>
          <div className={styles.navText}>Logout</div>
        </div>
      </div>
    </>
  );
}
