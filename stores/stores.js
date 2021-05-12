import React from "react";

// import { enableStaticRendering } from "mobx-react-lite";

import User from "./User";
import Auth from "./Auth";
import Asset from "./Asset";
import Leave from "./Leave";
import Ticket from "./Ticket";
import Branch from "./Branch";
import Vacation from "./Vacation";
import Category from "./Category";
import Director from "./Director";
import Marketing from "./Marketing";
import Department from "./Department";
import SubCategory from "./SubCategory";
import Conversation from "./Conversation";

const isServer = typeof window === "undefined";
// enableStaticRendering(isServer);

let store;

export function getStores(
  initialData = {
    authStore: {},
    userStore: {},
    leaveStore: {},
    assetStore: {},
    ticketStore: {},
    branchStore: {},
    categoryStore: {},
    directorStore: {},
    vacationStore: {},
    marketingStore: {},
    departmentStores: {},
    subCategoryStore: {},
    conversationStore: {},
  }
) {
  if (isServer) {
    return {
      userStore: new User(initialData.userStore),
      authStore: new Auth(initialData.authStore),
      leaveStore: new Leave(initialData.leaveStore),
      assetStore: new Asset(initialData.assetStore),
      branchStore: new Branch(initialData.branchStore),
      ticketStore: new Ticket(initialData.ticketStore),
      vacationStore: new Vacation(initialData.vacationStore),
      directorStore: new Director(initialData.directorStore),
      categoryStore: new Category(initialData.categoryStore),
      marketingStore: new Marketing(initialData.marketingStore),
      departmentStore: new Department(initialData.departmentStore),
      subCategoryStore: new SubCategory(initialData.subCategoryStore),
      conversationStore: new Conversation(initialData.conversationStore),
    };
  }
  if (!store) {
    store = {
      userStore: new User(initialData.userStore),
      authStore: new Auth(initialData.authStore),
      leaveStore: new Leave(initialData.leaveStore),
      assetStore: new Asset(initialData.assetStore),
      branchStore: new Branch(initialData.branchStore),
      ticketStore: new Ticket(initialData.ticketStore),
      vacationStore: new Vacation(initialData.vacationStore),
      directorStore: new Director(initialData.directorStore),
      categoryStore: new Category(initialData.categoryStore),
      marketingStore: new Marketing(initialData.marketingStore),
      departmentStore: new Department(initialData.departmentStore),
      subCategoryStore: new SubCategory(initialData.subCategoryStore),
      conversationStore: new Conversation(initialData.conversationStore),
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
