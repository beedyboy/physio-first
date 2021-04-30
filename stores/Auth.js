import { makeObservable, observable, action, computed } from "mobx";
import backend from "../services/APIService";
import Utility from "../.next/static/chunks/pages/admin";

class AuthStore {
  error = null;
  message = "";
  action = "";
  link = "";
  errMessage = "";
  sending = false;
  requestSent = false;
  passwordChanged = false;
  close = false;
  action = null;

  constructor() {
    makeObservable(this, {
      action: observable,
      error: observable,
      requestSent: observable,
      passwordChanged: observable,
      sending: observable,
      message: observable,
      link: observable,
      errMessage: observable,
      action: observable,
      requestInstruction: action,
      resetProperty: action,
      resetPasswordNow: action,
    });
  }

  requestInstruction = (data) => {
    this.sending = true;
    this.error = false;
    this.requestSent = false;
    backend.post("auth/reset-request", data).then((res) => {
      this.sending = false;
      if (res.data.status === 200) {
        this.message = res.data.message;
        this.link = res.data.link;
        this.requestSent = true;
      }
    });
  };

  resetPasswordNow = (data) => {
    this.sending = true;
    this.error = false;
    this.passwordChanged = false;
    backend.post("auth/reset-password", data).then((res) => {
      this.sending = false;
      if (res.data.status === 200) {
        this.message = res.data.message;
        this.passwordChanged = true;
      }
    });
  };

  login = (Admin) => {
    this.sending = true;
    this.error = null;
    backend.post("auth/login", Admin).then((res) => {
      this.sending = false;
      if (res.data.status === 200) {
        Utility.save("name", res.data.staff[0].lastname);
        Utility.save("staff_token", res.data.token);
        Utility.save("acl", res.data.staff[0].acl);
        this.isAuthenticated = true;
      } else {
        Beedy("error", res.data.msg);
      }
    });
  };
  resetProperty = (key, value) => {
    this[key] = value;
  };
}

export default AuthStore;
