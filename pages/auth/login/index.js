import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Login.module.css";
import { unauthPage } from "../../../middleware/authorizationPage";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ userEmail: "", userPasword: "" });

  const handleLogin = (event) => {
    event.preventDefault();
    // proses axios di dalam .then
    Cookie.set("token", "TestingToken", { expires: 1, secure: true }); // kadaluarsa 1 hari
    Cookie.set("user", 1, { expires: 1, secure: true });
    router.push("/");
  };

  return (
    <Layout title="Login">
      <form className={`card ${styles.containerCard}`} onSubmit={handleLogin}>
        <h1>Login</h1>
        <hr />
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
}
