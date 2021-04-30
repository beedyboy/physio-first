import { makeObservable, observable, action } from "mobx";
import backend from "../services/APIService"; 
import Utility from "../services/UtilityService";

class AuthStore {
  error = null;
  message = "";
  action = "";
  link = "";
  errMessage = "";
  sending = false;
  requestSent = false;
  passwordChanged = false;
  isAuthenticated = false;
  action = null;

  constructor() {
    makeObservable(this, {
      action: observable,
      error: observable,
      isAuthenticated: observable,
      requestSent: observable,
      passwordChanged: observable,
      sending: observable,
      message: observable,
      link: observable,
      errMessage: observable,
      action: observable,
      login: action,
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

  login = (data) => {
    this.sending = true;
    this.error = null;
    backend.post("auth/login", data).then((res) => {
      this.sending = false;
      if (res.status === 201) {
        Utility.save("name", res.data.user.lastname);
        Utility.save("staff_token", res.data.token);
        Utility.save("acl", res.data.user.acl);
        this.message = res.data.message;
        this.isAuthenticated = true;
      } else {
       
        this.message = res.data.error;
      }
    });
  };
  resetProperty = (key, value) => {
    this[key] = value;
  };
}

export default AuthStore;
