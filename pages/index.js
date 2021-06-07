import { useState, useEffect } from "react";
import axiosApiIntances from "../utils/axios";
import Image from "next/image";
import Layout from "../components/Layout";
import Navbar from "../components/module/Navbar";
import SideNav from "../components/module/SideNav";
import UpperNav from "../components/module/UpperNav";
import Footer from "../components/module/Footer";
import styles from "../styles/Home.module.css";
import { authPage } from "../middleware/authorizationPage";
import Cookie from "js-cookie";
// import cookies from "next-cookies";

export async function getServerSideProps(context) {
  await authPage(context);
  // const allCookies = cookies(context);
  // console.log("USER ID", allCookies.user);

  // const user = await axiosApiIntances
  //   .get(`user/by-id/${allCookies.user}`)
  //   .then((res) => {
  //     console.log(res.data);
  //     // return res.data;
  //   })
  //   .catch((err) => {
  //     console.log("error ini ");
  //     // return [];
  //   });
  return {
    props: {},
  };
}

export default function Home(props) {
  const userId = Cookie.get("user");
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState("Loading...");
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    axiosApiIntances
      .get("transaction?sort=month&limit=4")
      .then((res) => {
        // console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });

    axiosApiIntances
      .get("transaction/balance")
      .then((res) => {
        // console.log(res.data.data);
        setBalance(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });

    axiosApiIntances
      .get(`user/by-id/${Cookie.get("user")}`)
      .then((res) => {
        setUserPhone(res.data.data[0].user_phone);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  }, []);

  // console.log(userId);
  return (
    <Layout title="Home">
      <Navbar />
      <div className="container mt-5 pt-5 mb-5 pb-5">
        <div className="row mt-4">
          <div className={`${styles.breakPoints} col-sm-3`}>
            <SideNav />
          </div>
          <div className="col">
            <div className={`${styles.breakPointsRev}`}>
              <UpperNav />
            </div>
            <div className={`${styles.boxBalance} shadow p-4`}>
              <div className="row align-items-center">
                <div className="col">
                  <div className={styles.semi}>Balance</div>
                  <div className={`${styles.balance} mb-2`}>Rp{balance}</div>
                  <div className={styles.semi}>{userPhone}</div>
                </div>
                <div className="col-sm-3">
                  <div className="d-grid gap-2">
                    <button
                      className={`${styles.btnSemi} btn btn-outline-primary d-flex justify-content-center`}
                      type="button"
                    >
                      <i className="bi bi-arrow-up"></i>
                      <div className={styles.btnAjust}>Transfer</div>
                    </button>
                    <button
                      className={`${styles.btnSemi} btn btn-outline-primary d-flex justify-content-center`}
                      type="button"
                    >
                      <i
                        className="bi bi-plus"
                        style={{ fontSize: "25px" }}
                      ></i>
                      <div>Top Up</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-7">
                <div className={`${styles.box} shadow p-3`}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <i
                        className="bi bi-arrow-down"
                        style={{ color: "green", fontSize: "20px" }}
                      ></i>
                      <div className={styles.semi}>Income</div>
                      <div className={styles.miniTitle}>Rp2.000.000</div>
                    </div>
                    <div>
                      <i
                        className="bi bi-arrow-up"
                        style={{ color: "red", fontSize: "20px" }}
                      ></i>
                      <div className={styles.semi}>Expense</div>
                      <div className={styles.miniTitle}>Rp1.560.000</div>
                    </div>
                  </div>
                  <div className="m-3" style={{ height: "198px" }}>
                    <div className="row align-items-center mt-3">
                      <div className="col">Comming soon !</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className={`${styles.box} shadow p-3`}>
                  <div className="d-flex justify-content-between mt-3 mb-4">
                    <div className={styles.miniTitle}>Transaction History</div>
                    <div className={styles.seeAll}>See all</div>
                  </div>
                  {data.length > 0
                    ? data.map((item, index) => {
                        return (
                          <div
                            className="row align-items-center mb-2"
                            key={index}
                          >
                            <div className="col-2">
                              {item.transaction_method ? (
                                <Image
                                  src="/topup.png"
                                  alt="Top up"
                                  width={46}
                                  height={46}
                                />
                              ) : (
                                <img
                                  src={`${process.env.IMG_BACKEND_URL}${
                                    item.transaction_receiver_id == userId
                                      ? item.senderDetail.user_image
                                      : item.receiverDetail.user_image
                                  }`}
                                  className={styles.pp}
                                />
                              )}
                            </div>
                            <div className="col-6">
                              <div className={`${styles.receiverName} ms-2`}>
                                {item.transaction_method
                                  ? "Me"
                                  : item.transaction_receiver_id == userId
                                  ? item.senderDetail.user_name
                                  : item.receiverDetail.user_name}
                              </div>
                              <div className={`${styles.type} ms-2`}>
                                {item.transaction_method
                                  ? `Top up (${item.transaction_method})`
                                  : "Transfer"}
                              </div>
                            </div>
                            <div className="col-4 text-end">
                              <div
                                className={`${styles.value} ${
                                  item.transaction_receiver_id == userId
                                    ? styles.valuePlus
                                    : styles.valueMinus
                                }`}
                              >
                                {item.transaction_receiver_id == userId
                                  ? "+"
                                  : "-"}
                                Rp{item.transaction_amount}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : ""}
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
