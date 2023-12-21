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
let sharedCardValue;
let sharedPlasticValue;
let sharedStyroValue;

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
    sharedCardValue = isNaN(thirdCellValue) ? 0 : thirdCellValue * 1.3;
    sharedPlasticValue = isNaN(fourthCellValue) ? 0 : fourthCellValue * 1.3;
    sharedStyroValue = isNaN(fifthCellValue) ? 0 : fifthCellValue * 6.6;
    const sum = sharedCardValue + sharedPlasticValue + sharedStyroValue;
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

            //++++++++++++++++++++++++++++++++++++//
            //For sending a value in response when data is inserted into the bot.
            function getCardValue() {
              if (sharedCardValue !== undefined) {
                return sharedCardValue;
              } else {
                return null;
              }
            }
            calcInsSum();
            let cardValue = getCardValue();
            let cardValueInt = Math.floor(cardValue);
            //++++++++++++++++++++++++++++++++++++//

            sendText(chat_id, 'card: 🤭 ' + cardValueInt); // Send a success message
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

            //++++++++++++++++++++++++++++++++++++//
            //For sending a value in response when data is inserted into the bot.
            function getPlasticValue() {
              if (sharedPlasticValue !== undefined) {
                return sharedPlasticValue;
              } else {
                return null;
              }
            }
            calcInsSum();
            let plasticValue = getPlasticValue();
            let plasticValueInt = Math.floor(plasticValue);
            //++++++++++++++++++++++++++++++++++++//

            sendText(chat_id, 'plastic: 🤭 ' + plasticValueInt);
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


            //++++++++++++++++++++++++++++++++++++//
            //For sending a value in response when data is inserted into the bot.
            function getStyroValue() {
              if (sharedStyroValue !== undefined) {
                return sharedStyroValue;
              } else {
                return null;
              }
            }
            calcInsSum();
            let styroValue = getStyroValue();
            let styroValueInt = Math.floor(styroValue);
            //++++++++++++++++++++++++++++++++++++//


            sendText(chat_id, 'styro: 🤭 ' + styroValueInt);
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