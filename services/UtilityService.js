const isServer = typeof window === "undefined";
const Utility = {
  save: (key, value) => {
    localStorage.setItem(key, value);
  },
  get: (key) => {
    if (!isServer) {
      return localStorage.getItem(key);
    }
  },
  clear: () => {
    localStorage.clear();
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  logout: () => {
    localStorage.removeItem("staff_token");
    localStorage.removeItem("name");
    localStorage.removeItem("acl");
    // window.location.hash ? window.location.hash : window.location.pathname
    // window.location.href = "/login";
    // window.location.hash  = 'login';
    window.location.replace("/auth/login");
  },
  canAccess: (key, priviledge) => {
    let access = Utility.get("acl");
    let acl;
    if (access && access.length > 0 && access !== "null") {
      acl = JSON.parse(access);
      if (acl[key] === undefined) {
        return false;
      } else {
        return acl[key][priviledge];
      }
    }
    return false;
  },
};
module.exports = Utility;

// export function invoice() { return localStorage.getItem('receiptNumber')}
