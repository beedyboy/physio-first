import { makeObservable, observable, action, computed } from "mobx";
import backend from "../services/APIService";

class Director {
  director = [];
  error = false;
  exist = false;
  saved = false;
  loading = false;
  removed = false;
  sending = false;
  checking = false;
  message = "";
  errMessage = "";
  directors = [];
  action = null;

  constructor() {
    makeObservable(this, {
      message: observable,
      errMessage: observable,
      action: observable,
      director: observable,
      sending: observable,
      removed: observable,
      checking: observable,
      error: observable,
      exist: observable,
      saved: observable,
      directors: observable,
      createDirector: action,
      updateDirector: action,
      fetchDirector: action,
      getDirectorById: action,
      removeDirector: action,
      toggleDirector: action,
      confirmDirector: action,
      resetProperty: action,
      totalDirector: computed,
      info: computed,
    });
  }

  setFilter = (data) => {
    this.filter = data;
  };

  toggleClose = () => {
    this.close = false;
  };

  fetchDirector = () => {
    this.loading = true;
    backend.get("director").then((res) => {
      this.directors = res.data;
      this.loading = false;
    });
  };

  confirmDirector = (cat, branch, name) => {
    try {
      backend.get("director/" + cat + "/" + branch + "/" + name).then((res) => {
        this.exist = res.data.exist;
      });
    } catch (error) {
      console.log(error);
    }
  };
  toggleDirector = (data) => {
    backend.post("director/toggle", data).then((res) => {
      if (res.status === 200) {
        this.fetchDirector();
      }
    });
  };

  createDirector = (data) => {
    try {
      this.sending = true;
      backend
        .post("director", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.sending = false;
          if (res.status === 201) {
            this.fetchDirector();
            this.message = res.data.message;
            this.action = "newDirector";
            this.saved = true;
          } else {
            this.action = "newDirectorError";
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
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  getDirectorById = (id) => {
    try {
      this.loading = true;
      backend
        .get("director/" + id)
        .then((res) => {
          this.loading = false;
          if (res.status === 500) {
            // Utility.logout();
          } else if (res.status === 200) {
            this.director = res.data.data;
          }
        })
        .catch((err) => {
          console.log("getDirectorById", err.code);
          console.log("getDirectorById", err.message);
          console.log("getDirectorById", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };
  updateDirector = (data) => {
    this.sending = true;
    backend
      .put("director", data)
      .then((res) => {
        this.sending = false;

        if (res.status === 201) {
          this.fetchDirector();
          this.message = res.data.message;
          this.action = "newDirector";
          this.saved = true;
        } else {
          this.action = "newDirectorError";
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
  };
  removeDirector = (id) => {
    this.removed = false;
    backend.delete("director/" + id).then((res) => {
      if (res.status === 200) {
        this.fetchDirector();
        this.message = res.data.message;
        this.removed = true;
      } else {
        this.message = res.data.error;
        this.error = true;
        this.removed = false;
      }
    });
  };

  resetProperty = (key, value) => {
    this[key] = value;
  };
  get info() {
    return Object.keys(this.directors || {}).map((key) => ({
      ...this.directors[key],
      uid: key,
    }));
  }
  get totalDirector() {
    return this.directors.length;
  }
}

export default Director;
