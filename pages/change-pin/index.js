import { useState } from "react";
import axios from "../../utils/axios";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import SideNav from "../../components/module/SideNav";
import UpperNav from "../../components/module/UpperNav";
import Footer from "../../components/module/Footer";
import styles from "../../styles/ChangePin.module.css";
import { authPage } from "../../middleware/authorizationPage";
import Cookie, { set } from "js-cookie";

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

export default function ChangePin(props) {
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");
  const [six, setSix] = useState("");
  const [showAlert, setShowAlert] = useState([false, ""]);

  const handleAddPin = (event) => {
    event.preventDefault();
    const setPin = one + two + three + four + five + six;
    axios.setToken(Cookie.get("token"));

    axios.axiosApiIntances
      .patch("user/update-pin", { newPin: setPin })
      .then((res) => {
        // console.log("axios", res);
        setOne("");
        setTwo("");
        setThree("");
        setFour("");
        setFive("");
        setSix("");

        setShowAlert([true, res.data.msg]);
        setTimeout(() => {
          setShowAlert([false, ""]);
        }, 3000);
      })
      .catch((error) => {
        // console.log("errr", error.response.data.msg);
        setOne("");
        setTwo("");
        setThree("");
        setFour("");
        setFive("");
        setSix("");

        setShowAlert([true, error.response.data.msg]);
        setTimeout(() => {
          setShowAlert([false, ""]);
        }, 3000);
      });
  };

  return (
    <Layout title="Change Pin">
      <Navbar user={props.user} />
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
              <div className={`${styles.miniTitle} mt-3`}>Change PIN</div>
              <div className={`${styles.semi} mt-3 mb-5`}>
                Enter your current 6 digits Zwallet PIN below to continue to the
                next steps.
              </div>
              <form
                onSubmit={handleAddPin}
                className={`mx-auto ${styles.form}`}
              >
                <div className="d-flex justify-content-between mt-5">
                  <div className={`${styles.input} input-group`}>
                    <input
                      type="text"
                      className="form-control text-center"
                      maxLength="1"
                      value={one}
                      onChange={(event) => {
                        setOne(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className={`${styles.input} input-group`}>
                    <input
                      type="text"
                      className="form-control text-center"
                      maxLength="1"
                      value={two}
                      onChange={(event) => {
                        setTwo(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className={`${styles.input} input-group`}>
                    <input
                      type="text"
                      className="form-control text-center"
                      maxLength="1"
                      value={three}
                      onChange={(event) => {
                        setThree(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className={`${styles.input} input-group`}>
                    <input
                      type="text"
                      className="form-control text-center"
                      maxLength="1"
                      value={four}
                      onChange={(event) => {
                        setFour(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className={`${styles.input} input-group`}>
                    <input
                      type="text"
                      className="form-control text-center"
                      maxLength="1"
                      value={five}
                      onChange={(event) => {
                        setFive(event.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className={`${styles.input} input-group`}>
                    <input
                      type="text"
                      className="form-control text-center"
                      maxLength="1"
                      value={six}
                      onChange={(event) => {
                        setSix(event.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                {showAlert[0] ? (
                  <div
                    className="alert alert-warning text-center m-3"
                    role="alert"
                  >
                    {showAlert[1]}
                  </div>
                ) : (
                  ""
                )}
                <div className="d-grid gap-2 mt-5 pt-2">
                  <button
                    type="submit"
                    className={`${styles.btn} btn btn-primary`}
                  >
                    Continue
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
