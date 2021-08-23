import React from "react";
import Head from "next/head";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Layout from "../../templates/Private/Layout";
import Help from "../../views/admin/Help";
import Account from "../../views/admin/Account";
import Vacation from "../../views/admin/Vacation";

function admin(props) {
  const { access } = props;
  const leaveAdd = access?.leave?.add;
  const leaveView = access?.leave?.view;
  const leaveDel = access?.leave?.del;

  const staffAdd = access?.staff?.add;
  const staffView = access?.staff?.view;
  const staffDel = access?.staff?.del;
  const staffModify = access?.staff?.modify;

  let totalLeave = leaveAdd || leaveView || leaveDel;
  let totalStaff = staffAdd || staffView || staffDel || staffModify;

  return (
    <>
      <Head>
        <title>Physio First | Admin</title>
      </Head>
      <Layout>
        <Tabs>
          <TabList>
            <Tab>Help</Tab>
            {totalLeave || totalStaff ? (
              <>
                <Tab>Staff</Tab>
                <Tab>Vacation</Tab>
              </>
            ) : null}
          </TabList>
          <TabPanels>
            <TabPanel>
              <Help />
            </TabPanel>
            <TabPanel>
              <Account
                pageAccess={totalStaff}
                canAdd={staffAdd}
                canView={staffView}
                canDel={staffDel}
                canModify={staffModify}
              />
            </TabPanel>
            <TabPanel>
              <Vacation
                pageAccess={totalLeave}
                canAdd={leaveAdd}
                canView={leaveView}
                canDel={leaveDel}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Layout>
    </>
  );
}

export default admin;
