import { makeObservable, observable, action, computed } from "mobx";
import backend from "../services/APIService";

class Conversation {
  error = false;
  saved = false;
  removed = false;
  deleting = false;
  sending = false;
  loading = false;
  conversations = [];

  constructor() {
    makeObservable(this, {
      message: observable,
      sending: observable,
      removed: observable,
      checking: observable,
      deleting: observable,
      sending: observable,
      error: observable,
      allConversations: computed,
      loading: observable,
      conversations: observable,
      createConversation: action,
      updateConversation: action,
      removeConversation: action,
      resetProperty: action,
    });
  }

  createConversation = (data) => {
    try {
      this.sending = true;
      backend
        .post("conversation", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 201) {
            this.fetchConversation(data.ticket);
            this.message = res.data.message;
            this.saved = true;
          } else {
            this.message = res.data.error;
            this.error = true;
          }
        })
        .catch((err) => {
          console.log("save_conversation", err.code);
          console.log("save_conversation", err.message);
          console.log("save_conversation", err.stack);
        });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };
  updateConversation = (data) => {
    try {
      this.sending = true;
      backend
        .put("conversation", data)
        .then((res) => {
          this.sending = false;
          if (res.status === 201) {
            this.fetchConversation(data.ticket);
            this.message = res.data.message;
            this.saved = true;
          } else {
            this.message = res.data.error;
            this.error = true;
          }
        })
        .catch((err) => {
          console.log("save_conversation", err.code);
          console.log("save_conversation", err.message);
          console.log("save_conversation", err.stack);
        });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  fetchConversation = (id) => {
    try {
      this.loading = true;
      backend
        .get("conversation/" + id)
        .then((res) => {
          this.loading = false;
          if (res.data.status === 500) {
            // Utility.logout();
          } else if (res.data.status === 200) {
            this.conversations = res.data;
          }
        })
        .catch((err) => {
          console.log("my_conversation", err.code);
          console.log("my_conversation", err.message);
          console.log("my_conversation", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };

  removeConversation = (ticket, id) => {
    this.deleting = true;
    backend
      .delete("conversation/" + id)
      .then((res) => {
        this.deleting = false;
        if (res.status === 200) {
          this.fetchConversation(ticket);
          this.message = res.data.message;
        }
      })
      .catch((err) => {
        console.log("remove_conversation", err.code);
        console.log("remove_conversation", err.message);
        console.log("remove_conversation", err.stack);
      });
  };

  resetProperty = (key, value) => {
    this[key] = value;
  };
  get allConversations() {
    return Object.keys(this.conversations || {}).map((key) => ({
      ...this.conversations[key],
      uid: key,
    }));
  }
}

export default Conversation;
