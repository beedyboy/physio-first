import { makeObservable, observable, action, computed } from "mobx";
import backend from "../services/APIService";
class Vacation {
  error = false;
  saved = false;
  loading = false;
  sending = false;
  application = [];
  history = [];
  applications = [];
  myApplications = [];
  message = "";

  constructor() {
    makeObservable(this, {
      message: observable,
      sending: observable,
      error: observable,
      application: observable,
      applications: observable,
      history: observable,
      myApplications: observable,
      createVacation: action,
      getApplications: action,
      getMyApplications: action,
      getApplicationById: action,
      resetProperty: action,
    });
  }

  getMyApplications = () => {
    this.loading = true;
    backend.get("vacation").then((res) => {
      this.vacations = res.data;
      this.loading = false;
    });
  };

  getApplications = () => {
    this.loading = true;
    backend.get(" vacation").then((res) => {
      this.applications = res.data;
      this.loading = false;
    });
  };

  createVacation = (data) => {
    try {
      this.sending = true;
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
      if (err.response.status === 500) {
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
        .get("vacation/" + id)
        .then((res) => {
          this.loading = false;
          if (res.data.status === 500) {
            Utility.logout();
          } else if (res.data.status === 200) {
            this.application = res.data.data[0];
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

  resetProperty = (key, value) => {
    this[key] = value;
  };
  get info() {
    return Object.keys(this.vacation || {}).map((key) => ({
      ...this.vacation[key],
      uid: key,
    }));
  }
  get stats() {
    return this.vacation.length;
  }
}

export default Vacation;
