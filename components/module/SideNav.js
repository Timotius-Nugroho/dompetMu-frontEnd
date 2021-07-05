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
      <div className={`shadow ${styles.box} ps-2 pt-4`}>
        <div
          className={`d-flex p-3 ${styles.sideNav}`}
          onClick={handleDashboard}
        >
          <div>
            <i
              className="p-3 bi bi-columns-gap"
              style={{ fontSize: "25px" }}
            ></i>
          </div>
          <div>Dashboard</div>
        </div>
        <div
          className={`d-flex p-3 ${styles.sideNav}`}
          onClick={handleTransfer}
        >
          <div>
            <i
              className="p-3 bi bi-arrow-up-circle"
              style={{ fontSize: "25px" }}
            ></i>
          </div>
          <div>Transfer</div>
        </div>
        <div className={`d-flex p-3 ${styles.sideNav}`} onClick={handleTopUp}>
          <div>
            <i
              className="p-3 bi bi-plus-circle"
              style={{ fontSize: "25px" }}
            ></i>
          </div>
          <div>Top Up</div>
        </div>
        <div className={`d-flex p-3 ${styles.sideNav}`} onClick={handleProfile}>
          <div>
            <i className="p-3 bi bi-person" style={{ fontSize: "25px" }}></i>
          </div>
          <div>Profile</div>
        </div>
        <div
          className={`d-flex p-3 ${styles.sideNav} ${styles.logout}`}
          onClick={handleLogout}
        >
          <div>
            <i
              className="p-3 bi bi-box-arrow-right"
              style={{ fontSize: "25px" }}
            ></i>
          </div>
          <div>Logout</div>
        </div>
      </div>
    </>
  );
}
