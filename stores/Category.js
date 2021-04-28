import { makeObservable, observable, action, computed } from "mobx";  
import backend from "../services/APIService"; 
class category {
  error = false; 
  exist = false;
  saved = false;
  loading = false;
  removed = false;
  sending = false;
  checking = false; 
  category = [];
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
      categorySelect: computed,
      loading: observable,
      category: observable,
      confirmName: action,
      createCategory: action,
      updateCategory: action,
      removeCategory: action,
      resetProperty: action,
    });
  }

  getCategories = () => {
    this.loading = true;
    backend.get("category").then((res) => {
      this.category = res.data;
      this.loading = false;
    });
  };
  confirmName = (category) => { 
    try {
      this.checking = true;
      this.exist = false;
      backend.get(`category/${category}`).then((res) => {
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
  createCategory = (data) => {
    try {
      this.sending = true;
      backend.post("category", data).then((res) => {
        this.sending = false;
        if (res.status === 201) {
          this.getCategories();
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

  updateCategory = (data) => {
    try {
      this.sending = true;
      backend.put("category", data).then((res) => {
        this.sending = false;
        if (res.status === 200) {
          this.getCategories();
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
  removeCategory = (category) => {
    try {
      this.removed = false;
      backend.delete(`category/${category}`).then((res) => {
        if (res.status === 200) {
          this.getCategories();
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
    return Object.keys(this.category || {}).map((key) => ({
      ...this.category[key],
      uid: key,
    }));
  }
  get stats() {
    return this.category.length;
  }
  get categorySelect() {
    return Object.keys(this.category || {}).map((key) => ({
      value: this.category[key]._id,
      label: this.category[key].name,
    }));
  }
}

export default category;
