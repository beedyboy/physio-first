import React, { Fragment, useEffect } from "react";
import DataTable from "react-data-table-component";
import Link from "next/link";
import { useMobxStores } from "../../stores/stores";

const TicketList = () => {
  const { ticketStore } = useMobxStores();
  const { fetchMyTicket, myTickets: data } = ticketStore;
  useEffect(() => {
    fetchMyTicket();
  }, []);
  const columns = [
    {
      name: "Subject",
      selector: "title",
      sortable: true,
    },
    {
      name: "Ticket date",
      selector: "ticket_date",
      sortable: true,
    },
    {
      name: "Status",
      sortable: true,
      cell: (row) => <Badge>{row.status}</Badge>,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <Fragment>
          <Link href={`/ticket/${row.id}/view`}>
           <a> View</a>
          </Link>
        </Fragment>
      ),
    },
  ];

  return (
    <Fragment>
      <DataTable
        title="My Tickets"
        columns={columns}
        data={data}
        pagination={true}
        theme="solarized"
      />
    </Fragment>
  );
};

export default TicketList;
