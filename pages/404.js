import Image from "next/image";

export default function Page404() {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div>
          <Image src="/404.gif" width={550} height={500} />
        </div>
        <button className="btn btn-light">Back To Home</button>
      </div>
    </>
  );
}
