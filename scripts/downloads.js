
const GITHUB_REPO = 'https://api.github.com/repos/eidoriantan/mp3tag.js'

$(document).ready(function () {
  const template = $('#release-item-template').prop('content')
  $.ajax(GITHUB_REPO + '/releases', {
    method: 'GET',
    accepts: 'application/vnd.github.v3+json',
    dataType: 'json',
    success: function (releases) {
      $.each(releases, function (i) {
        if (this.prerelease) return true
        const row = $(template).clone(true, true)

        if (i === 0) $(row).find('[data-temp="row"]').addClass('table-primary')
        $(row).find('[data-temp="name"]').text(this.tag_name)
        $(row).find('[data-temp="page"]').attr('href', this.html_url)
        $(row).find('[data-temp="source"]').attr('href', this.zipball_url)
        $(row).find('[data-temp="dist"]').attr({
          href: this.assets[0].browser_download_url
        })
        $(row).find('[data-temp]').removeAttr('data-temp')

        $('#tbody').append(row)
      })
    }
  })
})
