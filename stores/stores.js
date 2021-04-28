import React from "react";

// import { enableStaticRendering } from "mobx-react-lite";
 
import User from "./User";
import Branch from "./Branch";
import Category from "./Category";
import Department from "./Department";
import Marketing from "./Marketing";
import SubCategory from "./SubCategory";

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
    // serviceStore: {},
  }
) {
  if (isServer) {
    return { 
      userStore: new User(initialData.userStore),
      branchStore: new Branch(initialData.branchStore),
      categoryStore: new Category(initialData.categoryStore),
      departmentStores: new Department(initialData.departmentStores),
      marketingStore: new Marketing(initialData.marketingStore),
      subCategoryStore: new SubCategory(initialData.subCategoryStore),
    };
  }
  if (!store) {
    store = { 
      userStore: new User(initialData.userStore),
      branchStore: new Branch(initialData.branchStore),
      categoryStore: new Category(initialData.categoryStore),
      departmentStores: new Department(initialData.departmentStores),
      marketingStore: new Marketing(initialData.marketingStore),
      subCategoryStore: new SubCategory(initialData.subCategoryStore),
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
