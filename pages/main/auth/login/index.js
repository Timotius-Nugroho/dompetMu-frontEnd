import { useState } from "react";
// import { useRouter } from "next/router";
// import Cookie from "js-cookie";
import Image from "next/image";
import Layout from "../../../../components/Layout";
import styles from "../../../../styles/Login.module.css";
// import { unauthPage } from "../../../middleware/authorizationPage";

// export async function getServerSideProps(context) {
//   await unauthPage(context);
//   return { props: {} };
// }

export default function Login() {
  // const router = useRouter();
  const [form, setForm] = useState({ userEmail: "", userPasword: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    // proses axios di dalam .then
    // Cookie.set("token", "TestingToken", { expires: 1, secure: true }); // kadaluarsa 1 hari
    // Cookie.set("user", 1, { expires: 1, secure: true });
    // router.push("/");
  };

  return (
    <Layout title="Login">
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-sm-7 p-5"
            style={{ backgroundColor: "rgba(99, 121, 244, 1)" }}
          >
            <div className="ps-5 pe-5">
              <p className={styles.title} style={{ color: "white" }}>
                Dompet Mu
              </p>
              <div style={{ textAlign: "center" }}>
                <Image src="/phone.png" alt="Phone" width={461} height={517} />
              </div>
              <p className={styles.title} style={{ color: "white" }}>
                App that Covering Banking Needs.
              </p>
              <p
                className={styles.semi}
                style={{ color: "white", textAlign: "justify" }}
              >
                Zwallet is an application that focussing in banking needs for
                all users in the world. Always updated and always following
                world trends. 5000+ users registered in Zwallet everyday with
                worldwide users coverage.
              </p>
            </div>
          </div>
          <div className="col-sm-5 p-5">
            <p className={styles.title}>
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </p>
            <p className={styles.semi}>
              Transfering money is eassier than ever, you can access dompetMu
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
            </p>
            <form onSubmit={handleLogin} className={styles.semi}>
              <div className="mb-5 mt-5 pt-2">
                <div className="input-group">
                  <span
                    id="basic-addon2"
                    className={`${styles.input} input-group-text`}
                  >
                    <i class="bi bi-envelope" style={{ color: "grey" }}></i>
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`${styles.input} form-control`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
              </div>
              <div className="mb-3 pt-1">
                <div className="input-group">
                  <span
                    id="basic-addon2"
                    className={`${styles.input} input-group-text`}
                  >
                    <i className="bi bi-lock" style={{ color: "grey" }}></i>
                  </span>
                  <input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className={`${styles.input} form-control`}
                    id="exampleInputPassword1"
                    required
                  />
                  <span
                    id="basic-addon2"
                    className={`${styles.input} input-group-text`}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <i class="bi bi-eye-fill"></i>
                    ) : (
                      <i class="bi bi-eye-slash-fill"></i>
                    )}
                  </span>
                </div>
              </div>
              <p className={styles.forgot}>Forgot password?</p>
              <div class="d-grid gap-2 mt-5 pt-5">
                <button
                  type="submit"
                  className={`${styles.btn} btn btn-primary`}
                >
                  Login
                </button>
              </div>
            </form>
            <p className={`${styles.semi} text-center mt-3`}>
              Don’t have an account?{" "}
              <span className={styles.signUp}>Let’s Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
