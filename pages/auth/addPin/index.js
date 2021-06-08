import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import axios from "../../../utils/axios";
import Image from "next/image";
import Layout from "../../../components/Layout";
import styles from "../../../styles/AddPin.module.css";
import { authPage } from "../../../middleware/authorizationPage";

export async function getServerSideProps(context) {
  await authPage(context);
  return { props: {} };
}

export default function AddPin(props) {
  const router = useRouter();
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
        setShowAlert([true, res.data.msg]);
        setTimeout(() => {
          setShowAlert([false, ""]);
          router.push("/");
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

  return (
    <Layout title="AddPin">
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
                dompet Mu is an application that focussing in banking needs for
                all users in the world. Always updated and always following
                world trends. 5000+ users registered in dompet Mu everyday with
                worldwide users coverage.
              </p>
            </div>
          </div>
          <div className="col-sm-5 p-5">
            <p className={styles.title}>
              Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
              That You Created Yourself.
            </p>
            <p className={styles.semi}>
              Create 6 digits pin to secure all your money and your data in
              dompet Mu app. Keep it secret and don’t tell anyone about your
              Zwallet account password and the PIN.
            </p>
            <form onSubmit={handleAddPin}>
              <div className="d-flex justify-content-between mt-5">
                <div className={`${styles.input} input-group`}>
                  <input
                    type="text"
                    className="form-control text-center"
                    maxLength="1"
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
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
