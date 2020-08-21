$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="main_chat__message-info">
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
        </div>
        </div>`

        return html;
      }else{
      let html = 
        `<div class="main_chat__message-info">
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
        </div>
        </div>`
        return html;
      };
    }
    
  $('.Form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main_chat__message-list').append(html);  
      $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight},'fast');    
      $('form')[0].reset();
      $(':input[type="submit"]').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $(':input[type="submit"]').prop('disabled', false);
  });
  });
})