
const GITHUB_REPO = 'https://api.github.com/repos/eidoriantan/mp3tag.js'

$(document).ready(function () {
  const template = $('#contributor-template').prop('content')
  $.get(GITHUB_REPO + '/contributors', function (users) {
    for (let i = 0; i < users.length; i++) {
      const item = $(template).clone()
      const user = users[i]

      $(item).find('[data-temp=\'user-link\']').attr('href', user.html_url)
      $(item).find('[data-temp=\'user-image\']').attr({
        src: user.avatar_url,
        title: user.login,
        alt: user.login
      })
      $(item).find('[data-temp]').removeAttr('data-temp')

      $('#contributors').append(item)
    }
  })
})
