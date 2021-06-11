import Image from "next/image";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter();

  const handleDashboard = () => {
    router.push("/");
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div>
          <Image src="/404.gif" width={550} height={500} />
        </div>
        <button className="btn btn-light" onClick={handleDashboard}>
          Back To Home
        </button>
      </div>
    </>
  );
}
