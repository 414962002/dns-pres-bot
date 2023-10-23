/**********************************************************************************
 * Deletes the webhook by making a request to the Telegram API.
 * 
 * @function deleteWebhook
 * 
 * @description 
 *             This code snippet sets a webhook by constructing a URL 
 *             using the telegram URL and the webApp URL. 
 *             It then makes a request to that URL using the UrlFetchApp.fetch method 
 *             and logs the content of the response.
 *
 * @param {string} telegramUrl - The base URL for the Telegram API.
 * @param {string} webAppUrl - The URL of the web app to remove from the webhook.
 * @return {string} The response content as text.
 * 
 * @see {@link https://core.telegram.org/bots/api#deletewebhook}
 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app}
 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/http-response#getContentText()}
 * 
 * @author 414962002
 * 
**********************************************************************************/

function deleteWebhook() {
  let url = telegramUrl + "/deleteWebhook?url=" + webAppUrl; // Concatenate the telegramUrl and webAppUrl to construct the webhook URL
  let response = UrlFetchApp.fetch(url); // Make a request to the webhook URL using the UrlFetchApp.fetch method
  Logger.log(response.getContentText());
}