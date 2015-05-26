'use-strict';

$(document).ready(function(){
  // functions are called inside the document ready
  hideErrors();
  hideForm();
  addCommentListener();
  cancelListener();
  submitCommentListener();
});

function hideErrors(){
  $( "#com-name-error" ).hide();
  $( "#com-email-error" ).hide();
  $( "#comment-error" ).hide();
};

function hideForm(){
  $( "#add-comment" ).hide();
};

function addCommentListener(){
  $( "#show-comment-form").click(function(){
    $( "#add-comment" ).show();
  });
};

function cancelListener(){
  $( "#cancel").click(function(){
    $( "#add-comment" ).hide();
  });
};

function submitCommentListener(){
  $( 'input[type="submit"]' ).click(function(event){
    var name = $("#comment-name").val(),
        email = $( "#com-email").val(),
        reg = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+.([a-z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/,
        comment = $("#comment").val(),
        date = getCurrent();
    var validation = validate(name, email, reg, comment);
    if (validation){
      $("#posts").append('<div class="newcomment"><span class="name">' + name + '</span><span class="email">'+ email + '</span><span class="date">'+ date +'</span><p class="comment">'+ comment +'</p></div>');
      $( "#add-comment" ).hide(); //hide form
      event.preventDefault();
    }else{event.preventDefault();}
  });

};

function validate(name, email, reg, comment){
  var validate = true;
  if(name.length <= 3){
    $( "#com-name-error" ).show();
    validate = false;
  }
  if(!reg.test(email)){
    $( "#com-email-error" ).show();
    validate = false;
  }
  if(comment.length <= 3){
    $( "#comment-error" ).show();
    validate = false;
  }
  return validate
};

function getCurrent(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd='0'+dd
  }
  if(mm<10) {
      mm='0'+mm
  }
  return mm+'/'+dd+'/'+yyyy;
};

function clearForm(){
  event.preventDefault();
  $("comment-name").val() = "";
  $("com-email").val() = "";
  $("comment").val() = "";
  $( "#add-comment" ).hide();

};
