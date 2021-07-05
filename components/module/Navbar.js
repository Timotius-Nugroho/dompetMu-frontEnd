import Image from "next/image";
import styles from "../../styles/Navbar.module.css";
import { useRouter } from "next/router";

export default function Navbar(props) {
  const router = useRouter();
  const userName = props.user.user_name;
  const userPhone = props.user.user_phone;
  const userImage = props.user.user_image;

  const handleProfile = () => {
    router.push("/profile");
  };

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
            <div className="p-2" onClick={() => handleProfile()}>
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
            <div className={`p-2 ${styles.breakPoint} text-center`}>
              <p className={styles.userName}>{userName}</p>
              <p className={styles.userPhone}>+62 {userPhone}</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
