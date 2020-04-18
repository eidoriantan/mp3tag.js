
const GITHUB_REPO = 'https://api.github.com/repos/eidoriantan/mp3tag.js'

$(document).ready(function () {
  const template = $('#contributor-template').prop('content')
  $.ajax(GITHUB_REPO + '/contributors', {
    method: 'GET',
    accepts: 'application/vnd.github.v3+json',
    dataType: 'json',
    success: function (users) {
      $.each(users, function () {
        const item = $(template).clone()
        $(item).find('[data-temp="user-link"]').attr('href', this.html_url)
        $(item).find('[data-temp="user-image"]').attr({
          src: this.avatar_url,
          title: this.login,
          alt: this.login
        })
        $(item).find('[data-temp]').removeAttr('data-temp')

        $('#contributors').append(item)
      })
    }
  })
})
