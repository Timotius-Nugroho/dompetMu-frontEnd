import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import axios from "../../../utils/axios";
import Image from "next/image";
import Layout from "../../../components/Layout";
import styles from "styles/Login.module.css";
import { unauthPage } from "../../../middleware/authorizationPage";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function Login(props) {
  const router = useRouter();
  const [form, setForm] = useState({ userEmail: "", userPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState([false, ""]);

  const handleLogin = (event) => {
    event.preventDefault();
    axios.axiosApiIntances
      .post("auth/login", form)
      .then((res) => {
        // console.log("axios", res);
        setShowAlert([true, res.data.msg]);
        setTimeout(() => {
          setShowAlert([false, ""]);
          Cookie.set("token", res.data.data.token, {
            expires: 1,
            secure: true,
          });
          Cookie.set("user", res.data.data.user_id, {
            expires: 1,
            secure: true,
          });
          if (res.data.data.user_pin > 0) {
            router.push("/");
          } else {
            router.push("/addpin");
          }
        }, 2000);
      })
      .catch((error) => {
        // console.log("errr", error.response.data.msg);
        setShowAlert([true, error.response.data.msg]);
        setTimeout(() => {
          setShowAlert([false, ""]);
        }, 3000);
      });
  };

  const moveToRegister = () => {
    router.push("/register");
  };

  const moveToForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <Layout title="Login">
      <div className="container-fluid">
        <div className="row">
          <div
            className={`${styles.breakPoints} col-sm-7 p-5`}
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
                dompet Mu is an application that focussing in banking needs for
                all users in the world. Always updated and always following
                world trends. 5000+ users registered in dompet Mu everyday with
                worldwide users coverage.
              </p>
            </div>
          </div>
          <div className="col p-5">
            <p className={styles.title}>
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </p>
            <p className={styles.semi}>
              Transfering money is eassier than ever, you can access dompetMu
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
            </p>
            {showAlert[0] ? (
              <div className="alert alert-warning text-center" role="alert">
                {showAlert[1]}
              </div>
            ) : (
              ""
            )}
            <form onSubmit={handleLogin} className={styles.semi}>
              <div className="mb-5 mt-5 pt-2">
                <div className="input-group">
                  <span
                    id="basic-addon2"
                    className={`${styles.input} input-group-text`}
                  >
                    <i className="bi bi-envelope" style={{ color: "grey" }}></i>
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`${styles.input} form-control`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(event) => {
                      setForm({
                        ...form,
                        ...{ userEmail: event.target.value },
                      });
                    }}
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
                    onChange={(event) => {
                      setForm({
                        ...form,
                        ...{ userPassword: event.target.value },
                      });
                    }}
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
                      <i className="bi bi-eye-fill"></i>
                    ) : (
                      <i className="bi bi-eye-slash-fill"></i>
                    )}
                  </span>
                </div>
              </div>
              <p
                className={styles.forgot}
                onClick={() => {
                  moveToForgotPassword();
                }}
              >
                Forgot password?
              </p>
              <div className="d-grid gap-2 mt-5 pt-5">
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
              <span className={styles.signUp} onClick={moveToRegister}>
                Let’s Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
