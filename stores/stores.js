import React from "react";

// import { enableStaticRendering } from "mobx-react-lite";
 
import User from "./User";
import Branch from "./Branch";
import Category from "./Category";
import Department from "./Department";
import Marketing from "./Marketing";
import SubCategory from "./SubCategory";
import Leave from "./Leave";
import Auth from "./Auth";
import Asset from "./Asset";
import Ticket from "./Ticket";
import Vacation from "./Vacation";

const isServer = typeof window === "undefined";
// enableStaticRendering(isServer);

let store;

export function getStores(
  initialData = { 
    userStore: {},
    branchStore: {},
    categoryStore: {},
    departmentStores: {},
    marketingStore: {},
    subCategoryStore: {},
    leaveStore: {},
    authStore: {},
    assetStore: {},
    ticketStore: {},
    vacationStore: {},
  }
) {
  if (isServer) {
    return { 
      userStore: new User(initialData.userStore),
      branchStore: new Branch(initialData.branchStore),
      categoryStore: new Category(initialData.categoryStore),
      departmentStore: new Department(initialData.departmentStore),
      marketingStore: new Marketing(initialData.marketingStore),
      subCategoryStore: new SubCategory(initialData.subCategoryStore),
      leaveStore: new Leave(initialData.leaveStore),
      assetStore: new Asset(initialData.assetStore),
      authStore: new Auth(initialData.authStore),
      ticketStore: new Ticket(initialData.ticketStore),
      vacationStore: new Vacation(initialData.vacationStore),
    };
  }
  if (!store) {
    store = { 
      userStore: new User(initialData.userStore),
      branchStore: new Branch(initialData.branchStore),
      categoryStore: new Category(initialData.categoryStore),
      departmentStore: new Department(initialData.departmentStore),
      marketingStore: new Marketing(initialData.marketingStore),
      subCategoryStore: new SubCategory(initialData.subCategoryStore),
      leaveStore: new Leave(initialData.leaveStore),
      assetStore: new Asset(initialData.assetStore),
      ticketStore: new Ticket(initialData.ticketStore),
      authStore: new Auth(initialData.authStore),
      vacationStore: new Vacation(initialData.vacationStore),
    };
  }
  return store;
}

const StoreContext = React.createContext();

export function StoreProvider(props) {
  return (
    <StoreContext.Provider value={props.value}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useMobxStores() {
  return React.useContext(StoreContext);
}
