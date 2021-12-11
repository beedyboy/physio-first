import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { getStores, StoreProvider } from "../stores/stores";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import "../styles/flip.css";
import "aos/dist/aos.css";
import Aos from "aos";
import theme from "../styles/theme";
import Utility from "../services/UtilityService";

function MyApp({ Component, pageProps }) {
  const store = getStores();

  const loggedIn = Utility.get("staff_token") ? false : true;
  let access;
  if (loggedIn === false) {
    const obj = Utility.get("acl");
    if (obj && obj !== "undefined") {
      access = JSON.parse(obj);
    }
    // console.log({access})
  }
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <link
          href="https://fonts.googleapis.org/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/assets/icons/favicon.ico" />
        <meta
          name="description"
          content="Physiotherapy Massage Therapy Grand Falls Kinesiology Pool Gym pregnancy dietitian physiotherapie kinesiology Grand Sault Piscine massotherapeute BodyMechs One Openyu taping acupuncture ultrasound exercise fitness FCE vestibular orthotics sport work injury motor vehicle accident"
        />

        <meta
          property="og:title"
          content="PhysioFirst & Capture Therapeutics"
        />
        <meta
          property="og:description"
          content="Physiotherapy Massage Therapy Grand Falls Kinesiology Pool Gym pregnancy dietitian physiotherapie kinesiology Grand Sault Piscine massotherapeute BodyMechs One Openyu taping acupuncture ultrasound exercise fitness FCE vestibular orthotics sport work injury motor vehicle accident"
        />
        <meta property="og:url" content="https://youarecaptured.org" />
        <meta property="og:image" content="/assets/icons/favicon.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@" />
        <meta
          name="twitter:description"
          content="Physiotherapy Massage Therapy Grand Falls Kinesiology Pool Gym pregnancy dietitian physiotherapie kinesiology Grand Sault Piscine massotherapeute BodyMechs One Openyu taping acupuncture ultrasound exercise fitness FCE vestibular orthotics sport work injury motor vehicle accident"
        />
        <meta name="twitter:url" content="https://youarecaptured.org" />
        <meta name="twitter:image" content="/assets/icons/favicon.png" />
        <meta
          name="twitter:image:alt"
          content="Physiotherapy Massage Therapy Grand Falls Kinesiology Pool Gym pregnancy dietitian physiotherapie kinesiology Grand Sault Piscine massotherapeute BodyMechs One Openyu taping acupuncture ultrasound exercise fitness FCE vestibular orthotics sport work injury motor vehicle accident"
        />

        <title>Physio First - Inventory</title>
      </Head>

      <StoreProvider value={store}>
        <Component {...pageProps} access={access} />
      </StoreProvider>
    </ChakraProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
