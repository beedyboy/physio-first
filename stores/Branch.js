import { makeObservable, observable, action, computed } from "mobx";  
import backend from "../services/APIService"; 
class Branch {
  error = false; 
  exist = false;
  saved = false;
  loading = false;
  sending = false;
  checking = false; 
  branch = [];
  message = "";
 
  constructor() {
    makeObservable(this, {
      message: observable,
      sending: observable, 
      checking: observable,  
      error: observable,
      exist: observable,
      info: computed,
      stats: computed,
      branchSelect: computed,
      loading: observable,
      branch: observable,
      confirmName: action,
      createBranch: action,
      updateBranch: action,
      removeBranch: action,
      resetProperty: action,
    });
  }

  getBranches = () => {
    this.loading = true;
    backend.get("branch").then((res) => {
      this.branch = res.data;
      this.loading = false;
    });
  };
  confirmName = (data) => { 
    try {
      this.checking = true; 
      backend.post("confirm/branch", {name: data}).then((res) => {
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
  createBranch = (data) => {
    try {
      this.sending = true;
      backend.post("branch", data).then((res) => {
        this.sending = false;
        if (res.status === 201) {
          this.getBranches();
          this.message = res.data.message;
          this.saved = true;
        } else {
          this.sending = false;
          this.message = res.data.error;
          this.error = true;
        }
      });
    } catch (err) {
      this.sending = false;
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  updateBranch = (branch) => {
    try {
      this.sending = true;
      backend.put(`branch`, branch).then((res) => {
        this.sending = false;
        if (res.status === 200) {
          this.getBranches();
          this.message = res.data.message;
          this.saved = true;
        } else {
          this.sending = false;
          this.message = res.data.error;
          this.error = true;
        }
      }).catch((err) => {
        this.sending = false;
        console.log({err});
      if(err && err.response) {
      console.log('status', err.response.status)
      }
      })
    } catch (error) {
      
      this.sending = false;
      console.log({error});
    }
  };
  removeBranch = (id) => {
    try {
      backend.delete(`branch/${id}`).then((res) => {
        if (res.status === 200) {
          this.getBranches();
          this.message = res.data.message;
        } else {
          this.message = res.data.error;
          this.error = true;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  resetProperty = (key, value) => {
    this[key] = value;
  };
  get info() {
    return Object.keys(this.branch || {}).map((key) => ({
      ...this.branch[key],
      uid: key,
    }));
  }
  get stats() {
    return this.branch.length;
  }
  get branchSelect() {
    return Object.keys(this.branch || {}).map((key) => ({
      value: this.branch[key]._id,
      label: this.branch[key].name,
    }));
  }
}

export default Branch;
