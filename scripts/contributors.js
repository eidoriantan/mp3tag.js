
const GITHUB_REPO = 'https://api.github.com/repos/eidoriantan/mp3tag.js'

$(document).ready(function () {
  const template = $('#contributor-template').prop('content')
  $.ajax(GITHUB_REPO + '/contributors', {
    method: 'GET',
    accepts: 'application/vnd.github.v3+json',
    dataType: 'json',
    success: function (users) {
      users.forEach(function (user) {
        const item = $(template).clone()
        $(item).find('[data-temp=\'user-link\']').attr('href', user.html_url)
        $(item).find('[data-temp=\'user-image\']').attr({
          src: user.avatar_url,
          title: user.login,
          alt: user.login
        })
        $(item).find('[data-temp]').removeAttr('data-temp')

        $('#contributors').append(item)
      })
    }
  })
})
