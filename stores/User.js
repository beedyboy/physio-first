import { makeObservable, observable, action } from "mobx";
import backend from "../services/APIService";
// import Utility from "../services/UtilityService";

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
  action = null;


  constructor() {
    makeObservable(this, {
      message: observable,
      action: observable, 
      user: observable, 
      sending: observable,
      removed: observable,
      checking: observable,
      error: observable,
      exist: observable,
      saved: observable,
      users: observable,
      setLogin: action, 
      addStaff: action,
      getUsers: action,
      removeStaff: action,
      updateStaff: action,
      resetProperty: action,
      confirmEmail: action,
      setRole: action, 
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
 
 
  addStaff = (data) => {
    try {
      this.sending = true;
      backend.post("account", data).then((res) => {
        this.sending = false;
        if (res.status === 201) {
          this.getUsers();
          this.message = res.data.message; 
          this.action = "newStaff"
          this.saved = true;
        } else {
          this.action = "newStaffError"
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
            this.action = "newStaff"
            this.getUsers();
            this.message = res.data.message;
            this.saved = true;
          } else {
            this.action = "newStaffError"
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
            this.action = "hasRole"
            this.saved = true;
          } else {
            this.action = "hasRoleError"
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

  setLogin= (data) => {
    try { 
      this.sending = true;
      backend
        .put("account/auth", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 200) {
            this.getUsers();
            this.message = res.data.message;
            this.action = "hasLogin"
            this.saved = true;
          } else {
            this.action = "hasLoginError"
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
  signStory = (data) => {
    this.sending = true;
    backend.post("user/update/signature", data).then((res) => {
      this.sending = false;
      if (res.data.status === 200) {
        this.action = "signed"
        this.getProfile();
        this.message  = res.data.message
      } else {
        this.errMessage  = res.data.message
      }
    });
  };

  getProfile = () => {
    backend.get("user/get/profile/").then((res) => {
      if (res.data.status === 200) {
        this.profiles = res.data.data;
      }
    });
  };

  getProfileById = (id) => {
    backend.get("user/profile/" + id).then((res) => {
      if (res.data.status === 200) {
        this.profile = res.data.data; 
      }
    });
  };

  updateProfile = (data) => {
    this.sending = true;
    backend.post("user/update/profile", data).then((res) => {
      this.sending = false;
      if (res.data.status === 200) {
        this.getProfile();
       this.message = res.data.message
      } else {
        this.message = res.data.error
      }
    });
  };
  resetProperty = (key, value) => {
    this[key] = value;
  };
}

export default User;
