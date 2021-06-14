import axios from "../../utils/axios";
import axio from "axios";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import SideNav from "../../components/module/SideNav";
import UpperNav from "../../components/module/UpperNav";
import Footer from "../../components/module/Footer";
import styles from "../../styles/PersonalInfo.module.css";
import cookies from "next-cookies";

export async function getStaticPaths() {
  const users = await axios.axiosApiIntances
    .get("user?page=1&limit=100&keywords=")
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err.response);
      return {};
    });
  // console.log(users);

  const paths = users.map((item) => ({
    params: { id: `${item.user_id}` },
  }));
  // console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const user = await axios.axiosApiIntances
    .get(`user/by-id/${context.params.id}`)
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

export default function PersonalInfo(props) {
  // console.log(props);
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
            <div className={`${styles.box} shadow p-4`}>
              <div className={`${styles.miniTitle} mt-4`}>
                Personal Information
              </div>
              <div className={`${styles.semi} mt-3 mb-5`}>
                We got your personal information from the sign up proccess. If
                you want to make changes on your information, contact our
                support.
              </div>
              <div className={`${styles.type} mb-2 pt-3`}>User Name</div>
              <div className={`${styles.info} mb-4`}>
                {props.user.user_name}
              </div>
              <div className={`${styles.type} mb-2`}>Verified E-mail</div>
              <div className={`${styles.info} mb-4`}>
                {props.user.user_email}
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <div className={`${styles.type} mb-2`}>Phone Number</div>
                  <div className={`${styles.info}`}>
                    {props.user.user_phone}
                  </div>
                </div>
                <div className={`${styles.manage} mt-2`}>Manage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
