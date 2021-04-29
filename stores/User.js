import { makeObservable, observable, action, computed } from "mobx";
import backend from "../services/APIService";
import Utility from "../services/UtilityService";

class User {
  user = [];
  error = false;
  exist = false;
  saved = false;
  loading = false;
  removed = false;
  sending = false;
  checking = false;
  message = "";
  users = [];


  constructor() {
    makeObservable(this, {
      message: observable,
      user: observable, 
      sending: observable,
      removed: observable,
      checking: observable,
      error: observable,
      exist: observable,
      saved: observable,
      users: observable,
      login: action,
      logout: action,
      addStaff: action,
      getUsers: action,
      removeStaff: action,
      updateStaff: action,
      resetProperty: action,
      confirmEmail: action,
      setRole: action,
      loginReset: action,
      info: computed
    });
  }

  
  getUsers = () => {
    this.loading = true;
    try {
      backend
        .get("account")
        .then((res) => {
          this.loading = false;
          if (res.status === 200) {
            this.error = false;
            this.users = res.data;
            console.log("store", res.data);
          }
        })
        .catch((err) => {
          console.log({err})
          this.loading = false;
          this.error = true;
          this.message = err.response
            ? "failed to load users"
            : "Network Connection seems slow.";
        });
    } catch (error) {
      console.log({error})
      console.log(error.response);
    }
  };

  confirmEmail = (email) => {
    try {
      this.checking = true;
      this.exist = false;
      backend.get(`account/${email}`).then((res) => {
        this.checking = false;
        if (res.status === 200) {
          this.message = res.data.message;
          this.exist = res.data.exist;
        } else {
          this.message = res.data.error;
          this.error = true;
        }
      });
    } catch (err) {
      this.checking = false;
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  login = (data) => {
    this.loading = true;
    backend
      .post("admins/login", data)
      .then((res) => {
        this.loading = false;
        if (res.data.status) {
          this.successMsg = "Log In Successful";
          this.user = res.data.data.user;
          Utility.save("token", res.data.data.token);
          Utility.save("admin", res.data.data.user.email);
          console.log(res.data.data);
        }
      })
      .catch((err) => {
        this.error = true;
        this.loading = false;
        this.errMesssage = "Invalid login details!";
        console.log(this.errMesssage);
      });
  };

  loginReset = (data) => {
    this.loading = true;
    this.saved = false;
    backend
      .post("admins/reset", data)
      .then((res) => {
        this.loading = false;
        if (res.data.status) {
          this.saved = true;
          this.successMsg = res.data.message;
        }
      })
      .catch((err) => {
        this.error = true;
        this.loading = false;
        this.saved = false;
        this.errMesssage = "Invalid login details!";
        console.log(this.errMesssage);
      });
  };

  logout = () => {
    this.loading = true;
    try {
      this.loading = false;
      this.error = false;
      this.successMsg = "Logout successful.";
      this.resetAction();
      Utility.clear();
    } catch (error) {}
  };

  addStaff = (data) => {
    try {
      this.sending = true;
      backend.post("account", data).then((res) => {
        this.sending = false;
        if (res.status === 201) {
          this.getUsers();
          this.message = res.data.message;
          this.saved = true;
        } else {
          this.message = res.data.error;
          this.error = true;
        }
      }) .catch((err) => {
        this.sending = false;
        console.log({ err });
        if (err && err.response) {
          console.log("status", err.response.status);
        }
      });
  } catch (error) {
    this.sending = false;
    console.log({ error });
  }
  };

  updateStaff = (data) => {
    try {
      this.sending = true;
      backend
        .put("account", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 200) {
            this.getUsers();
            this.message = res.data.message;
            this.saved = true;
          } else {
            this.message = res.data.error;
            this.error = true;
          }
        })
        .catch((err) => {
          this.sending = false;
          console.log({ err });
          if (err && err.response) {
            console.log("status", err.response.status);
          }
        });
    } catch (error) {
      this.sending = false;
      console.log({ error });
    }
  };

  setRole = (data) => {
    try {
      this.sending = true;
      backend
        .post("account/auth", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 200) {
            this.getUsers();
            this.message = res.data.message;
            this.saved = true;
          } else {
            this.message = res.data.error;
            this.error = true;
          }
        })
        .catch((err) => {
          this.sending = false;
          console.log({ err });
          if (err && err.response) {
            console.log("status", err.response.status);
          }
        });
    } catch (error) {
      this.sending = false;
      console.log({ error });
    }
  };
  removeStaff = (id) => {
    try {
      this.removed = false;
      backend.delete(`account/${id}`).then((res) => {
        if (res.status === 200) {
          this.getUsers();
          this.message = res.data.message;
          this.removed = true;
        } else {
          this.message = res.data.error;
          this.error = true;
          this.removed = false;
        }
      });
    } catch (error) {
      this.removed = false;
      console.log(error);
    }
  };
  get info() {
    return Object.keys(this.users || {}).map((key) => ({
      ...this.users[key],
      uid: key,
    }));
  }
  resetProperty = (key, value) => {
    this[key] = value;
  };
}

export default User;
