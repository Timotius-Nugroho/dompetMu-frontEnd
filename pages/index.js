import { useState } from "react";
import axiosApiIntances from "../utils/axios";
import Layout from "../components/Layout";
import Navbar from "../components/module/Navbar";
import styles from "../styles/Home.module.css";
import { authPage } from "../middleware/authorizationPage";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  console.log(data);

  const res = await axiosApiIntances
    .get("users")
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      // console.log(err);
      return [];
    });
  return {
    props: { users: res, userLogin: data }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  console.log(props);
  const [users, setUsers] = useState(props.users);

  return (
    <Layout title="Home">
      <Navbar />
      <h1 className={styles.titleHead}>Home Page</h1>
      <h2>{process.env.APP_NAME}</h2>
      {users.map((item, index) => (
        <div className="d-grid gap-2" key={index}>
          <button className="btn btn-primary" type="button">
            {item.name}
          </button>
        </div>
      ))}
    </Layout>
  );
}

// export default function Home() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     console.log("Get Data !");
//     getUsers();
//   }, []);

//   const getUsers = () => {
//     axiosApiIntances
//       .get("users")
//       .then((res) => {
//         console.log(res.data);
//         setUsers(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <Layout title="Home">
//       <Navbar />
//       <h1 className={styles.titleHead}>Home Page</h1>
//       <h2>{process.env.APP_NAME}</h2>
//       {users.map((item, index) => (
//         <div className="d-grid gap-2" key={index}>
//           <button className="btn btn-primary" type="button">
//             {item.name}
//           </button>
//         </div>
//       ))}
//     </Layout>
//   );
// }
