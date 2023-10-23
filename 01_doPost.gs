/**********************************************************************************
 * A function that handles a POST request.
 *
 * @function doPost
 * 
 * @param {object} e - The event object representing the request.
 * 
 * @description 
 *              This function parses the contents of the POST request, 
 *              checks for message or callback query data, and performs 
 *              different actions based on the received data.
 * 
 *              If the contents of the request include a message, it extracts 
 *              the message text and chat ID. It then checks the message text 
 *              and performs different actions based on the text. If the 
 *              message text is '/start', it sends a help text and a start 
 *              keyboard to the chat ID. If the message text is not '/start', 
 *              it inserts the message text into a Google Sheet.
 * 
 *              If the contents of the request include a callback query, it 
 *              extracts the callback query data, chat ID, and callback query 
 *              ID. It then checks the callback query data and performs 
 *              different actions based on the data. If the callback query 
 *              data is 'show_today_sum', it shows the sum of today's data 
 *              and sends it to the chat ID. If the callback query data is 
 *              'show_month_sum', it calculates the sum of the current month's 
 *              data and sends it to the chat ID. If the callback query data 
 *              is 'show_month_avg', it calculates the average of the current 
 *              month's data and sends it to the chat ID. If the callback query 
 *              data is 'upshot_chart', it sends an upshot chart. If the 
 *              callback query data is 'pivot_chart', it sends a pivot chart. 
 *              If the callback query data is none of the above, it sends a 
 *              response with 'wtf' and a text message of 'wtf' to the chat ID.
 *                                                                                
 * @see {@link https://developers.google.com/apps-script/guides/web}              
 * @see {@link https://core.telegram.org/bots/api#callbackquery}                  
 * @see {@link https://core.telegram.org/bots/api#answercallbackquery}            
 *                                                                                
 * @author 414962002            
 *                                                   
**********************************************************************************/


function doPost(e) {
  const contents = JSON.parse(e.postData.contents);

  if (contents.message) {
    const messageText = contents.message.text;
    const chat_id = contents.message.from.id;

    switch (messageText) {
      case '/start':
        sendText(chat_id, helpText, keyboard_text_start);
        sendTextApp(chatId, text)
        break;

      default:
        insMesToSheet(messageText);
        break;
    }
  } else {
    const cbData = contents.callback_query.data;
    const chatIdCb = contents.callback_query.from.id;
    const callback_query_id = contents.callback_query.id;
    const sumMonthIs = `◦ ${getMonthName()}'s sum is: 
    `;
    const avgMonthIs = `◦ ${getMonthName()}'s avg is: 
    `;

    switch (cbData) {
      case 'show_today_sum':
        showTodaySum();
        sendText(chatIdCb, `${sum}`); // a variable: *sum* are in the *show.gs*
        sendAnswerCallbackQuery(chatIdCb, callback_query_id, 'show_today_sum', true);
        break;
      case 'show_month_sum':
        calculateSumOfCurrentMonth();
        sendText(chatIdCb, `${sumMonthIs + sumCurrentMonth}`); // a variable: *sumCurrentMonth* are in the *calc.gs*
        sendAnswerCallbackQuery(chatIdCb, callback_query_id, 'show_month_sum', true);
        break;
      case 'show_month_avg':
        calculateAverageOfCurrentMonth();
        sendText(chatIdCb, `${avgMonthIs + roundedAverage}`); // a variable: *roundedAverage* are in the *calc.gs*
        sendAnswerCallbackQuery(chatIdCb, callback_query_id, 'show_month_avg', true);
        break;
      case 'upshot_chart':
        sendUpshotChart();
        sendAnswerCallbackQuery(chatIdCb, callback_query_id, 'upshot_chart', true);
        break;
      case 'pivot_chart':
        sendPivotChart();
        sendAnswerCallbackQuery(chatIdCb, callback_query_id, 'pivot_chart', true);
        break;
      default:
        sendAnswerCallbackQuery(chatIdCb, callback_query_id, 'wtf');
        sendText(chatIdCb, `wtf`);
        break;
    }
  }
}