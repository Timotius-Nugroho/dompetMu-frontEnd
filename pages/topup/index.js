import axios from "utils/axios";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import SideNav from "components/module/SideNav";
import UpperNav from "components/module/UpperNav";
import Footer from "components/module/Footer";
import styles from "styles/TopUp.module.css";
import { authPage } from "middleware/authorizationPage";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";

import { connect } from "react-redux";
import { topUp } from "redux/action/transaction";

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

function TopUp(props) {
  const token = Cookie.get("token");
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState([false, ""]);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axios.setToken(Cookie.get("token"));
  }, []);

  const handleTopUp = (event) => {
    event.preventDefault();
    axios.axiosApiIntances
      .post("transaction/topup", { transactionAmount: amount })
      .then((res) => {
        console.log(res.data.data.redirectUrl);
        window.open(res.data.data.redirectUrl, "_blank");
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    // props
    //   .topUp(token, { transactionMethod: "Instant", transactionAmount: amount })
    //   .then((res) => {
    //     setShowAlertModal([true, res.value.data.msg]);
    //     setTimeout(() => {
    //       setShowAlertModal([false, ""]);
    //       setShowModal(false);
    //     }, 2000);
    //   })
    //   .catch((err) => {
    //     setShowAlertModal([true, err.response.data.msg]);
    //     setTimeout(() => {
    //       setShowAlertModal([false, ""]);
    //     }, 3000);
    //   });
  };

  // console.log(props);
  return (
    <Layout title="Top Up">
      <Navbar user={props.user} />

      {showModal ? (
        <div
          className={`position-fixed top-50 start-50 translate-middle p-4 ${styles.modal}`}
        >
          <div className="d-flex justify-content-between">
            <p className={`${styles.miniTitle} mt-2`}>
              Enter the top-up amount
            </p>
            <div
              onClick={() => {
                setShowModal(false);
              }}
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-x-circle" style={{ fontSize: "30px" }}></i>
            </div>
          </div>
          <div className={`${styles.semi} mt-3`} style={{ width: "80%" }}>
            Enter the maximum amount of money Rp2.000.000, upgrade to full
            service for unlimited topup
          </div>
          <form onSubmit={handleTopUp}>
            <div className="d-flex justify-content-between mt-3">
              <div className={`${styles.input} input-group`}>
                <input
                  type="number"
                  className="form-control text-center"
                  maxLength="1"
                  onChange={(event) => {
                    setAmount(event.target.value);
                  }}
                  min="10000"
                  placeholder="Minimal top up Rp10.000"
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

      <div className="container mt-5 pt-5 mb-5">
        <div className="row mt-4">
          <div className={`${styles.breakPoints} col-sm-3`}>
            <SideNav />
          </div>
          <div className="col">
            <div className={`${styles.breakPointsRev}`}>
              <UpperNav />
            </div>
            <div className={`${styles.box} shadow pt-4 pb-4 pe-4 ps-5`}>
              <div className={`${styles.miniTitle} mt-3`}>How To Top Up</div>
              <div className="row align-items-center mt-4">
                <div className={`col-1 text-center ${styles.number}`}>1</div>
                <div className={`col ${styles.semi}`}>
                  Go to the nearest ATM or you can use E-Banking.
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className={`col-1 text-center ${styles.number}`}>2</div>
                <div className={`col ${styles.semi}`}>
                  Type your security number on the ATM or E-Banking.
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className={`col-1 text-center ${styles.number}`}>3</div>
                <div className={`col ${styles.semi}`}>
                  Select “Transfer” in the menu.
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className={`col-1 text-center ${styles.number}`}>4</div>
                <div className={`col ${styles.semi}`}>
                  Type the virtual account number that we provide you at the
                  top.
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className={`col-1 text-center ${styles.number}`}>5</div>
                <div className={`col ${styles.semi}`}>
                  Type the virtual account number that we provide you at the
                  top.
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className={`col-1 text-center ${styles.number}`}>6</div>
                <div className={`col ${styles.semi}`}>
                  Read the summary details
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className={`col-1 text-center ${styles.number}`}>7</div>
                <div className={`col ${styles.semi}`}>
                  Press transfer / top up
                </div>
              </div>
              <div className="row align-items-center mt-4">
                <div className={`col-1 text-center ${styles.number}`}>8</div>
                <div className={`col ${styles.semi}`}>
                  You can see your money in DompetMu within 3 hours.
                </div>
                <div className="col-sm-2">
                  <button
                    className={`btn btn-primary ${styles.btnTopup} mt-3 mt-sm-0`}
                    type="button"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Top Up Now
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

const mapDispatchToProps = { topUp };
export default connect(null, mapDispatchToProps)(TopUp);
