module.exports = {
  env: {
    APP_NAME: "DompetMu",
    BASE_URL: "http://localhost:3004/backend4/api/v1",
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
    ];
  },
};
