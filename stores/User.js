import { makeObservable, observable, action } from "mobx";
import backend from "../services/APIService"; 
import Utility from "../services/UtilityService";

class User {
  user = [];
  loading = false;
  onError = false;
  onSuccess = false;
  sending = false;
  errMesssage = "";
  saved = false;
  successMsg = "";
  users = [];

  constructor() {
    makeObservable(this, {
      user: observable,
      loading: observable,
      onError: observable,
      sending: observable,
      saved: observable,
      onSuccess: observable,
      successMsg: observable,
      errMesssage: observable,
      users: observable,
      login: action,
      logout: action,
      addStaff: action,
      getUsers: action,
      removeStaff: action,
      editStaff: action,
      resetAction: action,
      resetProperty: action,
      loginReset: action,
    });
  }

  getUsers = () => {
    this.loading = true;
    try {
      backend
        .get("admins")
        .then((res) => {
          this.loading = false;
          if (res.data.status) {
            this.error = false;
            this.users = res.data.data;
            console.log("store", res.data.data);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.errMesssage = err.response
            ? "faild to load FAQs"
            : "Network Connection seems slow.";
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  login = (data) => {
    this.loading = true;
    backend
      .post("admins/login", data)
      .then((res) => {
        this.loading = false;
        if (res.data.status) {
          this.onSuccess = true;
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
    this.sending = true;
    this.saved = false;
    try {
      backend.post("admins", data).then((res) => {
        this.sending = false;
        if (res.data.status) {
          this.saved = true;
          this.error = false;
          this.successMsg = res.data.message;
          this.getUsers();
          console.log(res.data.message);
        }
      });
    } catch (error) {
      console.log(error.response);
      this.sending = false;
      this.saved = false;
      this.error = true;
      this.errMesssage = error.response
        ? error.response.data.message
        : "Network Connection seems slow.";
    }
  };

  removeStaff = (adminId) => {
    this.loading = false;
    try {
      backend.delete(`admins/remove/${adminId}`).then((res) => {
        if (res.data.status) {
          this.loading = false;
          this.error = false;
          this.successMsg = res.data.message;
          this.getUsers();
        }
      });
    } catch (error) {
      console.log(error.response);
      this.loading = false;
      this.error = true;
      this.errMesssage = error.response
        ? error.response.data.message
        : "Network Connection seems slow.";
    }
  };

  editStaff = (data) => {
    this.loading = false;
    this.saved = false;
    try {
      backend.put("admins", data).then((res) => {
        this.loading = false;
        if (res.data.status) {
          this.saved = true;
          this.error = false;
          this.successMsg = res.data.message;
          this.getUsers();
        }
      });
    } catch (error) {
      console.log(error.response);
      this.loading = false;
      this.error = true;
      this.saved = false;
      this.errMesssage = error.response
        ? error.response.data.message
        : "Network Connection seems slow.";
    }
  };

  resetProperty = (key, value) => {
    this[key] = value;
  };
  resetAction = () => {
    this.errMesssage = "";
    this.successMsg = "";
    this.onError = false;
    this.onSuccess = false;
    this.loading = false;
  };
}

export default User;
