/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('.all-tweets').append($tweet);  
  }
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const $tweet = $(`
  <article>
          <header class="article-tweet-header">
            <div class="avatar-name">
              <img src="${escape(tweet.user.avatars)}">
              <h3>${escape(tweet.user.name)}</h3>
            </div>
            <h3 class="handle"><b>${escape(tweet.user.handle)}</b></h3>
          </header>
          <p class="tweeted">${escape(tweet.content.text)}</p>
          <footer class="article-tweet-header">
            <h5 class="date">${escape(tweet.created_at)}</h5>
            <div class="icon-grouped">
              <i class="icons fas fa-flag"></i>
              <i class="icons fas fa-retweet"></i>
              <i class="icons fas fa-heart"></i>
            </div>
          </footer>
        </article>`)
  return $tweet;
};

const errorHandler = function () {

}
$(document).ready(function() { 

  $(".error-message").hide();
  console.log("hey")

  $( "#tweet-box" ).submit(function(event) {
    event.preventDefault();
    const tweetText = $( this ).serialize();
    if (tweetText.length <= 5 || tweetText === null) {
      $(".error-message").text('Tweet does not contain any text. Tweets must be at least 1 character in length.').show();
    } else if (tweetText.length > 145) {
      $(".error-message").text('Tweet exceeds 140 character limit.').show();
    } else {
      $.post('/tweets', tweetText);
      $('#tweet-text').val('');
      loadtweets();
    }
  });

  const loadtweets = function() {
    $.get('/tweets')
    .then(function(data) {
      renderTweets(data);
    });
  }
  
  // loadtweets();

});
    


