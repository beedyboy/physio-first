const moment =  require('moment');

const Assistant = {
  generateSlug: (data) => {
    let slug = data
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
    return slug;
  },
  getDaysDiff: (start_date, end_date, date_format = 'YYYY-MM-DD') => {
    const getDateAsArray = (date) => {
      return moment(date.split(/\D+/), date_format);
    }
    return getDateAsArray(end_date).diff(getDateAsArray(start_date), 'days') + 1;
  }
 
};

module.exports = Assistant;
