/**********************************************************************************
 * Calculates the sum of certain values in a spreadsheet.
 *
 * @function insMesToSheet
 *
 * @param {string} messageText - The text of the message to be inserted.
 * 
 * @description 
 *             This function retrieves the active spreadsheet, gets the current date,
 *             and searches for the corresponding row in the data range that matches
 *             the current date. It then extracts the value from the sixth column of
 *             that row and checks if it is a valid number. If it is a number, it
 *             logs the value as today's sum. If it is not a number, it logs a
 *             message indicating that there is no value for the current day.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof}
 * @see {@link https://developers.google.com/apps-script/reference/utilities/utilities#formatDate(Date,String,String)}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN}
 * 
 * @author 414962002
 *
**********************************************************************************/

let sum;

function showTodaySum() {  // Refactored function to show today's sum
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // Get the active spreadsheet
  const today = Utilities.formatDate(new Date(), "GMT+3", "dd/MM/yyyy"); // Get today's date in the format "dd/MM/yyyy"
  const dataRange = sheet.getDataRange(); // Get the data range of the sheet
  const values = dataRange.getValues(); // Get all the values in the data range
  const todayRow = values.findIndex(row => { // Find the row index where the date matches today's date
    const date = row[1];
    return date instanceof Date && Utilities.formatDate(date, "GMT+3", "dd/MM/yyyy") === today;
  });
  const sixCellValue = parseFloat(values[todayRow][5]); // Get the value at column 6 of the today's row
  
  // If the value is NaN (not a number), the sum variable is assigned 
  // a string indicating that there is no value for the current day. 
  // Otherwise, the sum variable is assigned the value of sixCellValue 
  if (Number.isNaN(sixCellValue)) {
    sum = `◦ sorry, no value for this day`;
  } else {
    sum = `◦ today's sum is: ${sixCellValue}`;
  }
  Logger.log(sum);
}