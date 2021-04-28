import { makeObservable, observable, action, computed } from "mobx";
import backend from "../services/APIService";
class Marketing {
  error = false; 
  saved = false;
  loading = false;
  removed = false;
  sending = false; 
  links = [];
  message = "";

  constructor() {
    makeObservable(this, {
      message: observable,
      sending: observable,
      removed: observable, 
      error: observable, 
      info: computed,
      stats: computed, 
      loading: observable,
      links: observable, 
      addLink: action,
      updateLink: action,
      deleteLink: action,
      resetProperty: action,
    });
  }

  getLinks = () => {
    this.loading = true;
    backend.get("marketing").then((res) => {
      this.links = res.data;
      this.loading = false;
    });
  };
 
  addLink = (data) => {
    try {
      this.sending = true;
      backend.post("marketing", data).then((res) => {
        this.sending = false;
        if (res.status === 201) {
          this.getLinks();
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

  updateLink = (data) => {
    try {
      this.sending = true;
      backend
        .put("marketing", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 200) {
            this.getLinks();
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
  deleteLink = (id) => {
    try {
      this.removed = false;
      backend.delete(`marketing/${id}`).then((res) => {
        if (res.status === 200) {
          this.getLinks();
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
    return Object.keys(this.links || {}).map((key) => ({
      ...this.links[key],
      uid: key,
    }));
  }
  get stats() {
    return this.links.length;
  } 
}

export default Marketing;
