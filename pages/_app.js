import React, { useEffect } from "react";
import AOS from "aos";
import { AnimatePresence, motion } from "framer-motion";
import Router from "next/router";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import Layout from "../components/Layout";
import "tailwindcss/tailwind.css";
import "aos/dist/aos.css";
import "../styles/globals.scss";
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={router.route}
        initial="out"
        animate="in"
        exit="out"
        transition={{
          duration: 0.75,
        }}
        variants={{
          out: {
            opacity: 0,
            y: 40,
            transition: {
              duration: 0.75,
            },
          },
          in: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.75,
              delay: 0.5,
            },
          },
        }}
        className="base-page-size"
      >
        <Layout>
          <Component {...pageProps} data-aos="fade-up" />
        </Layout>
      </motion.div>
    </AnimatePresence>
  );
}

export default MyApp;
