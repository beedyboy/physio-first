import { makeObservable, observable, action, computed } from "mobx";
import backend from "../services/APIService";
class Leave {
  error = false;
  exist = false;
  saved = false;
  loading = false;
  removed = false;
  sending = false;
  checking = false;
  leaves = [];
  message = "";

  constructor() {
    makeObservable(this, {
      message: observable,
      sending: observable,
      removed: observable,
      saved: observable,
      checking: observable,
      error: observable,
      exist: observable,
      info: computed,
      stats: computed,
      categorySelect: computed,
      loading: observable,
      leaves: observable,
      confirmName: action,
      addLeave: action,
      updateLeave: action,
      removeLeave: action,
      resetProperty: action,
    });
  }

  getLeaves = () => {
    this.loading = true;
    backend.get("leave").then((res) => {
      this.leaves = res.data;
      this.loading = false;
    });
  };
  confirmName = (leave) => {
    try {
      this.checking = true;
      this.exist = false;
      backend.get(`leave/${leave}`).then((res) => {
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
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  addLeave = (data) => {
    try {
      this.sending = true;
      backend.post("leave", data).then((res) => {
        this.sending = false;
        if (res.status === 201) {
          this.getLeaves();
          this.message = res.data.message;
          this.saved = true;
        } else {
          this.message = res.data.error;
          this.error = true;
        }
      });
    } catch (err) {
      this.sending = false;
      if (err && err.response && (err.response.status === 401 || err.response.status === 500)) {
        this.message = err.response.data.error;
        this.error = true;
        console.log("There was a problem with the server");
        // this.action = "logout";
      } 
      else {
        console.log(err.response.data.msg);
      }
    }
  };

  updateLeave = (data) => {
    try {
      this.sending = true;
      backend
        .put("leave", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 200) {
            this.getLeaves();
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
    }  catch (err) {
      this.sending = false;
      if (err && err.response && (err.response.status === 401 || err.response.status === 500)) {
        this.message = err.response.data.error;
        this.error = true;
        console.log("There was a problem with the server");
        // this.action = "logout";
      } 
      else {
        console.log(err.response.data.msg);
      }
    }
  };
  removeLeave = (id) => {
    try {
      this.removed = false;
      backend.delete(`leave/${id}`).then((res) => {
        if (res.status === 200) {
          this.getLeaves();
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
    return Object.keys(this.leave || {}).map((key) => ({
      ...this.leave[key],
      uid: key,
    }));
  }
  get stats() {
    return this.leave.length;
  }
  get categorySelect() {
    return Object.keys(this.leave || {}).map((key) => ({
      value: this.leave[key]._id,
      label: this.leave[key].name,
    }));
  }
}

export default Leave;
