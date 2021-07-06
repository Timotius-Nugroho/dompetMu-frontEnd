// import axios from "../../utils/axios";
import Layout from "../../components/Layout";
import styles from "styles/Landing.module.css";
import { unauthPage } from "../../middleware/authorizationPage";
import Image from "next/image";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return {
    props: {},
  };
}

export default function Landing(props) {
  const router = useRouter();

  const moveToLogin = () => {
    router.push("/login");
  };

  const moveToRegister = () => {
    router.push("/register");
  };
  return (
    <Layout title="DompetMu">
      <nav className={`${styles.navbar} sticky-top`}>
        <div className="d-flex justify-content-between p-4">
          <div className={styles.brand}>
            <h3>DompetMu</h3>
          </div>
          <div className={styles.breakPoint}>
            <div className="d-flex">
              <button
                onClick={() => {
                  moveToLogin();
                }}
                type="button"
                className={`${styles.btnLogin} btn btn-primary pe-4 ps-4 m-1`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  moveToRegister();
                }}
                type="button"
                className={`${styles.btnRegister} btn btn-light pe-4 ps-4 m-1`}
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className={styles.breakPointRev}>
            <div className="d-flex">
              <div
                onClick={() => {
                  moveToLogin();
                }}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="bi bi-box-arrow-right m-1"
                  style={{ color: "white", fontSize: "25px" }}
                ></i>
              </div>
              <div
                onClick={() => {
                  moveToRegister();
                }}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="bi bi-journal-arrow-down m-2"
                  style={{ color: "white", fontSize: "24px" }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className={`${styles.head} text-center pb-5 pt-5`}>
        <div className={styles.breakPoint}>
          <Image src="/flow.png" alt="Picture of the author" layout="fill" />
        </div>
        <div className={styles.mainTitle}>
          <div>Awesome App.</div>
          <div>For Saving Time</div>
        </div>
        <div className={`${styles.mini} mt-5 mb-5`}>
          <div>We bring you a web app for banking problems</div>
          <div>that oftenly wasting much of your times.</div>
        </div>
        <button
          type="button"
          className={`${styles.btnCustom} btn btn-light pe-4 ps-4 mb-5`}
        >
          Try it free
        </button>
      </section>
      <section className="text-center pt-5 pb-5">
        <div className={`${styles.secondTitle} mb-4`}>
          <span style={{ color: "#6379F4" }}>Why</span> Choose DompetMu?
        </div>
        <div className={styles.semi}>
          We have some great features from the application and it’s totally free
        </div>
        <div className={styles.semi}>to use by all users around the world.</div>
        <div className="overflow-auto p-2">
          <div
            className="d-flex justify-content-around mx-auto mt-5 mb-4"
            style={{ width: "850px" }}
          >
            <div className={`${styles.card} shadow p-3`}>
              <div className={`${styles.icon} mx-auto`}>
                <i
                  className="bi bi-telephone"
                  style={{ color: "#6379F4", fontSize: "22px" }}
                ></i>
              </div>
              <div className={`${styles.lable} mt-3 mb-3`}>24/7 Support</div>
              <div className={styles.desc}>
                We have 24/7 contact support so you can contact us whenever you
                want and we will respond it.
              </div>
            </div>
            <div className={`${styles.card} shadow p-3`}>
              <div className={`${styles.icon} mx-auto`}>
                <i
                  className="bi bi-shield-lock"
                  style={{ color: "#6379F4", fontSize: "22px" }}
                ></i>
              </div>
              <div className={`${styles.lable} mt-3 mb-3`}>Data Privacy</div>
              <div className={styles.desc}>
                We make sure your data is safe in our database and we will
                encrypt any data you submitted to us.
              </div>
            </div>
            <div className={`${styles.card} shadow p-3`}>
              <div className={`${styles.icon} mx-auto`}>
                <i
                  className="bi bi-cloud-download"
                  style={{ color: "#6379F4", fontSize: "22px" }}
                ></i>
              </div>
              <div className={`${styles.lable} mt-3 mb-3`}>Easy Download</div>
              <div className={styles.desc}>
                DompetMu is 100% totally free to use it’s now available on
                Google Play Store and App Store.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="text-center pt-4 pb-4 mb-4"
        style={{ backgroundColor: "rgba(71, 58, 209, 0.06)" }}
      >
        <Image src="/sponsor.png" alt="-" width={912} height={96} />
      </section>
      <section className="text-center pt-5 pb-5">
        <div className={`${styles.money} pe-5 ps-5 pt-3 pb-3 mx-auto`}>
          Rp. 390.736.500
        </div>
        <div className={`${styles.secondTitle} mb-4 mt-4`}>
          <span style={{ color: "#6379F4" }}>Money</span> has Been Transfered.
        </div>
        <div className={styles.semi}>
          That amount of money has been transfered from all users. We still
        </div>
        <div className={`${styles.semi} mb-4`}>counting and going strong!</div>
      </section>
      <section
        className="pt-4 pb-5"
        style={{ backgroundColor: "rgba(71, 58, 209, 0.06)" }}
      >
        <div className="container">
          <div className="row">
            <div className={`${styles.breakPointPict} col-sm-4`}>
              <Image
                src="/landing-phone.png"
                alt="-"
                width={450}
                height={856}
              />
            </div>
            <div className="col">
              <div className={`${styles.secondTitle} mt-5`}>
                <span style={{ color: "#6379F4" }}>All</span> The Great
              </div>
              <div className={`${styles.secondTitle} mb-4`}>
                DompetMu Features.
              </div>
              <div className={`${styles.whiteBox} p-4 shadow mt-5`}>
                <div className={styles.semi} style={{ fontWeight: "600" }}>
                  <span style={{ color: "#6379f4" }} className="pe-2">
                    1.{" "}
                  </span>
                  Small free
                </div>
                <div className={`${styles.semi} mt-3`}>
                  We only charge 5% of every success transaction done in
                  DompetMu app.
                </div>
              </div>
              <div className={`${styles.whiteBox} p-4 shadow mt-3`}>
                <div className={styles.semi} style={{ fontWeight: "600" }}>
                  <span style={{ color: "#6379f4" }} className="pe-2">
                    2.{" "}
                  </span>
                  Data Secured
                </div>
                <div className={`${styles.semi} mt-3`}>
                  All your data is secured properly in our system and it’s
                  encrypted.
                </div>
              </div>
              <div className={`${styles.whiteBox} p-4 shadow mt-3`}>
                <div className={styles.semi} style={{ fontWeight: "600" }}>
                  <span style={{ color: "#6379f4" }} className="pe-2">
                    3.{" "}
                  </span>
                  User Friendly
                </div>
                <div className={`${styles.semi} mt-3`}>
                  DompetMu come up with modern and sleek design and not
                  complicated.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center pt-4 pb-5">
        <div className={`${styles.secondTitle} mt-5`}>
          What Users are
          <span style={{ color: "#6379F4" }}> Saying.</span>
        </div>
        <div className={`${styles.semi} mt-3`}>
          We have some great features from the application and it’s totally free
        </div>
        <div className={`${styles.semi} mb-5`}>
          to use by all users around the world.
        </div>

        <div
          id="carouselExampleControlsNoTouching"
          className="carousel slide"
          data-bs-touch="false"
          data-bs-interval="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div
                className={`${styles.testimoniBox} shadow mx-auto text-center p-3 m-3`}
              >
                <div className="mb-3">
                  <Image
                    src="/squid.jpg"
                    alt="-"
                    width={90}
                    height={90}
                    className={styles.pp}
                  />
                </div>
                <div className={styles.lable}>Squidward Tentacles</div>
                <div
                  className={`${styles.semi} mb-4`}
                  style={{ fontWeight: "600" }}
                >
                  Cashier
                </div>
                <div
                  className={`${styles.semi} mx-auto`}
                  style={{ width: "70%" }}
                >
                  “This is the most outstanding app that I’ve ever try in my
                  live, this app is such an amazing masterpiece and it’s
                  suitable for you who is bussy with their bussiness and must
                  transfer money to another person aut there. Just try this app
                  and see the power!”
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div
                className={`${styles.testimoniBox} shadow mx-auto text-center p-3 m-3`}
              >
                <div className="mb-3">
                  <Image
                    src="/krabs.png"
                    alt="-"
                    width={90}
                    height={90}
                    className={styles.pp}
                  />
                </div>
                <div className={styles.lable}>Eugene H. Krabs</div>
                <div
                  className={`${styles.semi} mb-4`}
                  style={{ fontWeight: "600" }}
                >
                  Businessman
                </div>
                <div
                  className={`${styles.semi} mx-auto`}
                  style={{ width: "70%" }}
                >
                  “This is the most outstanding app that I’ve ever try in my
                  live, this app is such an amazing masterpiece and it’s
                  suitable for you who is bussy with their bussiness and must
                  transfer money to another person aut there. Just try this app
                  and see the power!”
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div
                className={`${styles.testimoniBox} shadow mx-auto text-center p-3 m-3`}
              >
                <div className="mb-3">
                  <Image
                    src="/plank.jpg"
                    alt="-"
                    width={90}
                    height={90}
                    className={styles.pp}
                  />
                </div>
                <div className={styles.lable}>Sheldon J. Plankton</div>
                <div
                  className={`${styles.semi} mb-4`}
                  style={{ fontWeight: "600" }}
                >
                  Scientist
                </div>
                <div
                  className={`${styles.semi} mx-auto`}
                  style={{ width: "70%" }}
                >
                  “This is the most outstanding app that I’ve ever try in my
                  live, this app is such an amazing masterpiece and it’s
                  suitable for you who is bussy with their bussiness and must
                  transfer money to another person aut there. Just try this app
                  and see the power!”
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
              style={{ backgroundColor: "black", borderRadius: "8px" }}
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
              style={{ backgroundColor: "black", borderRadius: "8px" }}
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <footer className={`${styles.navbar} pt-5 pe-5 ps-5 pb-3 mt-3`}>
        <div className={`${styles.brand} mb-4`}>
          <h3>DompetMu</h3>
        </div>
        <div
          className={`${styles.semi}`}
          style={{ color: "rgba(239, 239, 239, 0.75)" }}
        >
          Simplify financial needs and saving much time in
        </div>
        <div
          className={`${styles.semi}`}
          style={{ color: "rgba(239, 239, 239, 0.75)" }}
        >
          banking needs with one single app.
        </div>
        <hr style={{ color: "white" }} />
        <div className="row">
          <div
            className={`${styles.semi} col-sm-4`}
            style={{ color: "rgba(239, 239, 239, 0.75)", fontSize: "13px" }}
          >
            2021 DompetMu. All right reserved.
          </div>
          <div className="col"></div>
          <div
            className={`${styles.semi} col-sm-2 text-md-end`}
            style={{ color: "rgba(239, 239, 239, 0.75)", fontSize: "13px" }}
          >
            +62 5637 8882 9901
          </div>
          <div
            className={`${styles.semi} col-sm-3 text-md-end`}
            style={{ color: "rgba(239, 239, 239, 0.75)", fontSize: "13px" }}
          >
            contact @dompetmu.com
          </div>
        </div>
      </footer>
    </Layout>
  );
}
