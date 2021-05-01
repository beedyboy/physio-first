import { makeObservable, observable, action, computed } from "mobx";
import backend from "../services/APIService";
import Utility from "../services/UtilityService";
class Vacation {
  error = false;
  saved = false;
  removed = false;
  loading = false;
  sending = false;
  application = [];
  history = [];
  applications = [];
  myApplications = [];
  message = "";
  action = "";

  constructor() {
    makeObservable(this, {
      saved: observable,
      error: observable,
      message: observable,
      sending: observable,
      action: observable,
      loading: observable,
      removed: observable,
      history: observable,
      application: observable,
      applications: observable,
      myApplications: observable,
      createVacation: action,
      getApplications: action,
      getMyApplications: action,
      getApplicationById: action,
      adminUpdate: action,
      delVacation: action,
      resetProperty: action,
      pendingApplications: computed,
      approvedApplications: computed,
      rejectedApplications: computed,
    });
  }

  getMyApplications = () => {
    this.loading = true;
    backend.get("vacation").then((res) => {
      console.log(res.data);
      this.myApplications = res.data;
      this.loading = false;
    });
  };

  getApplications = () => {
    this.loading = true;
    backend.get("application").then((res) => {
      this.applications = res.data;
      this.loading = false;
    });
  };

  createVacation = (data) => {
    try {
      this.sending = true;
      this.action = "";
      backend.post("vacation", data).then((res) => {
        this.sending = false;
        if (res.status === 201) {
          this.getMyApplications();
          this.message = res.data.message;
          this.saved = true;
        } else {
          this.message = res.data.error;
          this.error = true;
        }
      });
    } catch (err) {
      if (err.response && err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  getApplicationById = (id) => {
    try {
      this.loading = true;
      backend
        .get("application/" + id)
        .then((res) => {
          this.loading = false;
          if (res.data.status === 500) {
            Utility.logout();
          } else if (res.status === 200) {
            this.application = res.data[0];
          }
        })
        .catch((err) => {
          console.log("getApplicationById", err.code);
          console.log("getApplicationById", err.message);
          console.log("getApplicationById", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };

  adminUpdate = (data) => {
    try {
      this.sending = true;
      this.action = "";
      backend.put("application", data).then((res) => {
        this.sending = false;
        if (res.status === 200) {
          this.getMyApplications();
          this.message = res.data.message;
          this.action = "adminUpdate";
          this.saved = true;
        } else {
          this.message = res.data.error;
          this.error = true;
        }
      });
    } catch (err) {
      if (err.response && err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  delVacation = (id) => {
    try {
      this.removed = false;
      backend.delete(`application/${id}`).then((res) => {
        if (res.status === 200) {
          this.getApplications();
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
  resetProperty = (key, value) => {
    this[key] = value;
  };
  get info() {
    return Object.keys(this.vacation || {}).map((key) => ({
      ...this.vacation[key],
      uid: key,
    }));
  }
  get pendingApplications() {
    return this.applications.filter((d) => d.status === "Pending");
  }
  get approvedApplications() {
    return this.applications.filter((d) => d.status === "Accepted");
  }
  get rejectedApplications() {
    return this.applications.filter((d) => d.status === "Rejected");
  }
  get stats() {
    return this.vacation.length;
  }
}

export default Vacation;
