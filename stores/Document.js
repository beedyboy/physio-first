import { makeObservable, observable, action, computed } from "mobx";
import backend from "../services/APIService";

class Document {
  document = [];
  error = false; 
  saved = false;
  loading = false;
  removed = false;
  sending = false; 
  message = "";
  errMessage = "";
  documents = [];
  action = null;

  constructor() {
    makeObservable(this, {
      message: observable,
      errMessage: observable,
      action: observable,
      document: observable,
      sending: observable,
      removed: observable, 
      error: observable, 
      saved: observable,
      documents: observable,
      createDocument: action,
      updateDocument: action,
      fetchDocument: action,
      getDocumentById: action,
      removeDocument: action, 
      resetProperty: action,
      totalDocument: computed,
      info: computed,
    });
  }
 
  fetchDocument = () => {
    this.loading = true;
    try {
      backend
        .get("document")
        .then((res) => {
          this.loading = false;
          if (res.status === 200) {
            this.error = false;
            this.documents = res.data;
          }
        })
        .catch((err) => {
          console.log({ err });
          this.loading = false;
          this.error = true;
          this.message = err.response
            ? "failed to load users"
            : "Network Connection seems slow.";
        });
    } catch (error) {
      console.log({ error });
      console.log(error.response);
    }
  };
 

  createDocument = (data) => {
    try {
      this.sending = true;
      backend
        .post("document", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 201) {
            this.fetchDocument();
            this.message = res.data.message;
            this.action = "newDocument";
            this.saved = true;
          } else {
            this.action = "newDocumentError";
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

  getDocumentById = (id) => {
    try {
      this.loading = true;
      backend
        .get("document/" + id)
        .then((res) => {
          this.loading = false;
          if (res.status === 500) {
            // Utility.logout();
          } else if (res.status === 200) {
            this.document = res.data.data;
          }
        })
        .catch((err) => {
          console.log("getDocumentById", err.code);
          console.log("getDocumentById", err.message);
          console.log("getDocumentById", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };
  updateDocument = (data) => {
    this.sending = true;
    backend
      .put("document", data)
      .then((res) => {
        this.sending = false;

        if (res.status === 201) {
          this.fetchDocument();
          this.message = res.data.message;
          this.action = "newDocument";
          this.saved = true;
        } else {
          this.action = "newDocumentError";
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
  removeDocument = (id) => {
    this.removed = false;
    backend.delete("document/" + id).then((res) => {
      if (res.status === 200) {
        this.fetchDocument();
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
    return Object.keys(this.documents || {}).map((key) => ({
      ...this.documents[key],
      uid: key,
    }));
  }
  get totalDocument() {
    return this.documents.length;
  }
}

export default Document;
