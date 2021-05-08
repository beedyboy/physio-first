import { makeObservable, observable, action, computed } from "mobx";  
import backend from "../services/APIService"; 
class Asset {
  error = false; 
  exist = false;
  saved = false;
  loading = false;
  removed = false;
  sending = false;
  checking = false; 
  Asset = [];
  message = "";
 
  constructor() {
    makeObservable(this, {
      message: observable,
      sending: observable, 
      removed: observable, 
      checking: observable,  
      error: observable,
      exist: observable, 
      stats: computed,
      AssetSelect: computed,
      loading: observable,
      Asset: observable,
      confirmRow: action,
      addSubCat: action,
      updateSubCat: action,
      deleteSubCat: action,
      resetProperty: action,
    });
  }

  getSubCategories = () => {
    this.loading = true;
    backend.get("Asset").then((res) => {
      this.Asset = res.data;
      this.loading = false;
    });
  };
  confirmRow = (cat_id, sub_name) => { 
    try {
      this.checking = true;
      this.exist = false;
      const data = {
        cat_id,
        sub_name
      }
      backend.post(`Asset/${sub_name}`, data).then((res) => {
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
  addSubCat = (data) => {
    try {
      this.sending = true;
      backend.post("Asset", data).then((res) => {
        this.sending = false;
        if (res.status === 201) {
          this.getSubCategories();
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

  updateSubCat = (data) => {
    try {
      this.sending = true;
      backend.put("Asset", data).then((res) => {
        this.sending = false;
        if (res.status === 200) {
          this.getSubCategories();
          this.message = res.data.message;
          this.saved = true;
        } else {
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
  deleteSubCat = (id) => {
    try {
      this.removed = false;
      backend.delete(`Asset/${id}`).then((res) => {
        if (res.status === 200) {
          this.getSubCategories();
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
 
  get stats() {
    return this.Asset.length;
  }
  get AssetSelect() {
    return Object.keys(this.Asset || {}).map((key) => ({
      value: this.Asset[key]._id,
      label: this.Asset[key].name,
    }));
  }
}

export default Asset;
