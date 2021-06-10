import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../../utils/axios";
import Image from "next/image";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import SideNav from "../../components/module/SideNav";
import UpperNav from "../../components/module/UpperNav";
import Footer from "../../components/module/Footer";
import styles from "../../styles/Confirmation.module.css";
import { authPage } from "../../middleware/authorizationPage";
import Cookie from "js-cookie";

// import cookies from "next-cookies";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  axios.setToken(data.token);
  const { id } = context.query;
  const dateTime = Date(Date.now());

  const user = await axios.axiosApiIntances
    .get(`user/by-id/${data.user}`)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err.response);
      return {};
    });

  const receiver = await axios.axiosApiIntances
    .get(`user/by-id/${id}`)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err.response);
      return {};
    });

  const balance = await axios.axiosApiIntances
    .get("transaction/balance")
    .then((res) => {
      // console.log(res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response);
      return "Loading...";
    });

  return {
    props: { user, receiver, balance, dateTime },
  };
}

export default function Confirmation(props) {
  const router = useRouter();
  const receiverInfo = props.receiver;
  const [amount, setAmount] = useState(0);
  const balanceLeft = props.balance;
  const dateTime = props.dateTime;

  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState([false, ""]);
  const [succes, setSucces] = useState(false);

  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");
  const [six, setSix] = useState("");

  useEffect(() => {
    if (Cookie.get("amount")) {
      setAmount(Cookie.get("amount"));
    }
    axios.setToken(Cookie.get("token"));
  }, []);

  const handleSetPin = (event) => {
    event.preventDefault();
    const setPin = one + two + three + four + five + six;
    console.log("PIN", setPin);
    axios.axiosApiIntances
      .post("transaction", {
        transactionAmount: amount,
        senderPin: setPin,
        receiverId: receiverInfo.user_id,
      })
      .then((res) => {
        // console.log(res.data);
        setShowModal(false);
        setSucces(true);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setShowAlertModal([true, err.response.data.msg]);
        setTimeout(() => {
          setShowAlertModal([false, ""]);
        }, 3000);
      });
  };

  // console.log("PROP", balanceLeft);

  return (
    <Layout title="Confirmation">
      <Navbar user={props.user} />

      {showModal ? (
        <div
          className={`position-fixed top-50 start-50 translate-middle p-4 ${styles.modal}`}
        >
          <div className="d-flex justify-content-between">
            <p className={`${styles.miniTitle} mt-2`}>Enter PIN to Transfer</p>
            <div
              onClick={() => {
                setShowModal(false);
              }}
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-x-circle" style={{ fontSize: "30px" }}></i>
            </div>
          </div>
          <div className={`${styles.type} mt-3`} style={{ width: "60%" }}>
            Enter your 6 digits PIN for confirmation to continue transferring
            money.
          </div>
          <form onSubmit={handleSetPin}>
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
            {showAlertModal[0] ? (
              <div className="alert alert-warning text-center m-3" role="alert">
                {showAlertModal[1]}
              </div>
            ) : (
              ""
            )}
            <div className="d-grid gap-2 mt-4">
              <button type="submit" className={`${styles.btn} btn btn-primary`}>
                Continue
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}

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
              {!succes ? (
                <div>
                  <div className={`${styles.miniTitle} mt-3 mb-4`}>
                    Transfer To
                  </div>
                  <div className=" d-flex mb-2 ms-3">
                    <div>
                      {receiverInfo.user_image ? (
                        <img
                          src={`${process.env.IMG_BACKEND_URL}${receiverInfo.user_image}`}
                          className={styles.pp}
                        />
                      ) : (
                        <Image
                          src="/no-img.png"
                          alt="Top up"
                          width={55}
                          height={55}
                          className={styles.noPP}
                          layout="fixed"
                        />
                      )}
                    </div>
                    <div>
                      <div className={`${styles.receiverName} ms-3`}>
                        {receiverInfo.user_name}
                      </div>
                      <div className={`${styles.type} ms-3`}>
                        {receiverInfo.user_phone}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={`${styles.miniTitle} mt-3 text-center`}>
                    <div className="mb-2">
                      <i
                        className="bi bi-check-circle"
                        style={{ fontSize: "30px", color: "green" }}
                      ></i>
                    </div>
                    Transfer Success
                  </div>
                </div>
              )}
              <div className={`${styles.miniTitle} mt-3 mb-4`}>Details</div>
              <div className="ms-3 mb-2">
                <div className={styles.type}>Amount</div>
                <div className={styles.detail}>
                  Rp {amount.toLocaleString()}
                </div>
              </div>
              <div className="ms-3 mb-2">
                <div className={styles.type}>Balance left</div>
                <div className={styles.detail}>
                  Rp {(balanceLeft - parseInt(amount)).toLocaleString()}
                </div>
              </div>
              <div className="ms-3 mb-2">
                <div className={styles.type}>Date & Time</div>
                <div className={styles.detail}>{dateTime}</div>
              </div>
              <div className="ms-3 mb-2">
                <div className={styles.type}>Note</div>
                <div className={styles.detail}>-</div>
              </div>
              {!succes ? (
                <div className="d-flex flex-row-reverse mt-4">
                  <button
                    type="button"
                    className={`${styles.btnContinune} btn btn-primary btn-lg`}
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <div>
                  <div className={`${styles.miniTitle} mt-3 mb-4`}>
                    Transfer To
                  </div>
                  <div className=" d-flex mb-2 ms-3">
                    <div>
                      {receiverInfo.user_image ? (
                        <img
                          src={`${process.env.IMG_BACKEND_URL}${receiverInfo.user_image}`}
                          className={styles.pp}
                        />
                      ) : (
                        <Image
                          src="/no-img.png"
                          alt="Top up"
                          width={55}
                          height={55}
                          className={styles.noPP}
                          layout="fixed"
                        />
                      )}
                    </div>
                    <div>
                      <div className={`${styles.receiverName} ms-3`}>
                        {receiverInfo.user_name}
                      </div>
                      <div className={`${styles.type} ms-3`}>
                        {receiverInfo.user_phone}
                      </div>
                    </div>
                  </div>
                  <div className="position-relative">
                    <div className="position-absolute bottom-0 end-0">
                      <div className="d-flex flex-row-reverse">
                        <button
                          type="button"
                          className="btn btn-outline-primary m-1"
                          onClick={() => {
                            router.push("/");
                          }}
                        >
                          Back to home
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary m-1"
                        >
                          <i className="bi bi-download"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary m-1"
                        >
                          <i className="bi bi-share"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
