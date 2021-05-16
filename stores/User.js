import { makeObservable, observable, action, computed } from "mobx";
import backend from "../services/APIService";

class User {
  user = [];
  error = false;
  exist = false;
  saved = false;
  profileLoading = false;
  loading = false;
  removed = false;
  sending = false;
  checking = false;
  message = "";
  errMessage = "";
  myProfile = [];
  profile = [];
  users = [];
  action = null;

  constructor() {
    makeObservable(this, {
      message: observable,
      errMessage: observable,
      action: observable,
      user: observable,
      myProfile: observable,
      profile: observable,
      sending: observable,
      removed: observable,
      profileLoading: observable,
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
      getProfile: action,
      signStory: action,
      updateProfile: action,
      resetProperty: action,
      confirmEmail: action,
      onBoardStaff: action,
      setRole: action,
      stats: computed
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
          console.log({ err });
          this.loading = false;
          this.error = true;
          this.message = err.response
            ? "failed to load users"
            : "Network Connection seems slow.";
        });
    } catch (error) {
      console.log({ error });
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
      backend
        .post("account", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 201) {
            this.getUsers();
            this.message = res.data.message;
            this.action = "newStaff";
            this.saved = true;
          } else {
            this.action = "newStaffError";
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

  updateStaff = (data) => {
    try {
      this.sending = true;
      backend
        .put("account", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 200) {
            this.action = "newStaff";
            this.getUsers();
            this.message = res.data.message;
            this.saved = true;
          } else {
            this.action = "newStaffError";
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
            this.action = "hasRole";
            this.saved = true;
          } else {
            this.action = "hasRoleError";
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

  onBoardStaff = (data) => {
    try {
      this.sending = true;
      backend
        .put("account/onboard", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 200) {
            this.getUsers();
            this.message = res.data.message;
            this.action = "onBoard";
            this.saved = true;
          } else {
            this.action = "onBoardError";
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

  setLogin = (data) => {
    try {
      this.sending = true;
      backend
        .put("account/auth", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 200) {
            this.getUsers();
            this.message = res.data.message;
            this.action = "hasLogin";
            this.saved = true;
          } else {
            this.action = "hasLoginError";
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
    backend
      .post("account/profile", data)
      .then((res) => {
        this.sending = false;
        if (res.status === 200) {
          this.getProfile();
          this.message = res.data.message;
          this.action = "signed";
        } else {
          this.errMessage = res.data.message;
        }
      })
      .catch((err) => {
        this.profileLoading = false;
        this.error = true;
        if (err && err.response && err.response.status === 401) {
          this.message = err.response.data.error;
          this.action = "logout";
        } else {
          this.message = "Network Connection seems slow.";
        }
      });
  };

  getProfile = () => {
    this.profileLoading = true;
    try {
      backend
        .get("account/profile")
        .then((res) => {
          if (res.status === 200) {
            this.myProfile = res.data;
            this.profileLoading = false;
          }
        })
        .catch((err) => {
          this.profileLoading = false;
          this.error = true;
          if (err && err.response && err.response.status === 401) {
            this.errMessage = err.response.data.error;
            this.action = "logout";
          } else {
            this.message = "Network Connection seems slow.";
          }
        });
    } catch (error) {}
  };
 

  getProfileById = (id) => {
    this.profileLoading = true;
    try {
      backend
        .get(`account/staff/${id}`)
        .then((res) => {
          if (res.status === 200) {
            this.profile = res.data;
            this.profileLoading = false;
          }
        })
        .catch((err) => {
          this.profileLoading = false;
          this.error = true;
          if (err && err.response && err.response.status === 401) {
            this.errMessage = err.response.data.error;
            this.action = "logout";
          } else {
            this.message = "Network Connection seems slow.";
          }
        });
    } catch (error) {}
  };
 

  updateProfile = (data) => {
    this.sending = true;
    backend
      .put("account/profile", data)
      .then((res) => {
        this.sending = false;
        if (res.status === 200) {
          this.getProfile();
          this.message = res.data.message;
          this.action = "updateProfile";
        } else {
          this.message = res.data.error;
          this.action = "profileUpdateError";
          this.error = true;
        }
      })
      .catch((err) => {
        this.profileLoading = false;
        this.error = true;
        if (err && err.response && err.response.status === 422) {
          this.message = err.response.data.error;
          this.action = "profileUpdateError";
        } else {
          this.message = "Network Connection seems slow.";
        }
      });
  };
  get stats() {
    return this.users.length;
  }
  resetProperty = (key, value) => {
    this[key] = value;
  };
}

export default User;
