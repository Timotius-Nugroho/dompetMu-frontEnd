import { useRouter } from "next/router";
import Cookie from "js-cookie";
import axios from "../../utils/axios";
import styles from "../../styles/SideNav.module.css";

export default function Navbar() {
  const router = useRouter();

  const handleDashboard = () => {
    router.push("/");
  };

  const handleTransfer = () => {
    router.push("/transfer");
  };

  const handleTopUp = () => {};

  const handleProfile = () => {};

  const handleLogout = () => {
    axios.setToken("");
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/login");
  };

  return (
    <>
      <div className={`shadow ${styles.box} ps-2 pt-4`}>
        <div className={`p-3 ${styles.sideNav}`} onClick={handleDashboard}>
          <i className="m-2 bi bi-columns-gap" style={{ fontSize: "25px" }}></i>
          <span className="m-2">Dashboard</span>
        </div>
        <div className={`p-3 ${styles.sideNav}`} onClick={handleTransfer}>
          <i
            className="m-2 bi bi-arrow-up-circle"
            style={{ fontSize: "25px" }}
          ></i>
          <span className="m-2">Transfer</span>
        </div>
        <div className={`p-3 ${styles.sideNav}`} onClick={handleTopUp}>
          <i className="m-2 bi bi-plus-circle" style={{ fontSize: "25px" }}></i>
          <span className="m-2">Top Up</span>
        </div>
        <div className={`p-3 ${styles.sideNav}`} onClick={handleProfile}>
          <i className="m-2 bi bi-person" style={{ fontSize: "25px" }}></i>
          <span className="m-2">Profile</span>
        </div>
        <div
          className={`p-3 ${styles.sideNav} ${styles.selectedNav} ${styles.logout}`}
          onClick={handleLogout}
        >
          <i
            className="m-2 bi bi-box-arrow-right"
            style={{ fontSize: "25px" }}
          ></i>
          <span className="m-2">Logout</span>
        </div>
      </div>
    </>
  );
}
