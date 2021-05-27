import React from "react";
import Head from "next/head";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Layout from "../templates/Private/Layout";
import Help from "../views/system/Help";
import Branch from "../views/system/Branch";
import Category from "../views/system/Category";
import Department from "../views/system/Department";
import Marketing from "../views/system/Marketing";
import SubCategory from "../views/system/SubCategory";
import Leave from "../views/system/Leave";
import Director from "../views/system/Director";

function system(props) {
  const { access } = props;
  const leaveAdd = access && access.leave && access.leave.add;
  const leaveView = access && access.leave && access.leave.view;
  const leaveDel = access && access.leave && access.leave.del;

  const catAdd = access && access.category && access.category.add;
  const catView = access && access.category && access.category.view;
  const catDel = access && access.category && access.category.del;

  const deptAdd = access && access.department && access.department.add;
  const deptView = access && access.department && access.department.view;
  const deptDel = access && access.department && access.department.del;

  const dirAdd = access && access.director && access.director.add;
  const dirView = access && access.director && access.director.view;
  const dirDel = access && access.director && access.director.del;

  const branchAdd = access && access.branch && access.branch.add;
  const branchView = access && access.branch && access.branch.view;
  const branchDel = access && access.branch && access.branch.del;

  let company = access && access.company && access.company.manage;

  let totalLeave = leaveAdd || leaveView || leaveDel;

  let totalBranch = branchAdd || branchView || branchDel;

  let totalCategory = catAdd || catView || catDel;

  let totalDept = deptAdd || deptView || deptDel;

  let totalDir = dirAdd || dirView || dirDel;

  // {"asset":{"add":true,"view":false,"del":false,"modify":false},"branch":{"add":true,"view":true,"del":false},"category":{"add":true,"view":false,"del":false},"company":{"manage":true},"department":{"ad…
  return (
    <>
      <Head>
        <title>Physio First | System</title>
      </Head>
      <Layout>
        <Tabs>
          <TabList>
            <Tab>Help</Tab>
            {totalBranch || totalCategory || totalDept ? (
              <>
                <Tab>Branch</Tab>
                <Tab>Category</Tab>
                <Tab>Department</Tab>
                <Tab>Director</Tab>
                <Tab>Marketing</Tab>
                <Tab>SubCategory</Tab>
                <Tab>Vacation</Tab>
              </>
            ) : null}
          </TabList>
          <TabPanels>
            <TabPanel>
              <Help />
            </TabPanel>
            <TabPanel>
              <Branch
                pageAccess={totalBranch}
                canAdd={branchAdd}
                canView={branchView}
                canDel={branchDel}
              />
            </TabPanel>
            <TabPanel>
              <Category
                pageAccess={totalCategory}
                canAdd={catAdd}
                canView={catView}
                canDel={catDel}
              />
            </TabPanel>
            <TabPanel>
              <Department
                pageAccess={totalDept}
                canAdd={deptAdd}
                canView={deptView}
                canDel={deptDel}
              />
            </TabPanel>
            <TabPanel>
              <Director
                pageAccess={totalDir}
                canAdd={dirAdd}
                canView={dirView}
                canDel={dirDel}
              />
            </TabPanel>
            <TabPanel>
              <Marketing />
            </TabPanel>
            <TabPanel>
              <SubCategory
                pageAccess={totalCategory}
                canAdd={catAdd}
                canView={catView}
                canDel={catDel}
              />
            </TabPanel>
            <TabPanel>
              <Leave
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

export default system;
