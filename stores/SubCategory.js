import { makeObservable, observable, action, computed } from "mobx";  
import backend from "../services/APIService"; 
class SubCategory {
  error = false; 
  exist = false;
  saved = false;
  loading = false;
  removed = false;
  sending = false;
  checking = false; 
  subcategory = [];
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
      subcategorySelect: computed,
      loading: observable,
      subcategory: observable,
      confirmRow: action,
      addSubCat: action,
      updateSubCat: action,
      removeCategory: action,
      resetProperty: action,
    });
  }

  getSubCategories = () => {
    this.loading = true;
    backend.get("subcategory").then((res) => {
      this.subcategory = res.data;
      this.loading = false;
    });
  };
  confirmRow = (subcategory) => { 
    try {
      this.checking = true;
      this.exist = false;
      backend.get(`subcategory/${subcategory}`).then((res) => {
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
      backend.post("subcategory", data).then((res) => {
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
      backend.put("subcategory", data).then((res) => {
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
  removeCategory = (id) => {
    try {
      this.removed = false;
      backend.delete(`subcategory/${id}`).then((res) => {
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
  get info() {
    return Object.keys(this.subcategory || {}).map((key) => ({
      ...this.subcategory[key],
      uid: key,
    }));
  }
  get stats() {
    return this.subcategory.length;
  }
  get subcategorySelect() {
    return Object.keys(this.subcategory || {}).map((key) => ({
      value: this.subcategory[key]._id,
      label: this.subcategory[key].name,
    }));
  }
}

export default SubCategory;
