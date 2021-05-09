
import React from 'react' 
import { Box, Divider, Heading } from '@chakra-ui/react'
import Link from 'next/link'

const TicketHome = () => {
    return (
        <div>
            <Box>
        <Heading as="h1">Ticket Management</Heading>
        <p className="lead">Your satisfaction is our joy</p>
        <Divider my={2}/>
        <p>If you have any issue with any of our products and services, you can submit a ticket by selecting the appropriate category.</p>
        <p className="lead">
          <Link href="/ticket/create">
            <a>Create Ticket</a>
          </Link>
        </p>
      </Box>
        </div>
    )
}

export default TicketHome
