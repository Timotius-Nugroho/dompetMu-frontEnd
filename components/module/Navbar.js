import Image from "next/image";
import styles from "../../styles/Navbar.module.css";

export default function Navbar(props) {
  const userName = props.user.user_name;
  const userPhone = props.user.user_phone;
  const userImage = props.user.user_image;

  // console.log(process.env.IMG_BACKEND_URL);
  // console.log(props.user.user_image);

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
