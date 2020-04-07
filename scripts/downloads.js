
const GITHUB_REPO = 'https://api.github.com/repos/eidoriantan/mp3tag.js'

$(document).ready(function () {
  const template = $('#release-item-template').prop('content')
  $.get(GITHUB_REPO + '/releases', function (releases) {
    for (let i = 0; i < releases.length; i++) {
      const row = $(template).clone()
      const release = releases[i]

      if (i === 0) $(row).find('[data-temp=\'row\']').addClass('table-primary')
      $(row).find('[data-temp=\'name\']').text(release['tag_name'])
      $(row).find('[data-temp=\'page\']').attr('href', release['html_url'])
      $(row).find('[data-temp=\'source-download\']').attr({
        href: release['zipball_url']
      })

      $(row).find('[data-temp=\'distributable-download\']').attr({
        href: release['assets'][0]['browser_download_url']
      })

      $(row).find('[data-temp]').removeAttr('data-temp')
      $('#tbody').append(row)
    }
  })
})
