/**********************************************************************************
 * @function sendText
 * @description 
 *             This code defines a function called 'sendText' that sends 
 *             a text message to a chat using the 'Telegram API'.
 *             It takes three parameters: 
 *                                       'chat_id' (the ID of the chat), 
 *                                       'text' (the text message to send), 
 *                                       'keyboard_text' (optional keyboard text). 
 *             The function constructs a data object with the necessary information 
 *             and sends a POST request to the Telegram API using the 'UrlFetchApp.fetch' method.
 *
 * @param {any} chat_id - The ID of the chat to send the message to.
 * @param {string} text - The text message to send.
 * @param {object} keyboard_text - The keyboard text to be displayed along with the message.
 *
 * @see {@link https://core.telegram.org/bots/api#sendmessage}
 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app}
 * 
 * @author 414962002
**********************************************************************************/

function sendText(chat_id, text, keyboard_text) {
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyboard_text)
    }
  }
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data)
}