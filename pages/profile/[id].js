import { useState } from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import axiosApiIntances from "../../utils/axios";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axiosApiIntances
    .get(`users/${id}`)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });

  return {
    props: { user: res },
  };
}

export default function Profile(props) {
  const [user, setUser] = useState(props.user);

  return (
    <Layout title="Profile">
      <Navbar />
      <h1>Profile Page By Id !</h1>
      <div className="card">
        {user.name ? (
          <div>
            <h4>{user.name}</h4>
          </div>
        ) : (
          <h4>Loading ... </h4>
        )}
      </div>
    </Layout>
  );
}
