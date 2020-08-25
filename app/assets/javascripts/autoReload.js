$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
      `<div class="main_chat__message-info" data-message-id=${message.id}>
      <div class="main_chat__message-info-username">
      ${message.user_name}
      <div class="main_chat__message-info-date">
      ${message.created_at}
      </div>
      <div class="main_chat__message">
      <p class="main_chat__message-content">
      ${message.content}
      </p>
      <img class="Message__image" src="${message.image}">
      </div>
      </div>`

      return html;
    }else{
    let html = 
      `<div class="main_chat__message-info" data-message-id=${message.id}>
      <div class="main_chat__message-info-username">
      ${message.user_name}
      <div class="main_chat__message-info-date">
      ${message.created_at}
      </div>
      <div class="main_chat__message">
      <p class="main_chat__message-content">
      ${message.content}
      </p>     
      </div>
      </div>`
      return html;
    };
  }
  let reloadMessages = function() {
    let last_message_id = $('.main_chat__message-info:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main_chat__message-list').append(insertHTML);
        $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight},'fast');
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});