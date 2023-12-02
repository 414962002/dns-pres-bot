/**********************************************************************************
 * Calculates the sum of certain values in a spreadsheet.
 * 
 * @function calcInsSum
 * 
 * @description 
 *             This function performs calculations on a Google Spreadsheet. 
 *             It first retrieves the active spreadsheet and the current date. 
 *             Then, it finds a row in the spreadsheet that matches today's date. 
 *             If a row is found, it performs calculations using values from specific cells in that row 
 *             and sets the value of another cell with the calculated sum. 
 *             If no row is found with today's date, it logs a message to the console.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN}
 * @see {@link https://developers.google.com/apps-script/reference/spreadsheet/range#setnumberformatnumberformat}
 * 
 * @author 414962002
 *
**********************************************************************************/

// function calcInsSum() {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // get the active spreadsheet and selects the active sheet.
//   const today = Utilities.formatDate(new Date(), "GMT+3", "dd/MM/yyyy"); // retrieve the current date and formats it as "dd/MM/yyyy" in the GMT+3 timezone.
//   const dataRange = sheet.getDataRange(); // gets the range of data in the sheet.
//   const values = dataRange.getValues();  // retrieves the values from the data range.

//   const todayRow = values.findIndex(row => { // search for a row in the values that has a date matching today's date.
//     const date = row[1];
//     return date instanceof Date && Utilities.formatDate(date, "GMT+3", "dd/MM/yyyy") === today;
//   });

//   if (todayRow !== -1) { // If a row is found, it performs the following calculations:
//     const fifthCellValue = parseFloat(values[todayRow][4]); // It retrieves the fifth cell value from the found row and converts it to a floating-point number.
//     const multipliedValue = isNaN(fifthCellValue) ? 0 : fifthCellValue * 6.6; // It multiplies the fifth cell value by 6.6, or assigns 0 if the fifth cell value is not a number.
//     const sum = (parseFloat(values[todayRow][2]) || 0) + (parseFloat(values[todayRow][3]) || 0) + multipliedValue;  // It calculates the sum of the third[2] cell value, the fourth[3] cell value, and the multiplied value.
//     const sixCell = sheet.getRange(todayRow + 1, 6); // It gets the sixth cell in the found row.
//     sixCell.setNumberFormat("0");  //the value will be displayed as a whole number with no decimal places.
//     sixCell.setValue(sum); // It sets the value of the sixth cell to the calculated sum.
//     return;
//   }
//   console.log("No row found with today's date");
// }

function calcInsSum() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const today = Utilities.formatDate(new Date(), "GMT+3", "dd/MM/yyyy");
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();

    const todayRow = values.findIndex(row => {
        const date = row[1];
        return date instanceof Date && Utilities.formatDate(date, "GMT+3", "dd/MM/yyyy") === today;
    });

    if (todayRow !== -1) {
        const thirdCellValue = parseFloat(values[todayRow][2]);
        const fourthCellValue = parseFloat(values[todayRow][3]);
        const fifthCellValue = parseFloat(values[todayRow][4]);
        const cardValue = isNaN(thirdCellValue) ? 0 : thirdCellValue * 1.3;
        const plasticValue = isNaN(fourthCellValue) ? 0 : fourthCellValue * 1.3;
        const styroValue = isNaN(fifthCellValue) ? 0 : fifthCellValue * 6.6;
        const sum = cardValue + plasticValue + styroValue;
        const sixCell = sheet.getRange(todayRow + 1, 6);
        sixCell.setNumberFormat("0");
        sixCell.setValue(sum);
        return;
    }
    console.log("No row found with today's date");
}

/**********************************************************************************
 * Inserts a message into the spreadsheet based on the given message text.
 *
 * @param {string} messageText - The text of the message to be inserted.
 * @function insMesToSheet
 * @description 
 *             The function retrieves the active spreadsheet, 
 *             gets today's date in the format "dd/MM/yyyy", and retrieves all the values from the spreadsheet.
 *             Then, it iterates over each row of the values and checks if the date in the second column 
 *             matches today's date. If it does, it processes the messageText based on its first character.
 *             If the first character is 'c', 'p', 's', or 'i', followed by a digit, it sets the corresponding value 
 *             in the respective column of the spreadsheet and calls a calcInsSum function. 
 *             It also sends a message to a chat with the text "Done! 🤭". 
 *             If the first character is not one of the specified characters or the remaining characters are not digits, 
 *             it sends an error message to the chat with the text "Error: Invalid value 🫤".
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof}
 * @see {@link https://developers.google.com/apps-script/reference/utilities/utilities#formatDate(Date,String,String)}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring}
 * 
 * @author 414962002
 *
**********************************************************************************/

function insMesToSheet(messageText) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // Get the active spreadsheet and the active sheet
  const today = Utilities.formatDate(new Date(), "GMT+3", "dd/MM/yyyy");  // Get the current date in the format dd/MM/yyyy
  const dataRange = sheet.getDataRange();  // Get the range of data in the sheet
  const values = dataRange.getValues(); // Get the values in the data range

  for (let row = 0; row < values.length; row++) {  // Loop through each row in the values array
    const date = values[row][1];  // Get the date value in the second column of the current row

    if (date instanceof Date && Utilities.formatDate(date, "GMT+3", "dd/MM/yyyy") === today) { // Check if the date is valid and matches today's date
      const firstChar = messageText.charAt(0).toLowerCase(); // Get the first character of the message text and convert it to lowercase
      const remainingChars = messageText.substring(1); // Get the remaining characters of the message text
      let columnIndex;

      switch (firstChar) { // Switch statement to handle different first characters
        case 'c':
          if (/[0-9]/.test(remainingChars)) { // Check if the remaining characters are numbers
            columnIndex = 3; // Set the column index to 3 and set the value in the corresponding cell
            sheet.getRange(row + 1, columnIndex).setValue(remainingChars); // This code snippet sets the value of a cell in a spreadsheet to the value of remainingChars, at the specified row and column index.
            calcInsSum(); // Call the calcInsSum function
            sendText(chat_id, 'Done! 🤭'); // Send a success message
          } else {
            sendText(chat_id, 'Error: Invalid value 🫤'); // Send an error message for invalid value
            return; // Exit the function
          }
          break;
        case 'p':
          if (/[0-9]/.test(remainingChars)) {
            columnIndex = 4;
            sheet.getRange(row + 1, columnIndex).setValue(remainingChars);
            calcInsSum();
            sendText(chat_id, 'Done! 🤭');
          } else {
            sendText(chat_id, 'Error: Invalid value 🫤');
            return;
          }
          break;
        case 's':
          if (/[0-9]/.test(remainingChars)) {
            columnIndex = 5;
            sheet.getRange(row + 1, columnIndex).setValue(remainingChars);
            calcInsSum();
            sendText(chat_id, 'Done! 🤭');
          } else {
            sendText(chat_id, 'Error: Invalid value 🫤');
            return;
          }
          break;
        case 'i':
          if (/[0-9]/.test(remainingChars)) {
            columnIndex = 7;
            sheet.getRange(row + 1, columnIndex).setValue(remainingChars);
            calcInsSum();
            sendText(chat_id, 'Done! 🤭');
          } else {
            sendText(chat_id, 'Error: Invalid value 🫤');
            return;
          }
          break;
        default:
          // Send an error message for invalid value
          sendText(chat_id, 'Error: Invalid value 🫤');
          // Exit the function
          return;
      }
    }
  }
}