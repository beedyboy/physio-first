import { makeObservable, observable, runInAction, action, computed } from "mobx";
import backend from "../services/APIService";
import Utility from "../services/UtilityService"; 
class Exeat {
  error = false;
  saved = false;
  removed = false;
  fetching = false;
  loading = false;
  sending = false; 
  bereavementHistory = [];
  sickHistory = [];
  message = "";
  action = "";

  constructor() {
    makeObservable(this, {
      saved: observable,
      error: observable,
      message: observable,
      sending: observable,
      action: observable,
      fetching: observable,
      loading: observable,
      removed: observable, 
      bereavementHistory: observable,
      sickHistory: observable, 
      createExeat: action, 
      getExeatByType: action,
      updateExeat: action,
      delExeat: action,
      resetProperty: action, 
    });
  }
 
 

  createExeat = (data) => {
    try {
      this.sending = true;
      this.action = "";
      backend.post("exeat", data).then((res) => {
        this.sending = false;
        if (res.status === 201) {
          this.message = res.data.message;
          this.saved = true;
          this.getExeatByType(data.staffId, data.leave, data.leave === "Sick" ? 'sickHistory': 'bereavementHistory');
        } else {
          this.message = res.data.error;
          this.error = true;
        }
      }).catch((error) => { 
        this.sending = false; 
        if (error && error.response) {
          console.log("status", err.response.status);
        }
      })
    } catch (err) {
      this.sending = false;
      if (err && err.response && err.response.status === 400) {
        this.message = err.response.data.error;
        this.error = true;  
      } 
      if (err && err.response && err.response.status === 401) {
        this.message = err.response.data.error;
        this.error = true;
        this.action = "logout";
      } 
      if (err.response && err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  getExeatByType = (id, key, field) => {
    console.log(id, key, field)
    try {
      this.loading = true;
      backend
        .get(`exeat/dynamic/${id}/${key}`)
        .then((res) => {
          this.loading = false;
          if (res.status === 500) {
            Utility.logout();
          } 
          else if (res.status === 422) {
           console.log({res})
          }
          else if (res.status === 200) {
            this[field] = res.data;
          }
        })
        .catch((err) => {
          console.log("getExeatByType code", err.code);
          console.log("getExeatByType", err.message);
          console.log("getExeatByType", err.stack);
        });
    } catch (e) {
      console.error('catch error', e);
    }
  }; 

  updateExeat = (data) => {
    try {
      this.sending = true;
      this.action = "";
      backend.put("exeat", data).then((res) => { 
        this.sending = false;
        if (res.status === 200) {
          this.message = res.data.message;
          this.saved = true;
          this.getExeatByType(data.staffId, data.leave, data.leave === "Sick" ? 'sickHistory': 'bereavementHistory');
            } else {
          this.message = res.data.error;
          this.error = true;
        }
      }).catch((error) => {
        this.sending = false;
        console.log({error})
      })
    } catch (err) {
      this.sending = false;
      console.log({err})
      if (err.response && err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  delExeat = (id) => {
    try {
      this.removed = false;
      backend.delete(`exeat/${id}`).then((res) => {
        if (res.status === 200) {
          this.getexeats();
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
    return Object.keys(this.Exeat || {}).map((key) => ({
      ...this.Exeat[key],
      uid: key,
    }));
  }  
}

export default Exeat;
