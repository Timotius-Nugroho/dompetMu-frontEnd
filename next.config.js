module.exports = {
  env: {
    APP_NAME: "DompetMu",
    NEXT_PUBLIC_BACKEND_URL: "http://localhost:3004/backend4/api/v1/",
    IMG_BACKEND_URL: "http://localhost:3004/backend4/api/",
  },
  async rewrites() {
    return [
      {
        source: "/login", // sebagai pengganti path
        destination: "/auth/login", // sebagai lokasi asli
      },
      {
        source: "/register", // sebagai pengganti path
        destination: "/auth/register", // sebagai lokasi asli
      },
      {
        source: "/addpin", // sebagai pengganti path
        destination: "/auth/addpin", // sebagai lokasi asli
      },
    ];
  },
};
