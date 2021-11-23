import "../styles/globals";
import Head from "next/head";
import Global from "../styles/globals";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
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
