// date formatting functions
const toMonthName = new Intl.DateTimeFormat('de', { month: 'long' });
const toDayName = new Intl.DateTimeFormat('de', { weekday: 'long' });


// format a date to YYYY-MM-DD
export const ymd = date => (

  date instanceof Date ?
    `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}` : ''

);


// format a date to DD MMMM, YYYY
export const friendly = date => (

  date instanceof Date ?
    toDayName.format(date) + ' ' + date.getUTCDate() + '. ' + toMonthName.format(date) + ' ' + date.getUTCFullYear() : ''

);
