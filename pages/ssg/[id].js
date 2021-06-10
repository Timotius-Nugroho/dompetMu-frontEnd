import axios from "axios";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const users = await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      // console.log(err);
      return [];
    });

  const paths = users.map((item) => ({
    params: { id: `${item.id}` },
  }));
  console.log(paths);

  // fallback : false, maka halaman 404
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // console.log(context.params);
  const user = await axios
    .get(`https://jsonplaceholder.typicode.com/users/${context.params.id}`)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      // console.log(err);
      return {};
    });
  return {
    props: { user },
  };
}

export default function SSGPage(props) {
  const router = useRouter();
  const move3 = () => {
    router.push("/ssg/3");
  };
  const move2 = () => {
    router.push("/ssg/2");
  };
  return (
    <>
      <h1>SSG Detail Page</h1>
      <hr />
      <h3>{props.user.email}</h3>
      <h3>{props.user.name}</h3>
      <button onClick={move2}>move2</button>
      <button onClick={move3}>move3</button>
    </>
  );
}
