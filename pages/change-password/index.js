import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import SideNav from "../../components/module/SideNav";
import UpperNav from "../../components/module/UpperNav";
import Footer from "../../components/module/Footer";
import styles from "../../styles/ChangePassword.module.css";
import { authPage } from "../../middleware/authorizationPage";
import Cookie from "js-cookie";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  axios.setToken(data.token);

  const user = await axios.axiosApiIntances
    .get(`user/by-id/${data.user}`)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err.response);
      return {};
    });

  return {
    props: { user },
  };
}

export default function ChangePassword(props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [showAlert, setShowAlert] = useState([false, ""]);

  useEffect(() => {
    axios.setToken(Cookie.get("token"));
  }, []);

  const handleChangePassword = (event) => {
    event.preventDefault();
    if (newPassword === repeatNewPassword) {
      // console.log(currentPassword, newPassword, repeatNewPassword);
      axios.axiosApiIntances
        .patch("user/update-password", { currentPassword, newPassword })
        .then((res) => {
          // console.log(res.data.data);
          setCurrentPassword("");
          setNewPassword("");
          setRepeatNewPassword("");

          setShowAlert([true, res.data.msg]);
          setTimeout(() => {
            setShowAlert([false, ""]);
          }, 3000);
        })
        .catch((err) => {
          // console.log(err.response);
          setShowAlert([true, err.response.data.msg]);
          setTimeout(() => {
            setShowAlert([false, ""]);
          }, 3000);
        });
    } else {
      setShowAlert([true, "Please check the repeat password !"]);
      setTimeout(() => {
        setShowAlert([false, ""]);
      }, 3000);
    }
  };

  const activeButton =
    currentPassword && newPassword && repeatNewPassword && true;

  return (
    <Layout title="Change Password">
      <Navbar user={props.user} />
      <div className="container mt-5 pt-5 mb-5">
        <div className="row mt-4">
          <div className={`${styles.breakPoints} col-sm-3`}>
            <SideNav />
          </div>
          <div className="col">
            <div className={`${styles.breakPointsRev}`}>
              <UpperNav />
            </div>
            <div className={`${styles.box} shadow p-4`}>
              <div className={`${styles.miniTitle} mt-1`}>Change Password</div>
              <div className={`${styles.semi} mt-2 mb-5`}>
                You must enter your current password and then type your new
                password twice.
              </div>
              <div className="position-relative text-center">
                {showAlert[0] ? (
                  <div
                    className={`${styles.alert} alert alert-warning text-center top-0 start-50 translate-middle`}
                    role="alert"
                  >
                    {showAlert[1]}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <form
                onSubmit={handleChangePassword}
                className={`${styles.semi} mx-auto`}
                style={{ width: "60%" }}
              >
                <div className="mb-4 pt-3">
                  <div className="input-group">
                    <span
                      id="basic-addon2"
                      className={`${styles.input} input-group-text`}
                    >
                      <i className="bi bi-lock" style={{ color: "grey" }}></i>
                    </span>
                    <input
                      placeholder="Current password"
                      type={showPassword1 ? "text" : "password"}
                      className={`${styles.input} form-control`}
                      value={currentPassword}
                      onChange={(event) => {
                        setCurrentPassword(event.target.value);
                      }}
                      required
                    />
                    <span
                      id="basic-addon2"
                      className={`${styles.input} input-group-text`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowPassword1(!showPassword1);
                      }}
                    >
                      {showPassword1 ? (
                        <i className="bi bi-eye-fill"></i>
                      ) : (
                        <i className="bi bi-eye-slash-fill"></i>
                      )}
                    </span>
                  </div>
                </div>
                <div className="mb-4 pt-1">
                  <div className="input-group">
                    <span
                      id="basic-addon2"
                      className={`${styles.input} input-group-text`}
                    >
                      <i className="bi bi-lock" style={{ color: "grey" }}></i>
                    </span>
                    <input
                      placeholder="New password"
                      type={showPassword2 ? "text" : "password"}
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
                        setShowPassword2(!showPassword2);
                      }}
                    >
                      {showPassword2 ? (
                        <i className="bi bi-eye-fill"></i>
                      ) : (
                        <i className="bi bi-eye-slash-fill"></i>
                      )}
                    </span>
                  </div>
                </div>
                <div className="mb-4 pt-1">
                  <div className="input-group">
                    <span
                      id="basic-addon2"
                      className={`${styles.input} input-group-text`}
                    >
                      <i className="bi bi-lock" style={{ color: "grey" }}></i>
                    </span>
                    <input
                      placeholder="Repeat new password"
                      type={showPassword3 ? "text" : "password"}
                      className={`${styles.input} form-control`}
                      value={repeatNewPassword}
                      onChange={(event) => {
                        setRepeatNewPassword(event.target.value);
                      }}
                      required
                    />
                    <span
                      id="basic-addon2"
                      className={`${styles.input} input-group-text`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowPassword3(!showPassword3);
                      }}
                    >
                      {showPassword3 ? (
                        <i className="bi bi-eye-fill"></i>
                      ) : (
                        <i className="bi bi-eye-slash-fill"></i>
                      )}
                    </span>
                  </div>
                </div>
                <div className="d-grid gap-2 pt-3">
                  <button
                    type="submit"
                    className={`${
                      activeButton ? styles.btnActive : styles.btn
                    } btn btn-primary`}
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
