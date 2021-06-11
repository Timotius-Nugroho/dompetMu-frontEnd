import axios from "utils/axios";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import SideNav from "components/module/SideNav";
import UpperNav from "components/module/UpperNav";
import Footer from "components/module/Footer";
import styles from "styles/TopUp.module.css";
import { authPage } from "middleware/authorizationPage";

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

export default function TopUp(props) {
  // console.log(userImage);
  return (
    <Layout title="Personal Info">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
