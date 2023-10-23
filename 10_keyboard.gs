/**********************************************************************************
 * @description 
 *             The 'keyboard_text_start' is an object that represents a keyboard with buttons, 
 *             specifically an inline keyboard for a Telegram bot.
 *
 *             The inline_keyboard property is an array of arrays, 
 *             where each sub-array represents a row of buttons on the keyboard. 
 *             Each button is represented as an object with text and callback_data properties. 
 *             The text property is the label of the button that users see, 
 *             and the callback_data property is the data that will be sent 
 *             to your bot when a user clicks on the button.
 *             
 * @see {@link https://core.telegram.org/bots/api#inlinekeyboardmarkup}                          
 *                                                                                
 * @author 414962002 
**********************************************************************************/

let keyboard_text_start = {
  "inline_keyboard": [
    [{ text: 'show today sum', callback_data: 'show_today_sum' }, { text: 'show month sum', callback_data: 'show_month_sum' }],
    [{ text: 'show current month avg', callback_data: 'show_month_avg' }],
    [{ text: 'show upshot chart', callback_data: 'upshot_chart' }, { text: 'show pivot chart', callback_data: 'pivot_chart' }]
  ],
}