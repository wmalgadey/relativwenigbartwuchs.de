// format number of words and reading time
const
  roundTo     = 10,
  readPerMin  = 200,
  numFormat   = new Intl.NumberFormat('de');

export default count => {

  const
    words     = Math.ceil(count / roundTo) * roundTo,
    mins      = Math.ceil(count / readPerMin);

  return `${ numFormat.format(words) } Wörter, ${ numFormat.format(mins) }-Minuten Lesezeit`;

};
