const addZero = val => {
  if (val < 10) return `0${val}`;
  return val.toString();
};

// Converts a new Date() to datetime-local input value format
const convertDate = (date, toggleTime = true) => {
  let newMonth = date.getMonth() + 1;
  let newDay = date.getDate();
  const year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  newMonth = addZero(newMonth);
  newDay = addZero(newDay);
  hour = addZero(hour);
  minutes = addZero(minutes);
  const time = toggleTime ? `T${hour}:${minutes}` : '';

  const resultDate = `${year}-${newMonth}-${newDay}${time}`;
  return resultDate;
};

// Simply removes the "Z" off the end of the DateTime string returned from a Rails PostgreSQL database
const convertRailsDate = date => date.substring(0, date.length - 1);

// Breaks down the given date value into an array with each index being relevant to argument values such as:
// year, month, date, hour, and minute
const convertToRubyDate = date => {
  const dateArray = date.split('-');
  let timeArray = dateArray[2].substring(dateArray[2].indexOf('T'));
  timeArray = timeArray.split(':');
  timeArray[0] = timeArray[0].substring(1);
  dateArray[2] = dateArray[2].substring(0, dateArray[2].indexOf('T'));

  return dateArray.concat(timeArray.slice(0, 2));
};

export { convertDate, convertRailsDate, convertToRubyDate };
