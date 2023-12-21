let roundedAverage;

/**********************************************************************************
 * It calculates the average of the values for the current month.
 * 
 * @function calculateAverageOfCurrentMonth
 *
 * @description 
 *            Calculates the rounded down average of values in the fifth column
 *            of the currently active Google Spreadsheet sheet, where the date
 *            in the first column of the same row is from the current month.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof}
 * 
 * @author 414962002
 * 
**********************************************************************************/

function calculateAverageOfCurrentMonth() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const columnValues = sheet.getRange("B:F").getValues();

  const currentDate = new Date(); // Get the current date
  const currentMonth = currentDate.getMonth() + 1; // Get the current month (1-based index)
  let sum = 0;
  let count = 0;

  for (let i = 0; i < columnValues.length; i++) {
    const dateValue = columnValues[i][0]; // Get the date value from column 'B'
    const value = columnValues[i][4]; // Get the value from column 'F' (at index 4)

    if (dateValue instanceof Date) { // Check if the date value is an instance of Date
      const month = dateValue.getMonth() + 1; // Get the month of the date value (1-based index)
      if (month === currentMonth) { // Check if the month matches the current month
        if (typeof value === "number") { // Check if the value is a number
          sum += value; // Add the value to the sum
          count++; // Increment the count
        }
      }
    }
  }
  const average = sum / count; // Calculate the average
  roundedAverage = Math.floor(average); // Assign the value to the variable
}
calculateAverageOfCurrentMonth(); // Call the function
// Logger.log(roundedAverage); // Output the rounded average


let sumCurrentMonth = 0;

/**********************************************************************************
 * It calculates the sum of values.
 * 
 * @function calculateSumOfCurrentMonth
 *
 * @description 
 *             This function retrieves the currently active Google Spreadsheet, 
 *             obtains the values in the range "B:F", and gets the current date and month. 
 *             It then iterates over each row in the range. For each row, it checks if the date value 
 *             from column 'B' is an instance of Date and if it matches the current month. 
 *             If these conditions are met, it checks if the value from column 'F' is a number. 
 *             If it is, it adds the value to the sum. The sum of the values is stored in the 
 *             global variable sumCurrentMonth.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof}
 * 
 * @author 414962002
 * 
**********************************************************************************/
function calculateSumOfCurrentMonth() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const columnValues = sheet.getRange("B:F").getValues();

  const currentDate = new Date(); // Get the current date
  const currentMonth = currentDate.getMonth() + 1; // Get the current month (1-based index)

  for (let i = 0; i < columnValues.length; i++) {
    const dateValue = columnValues[i][0]; // Get the date value from column 'B'
    const value = columnValues[i][4]; // Get the value from column 'F' (at index 4)

    if (dateValue instanceof Date) { // Check if the date value is an instance of Date
      const month = dateValue.getMonth() + 1; // Get the month of the date value (1-based index)
      if (month === currentMonth) { // Check if the month matches the current month
        if (typeof value === "number") { // Check if the value is a number
          sumCurrentMonth += value; // Add the value to the sum
        }
      }
    }
  }
  // Logger.log("Sum of values of the current month: " + sumCurrentMonth); // Log the sum of values
}
