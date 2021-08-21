/*
Author: dropchopdrop
Installation Procedure
1. Creat a google app script project on google drive
2. generate tg token from https://t.me/BotFather and replace <bot father> on line 21
3. replace the <Target Chat Room/Person/Channel ID> on line 20
4. replace the searching criteria <filter> on line 26 
5. Set the webhook

Workflow
1. Read unread email with tag
2. Send to bot
3. Mark as read
*/

/*
set Webhook https://api.telegram.org/bot<TelegramBotToken>/setWebhook?url=<Current web app URL:>
*/

var clientID = "<Target Chat Room/Person/Channel ID>" 
var TelegramBotToken = "<bot father>";
var TelegramBotAPI = "https://api.telegram.org/bot" + TelegramBotToken + "/";

function searchUnreadEmail() {
    // Find the unread email with filter
    var threads = GmailApp.search('is:unread <filter>');
    //Read the unread email
    for (var i = 0; i < threads.length; i++) {
      var message = threads[i].getMessages();
      cleansingData = message[0].getPlainBody();
      //Data cleansing with regex (optional)
      cleansingData = cleansingData.replace(/\n(\n*\r*)*/g, '\n\n');
      Content = message[0].getSubject()+cleansingData;
      pushTelegramBotMessage(Content);
      threads[i].markRead();
    }
}

//Forward Gmail Context
function pushTelegramBotMessage(message) {
  var payload = {
    "method": "sendMessage",
    "chat_id": clientID,
    "text": message,
  }
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };
  UrlFetchApp.fetch(TelegramBotAPI + "sendMessage", options);
}