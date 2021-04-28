import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head"; 
import { getStores, StoreProvider } from "../stores/stores";
import { ChakraProvider } from "@chakra-ui/react"
import "../styles/globals.css";  
import "aos/dist/aos.css";
import Aos from "aos"; 
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) { 
	const store = getStores();
 
	useEffect(() => {
		Aos.init({ duration: 2000 });
	}, []);
	return (
		<ChakraProvider theme={theme}> 
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap"
					rel="stylesheet"
				></link>
				<link rel="icon" href="/assets/icons/favicon.png" />
				<meta
					name="description"
					content="Solution Influx Limited is a technology solutions company in the business of enabling growth through enriching dexterity and nurturing productivity via innovation."
				/>

				<meta property="og:title" content="Solution Influx" />
				<meta
					property="og:description"
					content="Solution Influx Limited is a technology solutions company in the business of enabling growth through enriching dexterity and nurturing productivity via innovation."
				/>
				<meta property="og:url" content="https://youarecaptured.com" />
				<meta property="og:image" content="/assets/icons/favicon.png" />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content="@InfluxSolution" />
				<meta
					name="twitter:description"
					content="Solution Influx Limited is a technology solutions company in the business of enabling growth through enriching dexterity and nurturing productivity via innovation."
				/>
				<meta name="twitter:url" content="https://youarecaptured.com" />
				<meta name="twitter:image" content="/assets/icons/favicon.png" />
				<meta
					name="twitter:image:alt"
					content="Solution Influx Limited, Technology Solutions Company"
				/>

				<title>Inventory</title>
			</Head>

			<StoreProvider value={store}>
				<Component {...pageProps} /> 
			</StoreProvider>
		</ChakraProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default MyApp;
