import { makeObservable, observable, action, computed } from "mobx";
import backend from "../services/APIService";
class Ticket {
  error = false;
  close = false;
  exist = false;
  loading = false;
  deleting = false;
  sending = false;
  saved = false;
  removed = false;
  ticket = [];
  tickets = [];
  staffTickets = [];
  message = "";

  constructor() {
    makeObservable(this, {
      message: observable,
      sending: observable,
      removed: observable,
      deleting: observable,
      saved: observable, 
      error: observable, 
      info: computed,  
      saved: observable,
      ticket: observable,
      staffTickets: observable,
      myTickets: computed,
      loading: observable,
      tickets: observable,
      fetchTicket: action,
      fetchMyTicket: action,
      assignTicket: action,
      addTicket: action,
      updateTicket: action,
      getTicketById: action,
      removeTicket: action, 
      resetProperty: action,
    });
  }
  fetchTicket = () => {
    this.loading = true;
    backend.get("ticket").then((res) => {
      // console.log(res.data)
      this.tickets = res.data;
      this.loading = false;
    });
  };
  fetchMyTicket = () => {
    this.loading = true;
    backend.get("ticket/myticket").then((res) => {
      this.staffTickets = res.data;
      this.loading = false;
    });
  };
  addTicket = (data) => {
    try {
      this.sending = true;
      backend.post("ticket/myticket", data).then((res) => {
        this.sending = false;
        if (res.status === 201) { 
          this.fetchMyTicket();
         this.message = res.data.message; 
          this.saved = true;
        } else {
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

  updateTicket = (data) => {
    try {
      this.sending = true;
      backend.post("ticket", data).then((res) => {
        this.sending = false;
        if (res.status === 200) {
          this.fetchTicket();
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

  getTicketById = (id) => {
    try {
      this.loading = true;
      backend
        .get("ticket/" + id)
        .then((res) => {
          this.loading = false;
          if (res.data === 500) {
            // Utility.logout();
          } else if (res.status === 200) {
            this.ticket = res.data;
          }
        })
        .catch((err) => {
          console.log("getProductById", err.code);
          console.log("getProductById", err.message);
          console.log("getProductById", err.stack);
        });
    } catch (e) {
      console.error(e);
    }
  };
  assignTicket = (data) => {
    try {
      this.sending = true;
      backend.post("ticket/assign", data).then((res) => {
        this.sending = false;
        if (res.status === 200) {
          this.fetchTicket();
         this.message = res.data.message;
         
        } else {
         this.message = res.data.error;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  toggleStatus = (data) => {
    try {
      this.sending = true;
      backend.post("ticket/status", data).then((res) => {
        this.sending = false;
        if (res.status === 200) {
          this.fetchTicket();
         this.message = res.data.message;
         
        } else {
         this.message = res.data.error;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  removeTicket = (id) => {
    try {
      this.deleting = true;
      backend.delete("ticket/" + id).then((res) => {
        this.deleting = false;
        if (res.status === 200) {
         this.message = res.data.message;
          this.fetchTicket();
        } else {
         this.message = res.data.error;
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
    return Object.keys(this.tickets || {}).map((key) => ({
      ...this.tickets[key],
      uid: key,
    }));
  }
  get myTickets() {
    return Object.keys(this.staffTickets || {}).map((key) => ({
      ...this.staffTickets[key],
      uid: key,
    }));
  }
}

export default Ticket;
