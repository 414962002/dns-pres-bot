/**********************************************************************************
 * Sets the webhook for the Telegram bot to the specified URL.
 * 
 * @function setWebhook
 * 
 * @description 
 *             This code snippet sets a webhook by constructing a URL 
 *             using the telegram URL and the webApp URL. 
 *             It then makes a request to that URL using the UrlFetchApp.fetch method 
 *             and logs the content of the response.
 *
 * @param {string} telegramUrl - The base URL for the Telegram bot API.
 * @param {string} webAppUrl - The URL of the web application to receive updates from the Telegram bot.
 * @return {string} The response from the server after setting the webhook.
 * 
 * @see {@link https://core.telegram.org/bots/api#setwebhook}
 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app}
 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/http-response#getContentText()}
 * 
 * @author 414962002
 * 
**********************************************************************************/

function setWebhook() {
  let url = telegramUrl + "/setWebhook?url=" + webAppUrl; // Concatenate the telegramUrl and webAppUrl to construct the webhook URL
  let response = UrlFetchApp.fetch(url); // Make a request to the webhook URL using the UrlFetchApp.fetch method
  Logger.log(response.getContentText());
}