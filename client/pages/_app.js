import "../styles/globals";
import Head from "next/head";
import Global from "../styles/globals";
import { CookiesProvider, useCookies } from "react-cookie";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getCurrentUser } from "../src/api/user";

function MyApp({ Component, pageProps }) {
  const [cookies, setCookies, removeCookie] = useCookies(["userToken"]);

  useEffect(() => {
    if (!cookies?.userToken) {
      localStorage.removeItem("user");
      return;
    }
    (async () => {
      try {
        const data = (await getCurrentUser()).data;
        const user = data.user;
        console.log("User:", user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        removeCookie("userToken");
        localStorage.removeItem("user");
      }
    })();
  }, [cookies?.userToken, removeCookie]);

  return (
    <>
      <Global />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Online Marketplace</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <CookiesProvider>
        <Toaster />
        <Component {...pageProps} />
      </CookiesProvider>
    </>
  );
}

export default MyApp;
