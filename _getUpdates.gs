/**********************************************************************************
 * Use this method to receive incoming updates using long polling
 * 
 * @function getUpdates
 * 
 * @description
 *             The getUpdates method is a pull mechanism where the bot needs to ask for updates frequently. 
 *             In contrast, setWebhook is a push mechanism where updates 
 *             are delivered to your bot as soon as they arrive. 
 *             This avoids the need for your bot to ask for updates frequently and eliminates the 
 *             need for some kind of polling mechanism in your code
 * 
 * @see {@link https://core.telegram.org/bots/api#getupdates}
 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse}
 * 
 * @author 414962002
**********************************************************************************/

function getUpdates(token) {
  let url = "https://api.telegram.org/bot" + token + "/getUpdates"; // Construct a URL using a token variable.
  let response = UrlFetchApp.fetch(url); // Send a GET request to the Telegram API to get updates.
  let content = response.getContentText(); // Get the content of the response as text.
  let data = JSON.parse(content); // Parse the content from JSON format to a JavaScript object.
  return data; // Return the parsed data.
}

// for GoogleAppsScrit's Logger
function processUpdates() {
  let updates = getUpdates(token);
  Logger.log(updates);
}