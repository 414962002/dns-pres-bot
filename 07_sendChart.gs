/**********************************************************************************
 * Sends an 'upshot chart' to the specified chat ID.
 *
 * @function sendUpshotChart
 * 
 * @description This function generates a unique timestamp, constructs the 
 *              URL for the upshot chart using the 'upshotChartURL' constant 
 *              from 'const.gs', and sends a photo message to the Telegram 
 *              API with the upshot chart. The photo message includes the 
 *              chat ID, the upshot chart URL, and a caption of 'upshot chart'.
 * 
 * @see {@link https://core.telegram.org/bots/api#sendphoto}
 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime}
 * 
 * @author 414962002
 * 
**********************************************************************************/

function sendUpshotChart() {
  const timestamp = new Date().getTime(); // Generate a unique timestamp
  const upshotChart = upshotChartURL + timestamp; // 'upshotChartURL' is in the 'const.gs'
  const telegramUrlPhoto = "https://api.telegram.org/bot" + token + "/sendPhoto"; 
  // Construct the URL for the upshot chart using the timestamp

  let response = UrlFetchApp.fetch(telegramUrlPhoto, { // Send a POST request to the Telegram API with the necessary payload
    method: "post",
    payload: {
      chat_id: chat_id,
      photo: upshotChart,
      caption: 'upshot chart'
    }
  });
  Logger.log(response);
}

/**********************************************************************************
 * Sends an 'pivot chart' to the specified chat ID.
 *
 * @function sendUpshotChart
 * 
 * @description This function generates a unique timestamp, constructs the 
 *              URL for the pivot chart using the 'pivotChartURL' constant 
 *              from 'const.gs', and sends a photo message to the Telegram 
 *              API with the pivot chart. The photo message includes the 
 *              chat ID, the pivot chart URL, and a caption of 'pivot chart'.
 * 
 * @see {@link https://core.telegram.org/bots/api#sendphoto}
 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime}
 * 
 * @author 414962002
**********************************************************************************/

function sendPivotChart() {
  const timestamp = new Date().getTime(); // Generate a unique timestamp
  const pivotChart = pivotChartURL + timestamp; // 'pivotChartURL' is in the 'const.gs'

  const telegramUrlPhoto = "https://api.telegram.org/bot" + token + "/sendPhoto";

  let response = UrlFetchApp.fetch(telegramUrlPhoto, {
    method: "post",
    payload: {
      chat_id: chat_id,
      photo: pivotChart,
      caption: 'pivot chart'
    }
  });
  Logger.log(response);
}