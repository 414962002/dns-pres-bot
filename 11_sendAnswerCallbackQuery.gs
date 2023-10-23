/**********************************************************************************
 * @function sendAnswerCallbackQuery
 * 
 * @description 
 *             This code sends a response to a callback query in a Telegram chat. 
 *             It constructs a URL using a token variable, creates a data object 
 *             with the necessary parameters, and then sends a POST request 
 *             to the Telegram API using the UrlFetchApp.fetch function.
 *
 * @param {number} chat_id - The ID of the chat to send the answer to.
 * @param {string} callback_query_id - The ID of the callback query to answer.
 * @param {string} text - The text of the answer.
 * 
 * @see {@link https://core.telegram.org/bots/api#answercallbackquery}
 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app}
 * 
 * @author 414962002
**********************************************************************************/

function sendAnswerCallbackQuery(chat_id, callback_query_id, text) {
  const url = `https://api.telegram.org/bot${token}/`; //It constructs a URL using a token variable
  const data = { //creates a data object with the necessary parameters
    method: "post",
    payload: {
      method: "answerCallbackQuery",
      chat_id: String(chat_id),
      callback_query_id,
      text,
      show_alert: false,
      parse_mode: "HTML"
    }
  };
  UrlFetchApp.fetch(url, data); //and then sends a POST request to the Telegram API using the *UrlFetchApp.fetch* function
}