import cookies from "next-cookies";

export function unauthPage(context) {
  // untuk halaman login/public
  return new Promise((resolve) => {
    const allCookies = cookies(context);
    if (allCookies.token) {
      return context.res
        .writeHead(302, {
          Location: "/",
        })
        .end();
    }

    return resolve("unauthorization");
  });
}

export function authPage(context) {
  // untuk halaman setelah login/private
  return new Promise((resolve) => {
    const allCookies = cookies(context);
    if (!allCookies.token) {
      return context.res
        .writeHead(302, {
          Location: "/landing",
        })
        .end();
    }

    return resolve({
      token: allCookies.token,
      user: allCookies.user,
    });
  });
}
