import React from "react";
import Head from "next/head"; 
import { Heading, Box, Text, Button } from "@chakra-ui/react"
import Layout from "../templates/Private/Layout";

function Dashboard() {
	return (
		<>
			<Head>
				<title>Core App | Dashboard</title>
			</Head>
		 <Layout>
     // Example from paystack.com

<Box maxW="32rem">
  <Heading mb={4}>Modern online and offline payments for Africa</Heading>
  <Text fontSize="xl">
    Paystack helps businesses in Africa get paid by anyone, anywhere in the
    world
  </Text>
  <Button size="lg" colorScheme="green" mt="24px">
    Create a free account
  </Button>
</Box>
     </Layout>
		</>
	);
}

export default Dashboard;
