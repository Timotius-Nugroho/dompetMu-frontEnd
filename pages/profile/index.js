import { useState } from "react";
import { useRouter } from "next/router";
import axios from "../../utils/axios";
import Image from "next/image";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import SideNav from "../../components/module/SideNav";
import UpperNav from "../../components/module/UpperNav";
import Footer from "../../components/module/Footer";
import styles from "../../styles/Profile.module.css";
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

export default function History(props) {
  const router = useRouter();
  const token = Cookie.get("token");
  axios.setToken(token);
  const [user, setUser] = useState(props.user);
  const [userImage, setUserImage] = useState(
    `${process.env.IMG_BACKEND_URL}${user.user_image}`
  );
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState(user.user_name);
  const [userPhone, setUserPhone] = useState(user.user_phone);
  const [showAlert, setShowAlert] = useState([false, ""]);

  const handleImage = (event) => {
    // console.log(event.target.files[0]);
    if (event.target.files[0]) {
      setUserImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setUserImage(`${process.env.IMG_BACKEND_URL}${props.user.user_image}`);
      setImage(null);
    }
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userPhone", userPhone);
    if (image) {
      formData.append("image", image);
    }
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    axios.axiosApiIntances
      .patch("user/update-profile", formData)
      .then((res) => {
        // console.log(res.data.data);
        setShowAlert([true, res.data.msg]);
        setTimeout(() => {
          setShowAlert([false, ""]);
        }, 3000);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
        setShowAlert([true, err.response.data.msg]);
        setTimeout(() => {
          setUserImage(`${process.env.IMG_BACKEND_URL}${user.user_image}`);
          setShowAlert([false, ""]);
        }, 3000);
      });
  };

  const goToPersonalInfo = () => {
    const id = Cookie.get("user");
    router.push(`/personal-info/${id}`);
  };

  const goToChangePassword = () => {
    router.push("/change-password");
  };

  const goToChangePin = () => {
    router.push("/change-pin");
  };

  const handleDeleteProfile = () => {
    axios.axiosApiIntances
      .patch("user/delete-photo")
      .then((res) => {
        // console.log(res.data.data);
        setShowAlert([true, res.data.msg]);
        setUser({ ...user, user_image: "" });
        setUserImage(`${process.env.IMG_BACKEND_URL}`);
        setTimeout(() => {
          setShowAlert([false, ""]);
        }, 3000);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
        setShowAlert([true, err.response.data.msg]);
        setTimeout(() => {
          setShowAlert([false, ""]);
        }, 3000);
      });
  };

  // console.log(userImage);
  return (
    <Layout title="Profile">
      <Navbar user={user} />
      <div className="container mt-5 pt-5 mb-5 pb-5">
        <div className="row mt-4">
          <div className={`${styles.breakPoints} col-sm-3`}>
            <SideNav />
          </div>
          <div className="col">
            <div className={`${styles.breakPointsRev}`}>
              <UpperNav />
            </div>
            <div className={`${styles.box} shadow p-4`}>
              <div className="text-center">
                <label
                  htmlFor="formFile"
                  className="form-label"
                  style={{ cursor: "pointer" }}
                >
                  {userImage !== process.env.IMG_BACKEND_URL ? (
                    <img src={userImage} className={styles.pp} />
                  ) : (
                    <Image
                      src="/no-img.png"
                      alt="Picture user"
                      width={70}
                      height={70}
                      className={styles.noPp}
                    />
                  )}
                </label>
                <input
                  className={`${styles.fileInput} form-control`}
                  type="file"
                  id="formFile"
                  onChange={(event) => {
                    handleImage(event);
                  }}
                />
                <div className={styles.type}>click to make changes</div>
              </div>
              <input
                type="text"
                className={`${styles.miniTitle} ${styles.input} form-control text-center mt-1`}
                placeholder="input your name"
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
              <div style={{ marginTop: "-15px" }}>
                <input
                  type="text"
                  className={`${styles.semi} ${styles.input} form-control form-control-sm text-center mt-1`}
                  placeholder="input your phone number"
                  value={userPhone}
                  onChange={(event) => {
                    setUserPhone(event.target.value);
                  }}
                />
              </div>
              {showAlert[0] ? (
                <div
                  className={`${styles.alert} alert alert-warning`}
                  role="alert"
                  style={{ width: "40%", fontSize: "12px" }}
                >
                  {showAlert[1]}
                </div>
              ) : (
                ""
              )}
              <div className="text-center mt-4">
                <div onClick={handleUpdate}>
                  <button
                    type="button"
                    className={`${styles.btnCustom} btn mb-2`}
                  >
                    <div className="d-flex justify-content-between">
                      <div>Save Changes</div>
                      <div>
                        <i className="bi bi-save2"></i>
                      </div>
                    </div>
                  </button>
                </div>
                <div onClick={handleDeleteProfile}>
                  <button
                    type="button"
                    className={`${styles.btnCustom} btn mb-2`}
                  >
                    <div className="d-flex justify-content-between">
                      <div>Delete Profile</div>
                      <div>
                        <i className="bi bi-trash"></i>
                      </div>
                    </div>
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className={`${styles.btnCustom} btn mb-2`}
                    onClick={goToPersonalInfo}
                  >
                    <div className="d-flex justify-content-between">
                      <div>Personal Information</div>
                      <div>
                        <i className="bi bi-arrow-right"></i>
                      </div>
                    </div>
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className={`${styles.btnCustom} btn mb-2`}
                    onClick={goToChangePassword}
                  >
                    <div className="d-flex justify-content-between">
                      <div>Change Password</div>
                      <div>
                        <i className="bi bi-arrow-right"></i>
                      </div>
                    </div>
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className={`${styles.btnCustom} btn mb-2`}
                    onClick={goToChangePin}
                  >
                    <div className="d-flex justify-content-between">
                      <div>Change PIN</div>
                      <div>
                        <i className="bi bi-arrow-right"></i>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
