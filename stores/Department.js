import { makeObservable, observable, action, computed } from "mobx";
import backend from "../services/APIService";
class department {
  error = false;
  exist = false;
  saved = false;
  loading = false;
  removed = false;
  sending = false;
  checking = false;
  department = [];
  message = "";

  constructor() {
    makeObservable(this, {
      message: observable,
      sending: observable,
      removed: observable,
      checking: observable,
      error: observable,
      exist: observable,
      info: computed,
      stats: computed,
      departmentSelect: computed,
      loading: observable,
      department: observable,
      confirmName: action,
      createDepartment: action,
      updateDepartment: action,
      removeDepartment: action,
      resetProperty: action,
    });
  }

  getDepartments = () => {
    this.loading = true;
    backend.get("department").then((res) => {
      this.department = res.data;
      this.loading = false;
    });
  };
  confirmName = (department) => {
    try {
      this.checking = true;
      this.exist = false;
      backend.get(`department/${department}`).then((res) => {
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
  createDepartment = (data) => {
    try {
      this.sending = true;
      backend.post("department", data).then((res) => {
        this.sending = false;
        if (res.status === 201) {
          this.getDepartments();
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

  updateDepartment = (data) => {
    try {
      this.sending = true;
      backend
        .put("department", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 200) {
            this.getDepartments();
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
  removeDepartment = (department) => {
    try {
      this.removed = false;
      backend.delete(`department/${department}`).then((res) => {
        if (res.status === 200) {
          this.getDepartments();
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
    return Object.keys(this.department || {}).map((key) => ({
      ...this.department[key],
      uid: key,
    }));
  }
  get stats() {
    return this.department.length;
  }
  get departmentSelect() {
    return Object.keys(this.department || {}).map((key) => ({
      value: this.department[key]._id,
      label: this.department[key].name,
    }));
  }
}

export default department;
