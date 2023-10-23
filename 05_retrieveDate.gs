/**********************************************************************************
 * Retrieves the current month number.
 * 
 * @function getMonthNumber
 * 
 * @description 
 *             This function creates a new Date object, gets the current month (1-based index), 
 *             logs the month number, and returns the {@link getMonthNumber} function itself.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth}
 * 
 * @author 414962002
 * 
**********************************************************************************/

function getMonthNumber() {
  const month = new Date().getMonth() + 1;
  Logger.log(month);
}


/**********************************************************************************
 * Retrieves the current month name.
 *
 * @function getMonthName
 * 
 * @description 
 *             This function creates a new Date object, gets the current month name, 
 *             logs the month name, and returns the function itself.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString}
 * 
 * @author 414962002
 *
**********************************************************************************/

function getMonthName() {
  const today = new Date();
  const options = { month: 'long' };
  const monthName = today.toLocaleString('en-US', options);
  Logger.log(monthName); 
  return monthName;// Returns the full month name
}