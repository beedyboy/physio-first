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
    try {
       backend.post("auth/recovery-reset", data).then((res) => {
      this.sending = false;
      if (res.status === 201) {
        this.message = res.data.message;
        this.link = res.data.link;
        this.requestSent = true;
      }
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        console.log("error in axios catch");
        this.message = res.data.error;
        this.error = true;
      } else {
        console.log({err});
      }
    })
    } catch (error) {
      this.sending = false;
      if (error.response && error.response.status === 401) {
        console.log("There was a problem with the server");
        this.message = res.data.error;
        this.error = true;

      } else {
        console.log(error);
      }
    }
   
  };

  resetPasswordNow = (data) => {
    this.sending = true;
    this.error = false;
    this.passwordChanged = false;
    try {
       backend.put("auth/recovery-reset", data).then((res) => {
      this.sending = false;
      if (res.data.status === 201) {
        this.message = res.data.message;
        this.passwordChanged = true;
      }
    }).catch((err) => {
      if (err.response && err.response.status === 401) {
        console.log("error in axios catch");
        this.message = res.data.error;
        this.error = true;
      } else {
        console.log({err});
      }
    })
    } catch (error) {
      this.sending = false;
      if (error.response && error.response.status === 401) {
        console.log("There was a problem with the server");
        this.message = res.data.error;
        this.error = true;

      } else {
        console.log(error);
      }
    }
   
  };

  login = (data) => {
    this.sending = true;
    this.error = false;
    this.isAuthenticated = false;
try {
  backend.post("auth/login", data).then((res) => {
    this.sending = false;
    if (res.status === 201) {
      // console.log(res.data.acl)
      Utility.save("name", res.data.lastname + " "+ res.data.firstname);
      Utility.save("staff_token", res.data.token);
      Utility.save("acl", JSON.stringify(res.data.acl));
      this.message = res.data.message;
      this.isAuthenticated = true;
    } else {
     
      this.message = res.data.error;
      this.isAuthenticated = false;
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
  resetProperty = (key, value) => {
    this[key] = value;
  };
}

export default AuthStore;
