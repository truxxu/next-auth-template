import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "../src/organisms";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
