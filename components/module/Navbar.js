import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/Navbar.module.css";
import Cookie from "js-cookie";
import axiosApiIntances from "../../utils/axios";

export default function Navbar(props) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    axiosApiIntances
      .get(`user/by-id/${Cookie.get("user")}`)
      .then((res) => {
        // console.log(res.data.data[0]);
        setUserName(res.data.data[0].user_name);
        setUserPhone(res.data.data[0].user_phone);
        setUserImage(res.data.data[0].user_image);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  }, []);

  // console.log(process.env.IMG_BACKEND_URL);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top shadow"
        style={{ backgroundColor: "white" }}
      >
        <div className="container-fluid">
          <div className={`${styles.brand} navbar-brand`} href="#">
            DompetMu
          </div>
          <div className="d-flex">
            <div className="p-2">
              {userImage ? (
                <img
                  src={`${process.env.IMG_BACKEND_URL}${userImage}`}
                  className={styles.pp}
                />
              ) : (
                <Image
                  src="/no-img.png"
                  alt="Picture user"
                  width={50}
                  height={50}
                  className={styles.noPp}
                />
              )}
            </div>
            <div className={`p-2 ${styles.breakPoint}`}>
              <p className={styles.userName}>{userName}</p>
              <p className={styles.userPhone}>{userPhone}</p>
            </div>
            <div className="p-2 mt-2">
              <i className="bi bi-bell" style={{ fontSize: "22px" }}></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
