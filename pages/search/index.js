import { useState, useEffect } from "react";
import axiosApiIntances from "../../utils/axios";
import Image from "next/image";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import SideNav from "../../components/module/SideNav";
import UpperNav from "../../components/module/UpperNav";
import Footer from "../../components/module/Footer";
import styles from "../../styles/Search.module.css";
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
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   axiosApiIntances
  //     .get("transaction?sort=month&limit=4")
  //     .then((res) => {
  //       // console.log(res.data.data);
  //       setDataWeek(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data.msg);
  //     });
  // }, []);

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
              <div className={`${styles.miniTitle} mt-3`}>Search Receiver</div>
              <input
                type="email"
                class={`form-control mt-3 mb-4 ${styles.input}`}
                placeholder="Search receiver here"
              />
              <div className={styles.resultBox}>
                <div className=" d-flex mb-2">
                  <div>
                    <Image
                      src="/no-img.png"
                      alt="Top up"
                      width={55}
                      height={55}
                      className={styles.noPP}
                      layout="fixed"
                    />
                    {/* <img
                      src={`${process.env.IMG_BACKEND_URL}${
                        item.transaction_receiver_id == userId
                          ? item.senderDetail.user_image
                          : item.receiverDetail.user_image
                      }`}
                      className={styles.pp}
                    /> */}
                  </div>
                  <div>
                    <div className={`${styles.receiverName} ms-3`}>
                      RECEIVER NAME
                    </div>
                    <div className={`${styles.type} ms-3`}>NO telp</div>
                  </div>
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
