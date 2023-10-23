/**********************************************************************************
 * Sets the commands for the Telegram bot.
 * 
 * @function setCommands
 * 
 * @description 
 *             The setCommands function is used to set the commands for a Telegram bot. 
 *             It creates an array of command objects, each with a command and description property. 
 *             It then constructs a URL using a token variable and sends a POST request 
 *             to the Telegram API to set the commands using the UrlFetchApp.fetch method 
 * 
 * @see {@link https://core.telegram.org/bots/api#setmycommands}
 * @see {@link https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify}
 * 
 * @author 414962002
**********************************************************************************/

function setCommands() {
  let commands = [ // Create an array of command objects
    { command: "start", description: "start" },
  ];
  let url = "https://api.telegram.org/bot" + token + "/setMyCommands"; // Construct a URL using a token variable.
  let payload = { // Prepare the payload for the POST request.
    commands: JSON.stringify(commands)
  };
  let options = { // Prepare the options for the POST request.
    method: "post",
    payload: payload
  };
  UrlFetchApp.fetch(url, options); // Send a POST request to the Telegram API to set the commands.
}
