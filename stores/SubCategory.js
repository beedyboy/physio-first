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
  categorysubs = [];
  message = "";
 
  constructor() {
    makeObservable(this, {
      message: observable,
      sending: observable, 
      removed: observable, 
      checking: observable,  
      categorysubs: observable,  
      error: observable,
      exist: observable, 
      stats: computed,
      subcategorySelect: computed,
      loading: observable,
      subcategory: observable,
      confirmRow: action,
      addSubCat: action,
      getCategoryBySub: action,
      updateSubCat: action,
      deleteSubCat: action,
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
  confirmRow = (cat_id, sub_name) => { 
    try {
      this.checking = true;
      this.exist = false;
      const data = {
        cat_id,
        sub_name
      }
      backend.post(`subcategory/${sub_name}`, data).then((res) => {
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
  deleteSubCat = (id) => {
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

  getCategoryBySub = (id) => {
    try {
      this.loading = true;
      backend
        .get("subcategory/" + id)
        .then((res) => {
          this.loading = false;
          this.categorysubs = res.data;
        })
        .catch((err) => {
          console.log("my_subcategory", err.code);
          console.log("my_subcategory", err.message);
          console.log("my_subcategory", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };

  resetProperty = (key, value) => {
    this[key] = value;
  };
 
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
