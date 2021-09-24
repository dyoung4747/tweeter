$(document).ready(function() {

  $("#tweet-text").on('input', function(event) {
    // capture input in textarea 
    let $formInput = $(this);
    // find closest form tag
    let $forms = $formInput.closest('form');
    console.log('forms', $forms);
    // find id to change
    let $textCount = $forms.find("#counter");
    // determine textarea input length
    let textLength = $formInput.val().length;
    // subtract text length from 140
    let charLeft = 140 - textLength;
    // display characters left on specified id (counter)
    $textCount.html(charLeft);
    
    if (charLeft < 0) {
      $textCount.css('color', 'red');
    } else {
      $textCount.css('color', 'black');
    }
  });
    
});