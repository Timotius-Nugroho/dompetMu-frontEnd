import { useState, useEffect } from "react";
import axiosApiIntances from "../../utils/axios";
import Image from "next/image";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import SideNav from "../../components/module/SideNav";
import UpperNav from "../../components/module/UpperNav";
import Footer from "../../components/module/Footer";
import styles from "../../styles/History.module.css";
import { authPage } from "../../middleware/authorizationPage";
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

export default function History(props) {
  const userId = Cookie.get("user");
  const [dataWeek, setDataWeek] = useState([]);

  useEffect(() => {
    axiosApiIntances
      .get("transaction?sort=month&limit=4")
      .then((res) => {
        // console.log(res.data.data);
        setDataWeek(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  }, []);

  // console.log(userId);
  return (
    <Layout title="History">
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
            <div className={`${styles.box} shadow p-4`}>
              <div className={`${styles.miniTitle} mt-4`}>
                Transaction history
              </div>
              <div className={`${styles.semi} mt-3 mb-3`}>This Week</div>
              <div className={`${styles.dataBox} p-2`}>
                {dataWeek.map((item, index) => {
                  return (
                    <div className="row align-items-center mb-2" key={index}>
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
                          {item.transaction_receiver_id == userId ? "+" : "-"}
                          Rp{item.transaction_amount}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={`${styles.semi} mt-3 mb-3`}>This Month</div>
              <div className={styles.dataBox}></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
