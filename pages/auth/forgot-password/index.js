import { useState } from "react";
import { useRouter } from "next/router";
import axios from "../../../utils/axios";
import Image from "next/image";
import Layout from "../../../components/Layout";
import styles from "styles/ForgotPassword.module.css";
import { unauthPage } from "../../../middleware/authorizationPage";

import { connect } from "react-redux";
import { forgotPassword } from "redux/action/auth";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

function Forgot(props) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountFound, setAccountFound] = useState(false);
  const [showAlert, setShowAlert] = useState([false, ""]);

  const handleForget = (event) => {
    event.preventDefault();
    if (!accountFound) {
      props
        .forgotPassword({ userEmail })
        .then((res) => {
          // console.log(res.value.data.msg);
          setShowAlert([true, res.value.data.msg]);
          setTimeout(() => {
            setShowAlert([false, ""]);
            setAccountFound(true);
          }, 1000);
        })
        .catch((err) => {
          // console.log(err.response.data.msg);
          setShowAlert([true, err.response.data.msg]);
          setTimeout(() => {
            setShowAlert([false, ""]);
          }, 3000);
        });
    } else {
      if (newPassword === confirmPassword) {
        props
          .forgotPassword({ userEmail, userPassword: newPassword })
          .then((res) => {
            setShowAlert([true, res.value.data.msg]);
            setTimeout(() => {
              setShowAlert([false, ""]);
              router.push("/login");
            }, 3000);
          })
          .catch((err) => {
            setShowAlert([true, err.response.data.msg]);
            setTimeout(() => {
              setShowAlert([false, ""]);
            }, 3000);
          });
      } else {
        setShowAlert([true, "new and confirm password didn't match !"]);
        setTimeout(() => {
          setShowAlert([false, ""]);
        }, 3000);
      }
    }
  };

  // console.log(userEmail, newPassword, confirmPassword);
  // console.log(props);
  return (
    <Layout title="Forgot password">
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
              Did You Forgot Your Password? Don’t Worry, You Can Reset Your
              Password In a Minutes.
            </p>
            <p className={styles.semi}>
              To reset your password, you must type your e-mail and we will send
              a link to your email and you will be directed to the reset
              password screens.
            </p>
            {showAlert[0] ? (
              <div className="alert alert-warning text-center" role="alert">
                {showAlert[1]}
              </div>
            ) : (
              ""
            )}
            <form onSubmit={handleForget} className={styles.semi}>
              {!accountFound ? (
                <div className="mb-5 mt-4">
                  <div className="input-group">
                    <span
                      id="basic-addon2"
                      className={`${styles.input} input-group-text`}
                    >
                      <i
                        className="bi bi-envelope"
                        style={{ color: "grey" }}
                      ></i>
                    </span>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className={`${styles.input} form-control`}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(event) => {
                        setUserEmail(event.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-5 mt-4">
                  <div className="input-group">
                    <span
                      id="basic-addon2"
                      className={`${styles.input} input-group-text`}
                    >
                      <i className="bi bi-lock" style={{ color: "grey" }}></i>
                    </span>
                    <input
                      placeholder="Create new password"
                      type={showNewPassword ? "text" : "password"}
                      className={`${styles.input} form-control`}
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                      }}
                      required
                    />
                    <span
                      id="basic-addon2"
                      className={`${styles.input} input-group-text`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowNewPassword(!showNewPassword);
                      }}
                    >
                      {showNewPassword ? (
                        <i className="bi bi-eye-fill"></i>
                      ) : (
                        <i className="bi bi-eye-slash-fill"></i>
                      )}
                    </span>
                  </div>
                </div>
              )}
              {accountFound ? (
                <div className="mb-3 pt-1">
                  <div className="input-group">
                    <span
                      id="basic-addon2"
                      className={`${styles.input} input-group-text`}
                    >
                      <i className="bi bi-lock" style={{ color: "grey" }}></i>
                    </span>
                    <input
                      placeholder="Cofirm new password"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`${styles.input} form-control`}
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                      }}
                      required
                    />
                    <span
                      id="basic-addon2"
                      className={`${styles.input} input-group-text`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                    >
                      {showConfirmPassword ? (
                        <i className="bi bi-eye-fill"></i>
                      ) : (
                        <i className="bi bi-eye-slash-fill"></i>
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="d-grid gap-2 mt-5">
                <button
                  type="submit"
                  className={`${styles.btn} btn btn-primary`}
                >
                  {accountFound ? "Reset Password" : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapDispatchToProps = { forgotPassword };
export default connect(null, mapDispatchToProps)(Forgot);
