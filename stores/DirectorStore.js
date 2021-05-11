import { decorate, observable, action, computed } from "mobx" 
import { backend } from "../services/APIService";
import { Beedy } from "../services/Beedy"; 
import Utility from "../services/UtilityService";

class Director{
  constructor() {  
    this.fetchDirector();   
  }
  
      filter = 'ALL';
      error = false;
      close = false;
      loading = false;
      sending = false;  
      close = false;
      exist = false; 
      director = [];
      directors = [];
 
     
     setFilter = (data) => {
     	this.filter = data;
     }

     toggleClose = () => { 
      this.close = false;
    }

    fetchDirector = () => { 
    this.loading = true;
    backend.get('director').then( res => {  
      this.directors = res.data;
      this.loading = false;
        
    }); 
  }
  
  confirmDirector = (cat, branch,name) => {
   try {
    backend.get('director/' + cat + '/'+ branch + '/'+ name+ '/exist').then( res => { 
      this.exist = res.data.exist;
    })
   } catch (error) {
     console.log(error)
   }
  }
   toggleDirector = (data) => {
     backend.post('director/toggle', data).then(res => {
       if (res.data.status === 200) {
        this.fetchDirector();
       }
     })
    
  }

  createDirector = (data) => {
    try {    
      this.sending = true;
      backend.post('director', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => { 
        this.sending = false;
        if(res.data.status === 200) {
          this.fetchDirector(); 
          this.close = true;   
          Beedy('success', res.data.message) ;
         } else {
           Beedy('error', res.data.message) 
         } 
      })  
    } catch(err) {
      if(err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg)
      }
    }  
  }


  getDirectorById = (id) => {  
    try {
   this.loading = true;
   backend.get('director/' + id).then( res => {   
      this.loading = false;
      if(res.data.status === 500) {
        Utility.logout();
      }
     else if(res.data.status === 200) {
         this.director = res.data.data[0]; 
      }
        
    })
    .catch(err => {
     console.log('getDirectorById', err.code);
     console.log('getDirectorById', err.message);
     console.log('getDirectorById', err.stack);
    });
  
	} catch(e) {
		console.error(e);
	}
  }
  updateDirector = (data) => {
    this.sending = true;
    backend.post('director/update', data).then(res => {
      this.sending = false;
      if (res.data.status === 200) {
       this.fetchDirector();
       this.close = true;   
       Beedy('success', res.data.message) ;
      } else {
        Beedy('error', res.data.message) 
      }
    })
 }
   removeDirector = (id) => { 
    backend.delete('director/' + id).then( res => {
      if(res.status === 200) {
        this.fetchDirector();
        this.message = res.message;
      //  return <Toast opens={true} type="success" message={res.message} />;
        // Toast(true, 'success',  res.message );
      }
    })
  }
  get filteredDirector() {
    switch (this.filter) {
      case 'ALL':
        return this.directors;
      case 'Active':
        return this.directors.filter(s => s.status === 'Active');
      case 'Inactive':
        return this.directors.filter(s => s.status === 'Inactive');
      case 'Deleted':
        return this.directors.filter(s => s.section === 'Deleted');

      default:
        return this.directors;
    }
  }
  get info() {
  	return Object.keys(this.directors || {}).map(key => ({...this.directors[key], uid: key})); 
  }
  get totalDirector() {
  	return  this.directors.length
  }
} 
decorate(DirectorStore, { 
  close: observable,
  error: observable,
  filter: observable,
  sending: observable,
  director: observable,
  loading: observable,
  directors: observable, 
  createDirector: action, 
  updateDirector: action, 
  fetchDirector: action,
  getDirectorById: action,
  removeDirector: action,
  toggleDirector: action,
  confirmDirector: action,
  setFilter: action,
  filteredDirector: computed,
  totalDirector: computed,
  info: computed,
})

 
export default Director;
