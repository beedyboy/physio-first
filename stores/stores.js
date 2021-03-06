import React from "react";

// import { enableStaticRendering } from "mobx-react-lite";

import User from "./User";
import Auth from "./Auth";
import Asset from "./Asset";
import Exeat from "./Exeat";
import Leave from "./Leave";
import Ticket from "./Ticket";
import Branch from "./Branch";
import Vacation from "./Vacation";
import Category from "./Category";
import Document from "./Document";
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
    exeatStore: {},
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
      exeatStore: new Exeat(initialData.exeatStore),
      assetStore: new Asset(initialData.assetStore),
      branchStore: new Branch(initialData.branchStore),
      ticketStore: new Ticket(initialData.ticketStore),
      vacationStore: new Vacation(initialData.vacationStore),
      documentStore: new Document(initialData.documentStore),
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
      exeatStore: new Exeat(initialData.exeatStore),
      leaveStore: new Leave(initialData.leaveStore),
      assetStore: new Asset(initialData.assetStore),
      branchStore: new Branch(initialData.branchStore),
      ticketStore: new Ticket(initialData.ticketStore),
      vacationStore: new Vacation(initialData.vacationStore),
      directorStore: new Director(initialData.directorStore),
      documentStore: new Document(initialData.documentStore),
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
