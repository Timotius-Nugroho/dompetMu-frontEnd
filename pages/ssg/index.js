import axios from "axios";

export async function getStaticProps(context) {
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

  return {
    props: { users },
  };
}

export default function SSGPage(props) {
  // console.log(props);
  return (
    <>
      <h1>SSG Page</h1>
      {props.users.map((item, index) => (
        <h3 key={index}>{item.email}</h3>
      ))}
    </>
  );
}
