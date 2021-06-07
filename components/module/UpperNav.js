import { useRouter } from "next/router";
import Cookie from "js-cookie";
import styles from "../../styles/UpperNav.module.css";
import { useState } from "react";

export default function Navbar(props) {
  const router = useRouter();

  const handleDashboard = () => {};

  const handleTransfer = () => {};

  const handleTopUp = () => {};

  const handleProfile = () => {};

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/login");
  };

  return (
    <>
      <div className={`${styles.boxNav} row p-2 m-2 shadow`}>
        <div
          className="col text-center"
          style={{ cursor: "pointer" }}
          onClick={handleDashboard}
        >
          <i className="m-2 bi bi-columns-gap" style={{ fontSize: "25px" }}></i>
          <div className={styles.navText}>Dashboard</div>
        </div>
        <div
          className="col text-center"
          style={{ cursor: "pointer" }}
          onClick={handleTransfer}
        >
          <i
            className="m-2 bi bi-arrow-up-circle"
            style={{ fontSize: "25px" }}
          ></i>
          <div className={styles.navText}>Transfer</div>
        </div>
        <div
          className="col text-center"
          style={{ cursor: "pointer" }}
          onClick={handleTopUp}
        >
          <i className="m-2 bi bi-plus-circle" style={{ fontSize: "25px" }}></i>
          <div className={styles.navText}>Top Up</div>
        </div>
        <div
          className="col text-center"
          style={{ cursor: "pointer" }}
          onClick={handleProfile}
        >
          <i className="m-2 bi bi-person" style={{ fontSize: "25px" }}></i>
          <div className={styles.navText}>Profile</div>
        </div>
        <div
          className="col text-center"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <i
            className="m-2 bi bi-box-arrow-right"
            style={{ fontSize: "25px" }}
          ></i>
          <div className={styles.navText}>Logout</div>
        </div>
      </div>
    </>
  );
}
