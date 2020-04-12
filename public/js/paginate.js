$(document).ready(function () {
  $('#pagination').twbsPagination({
    totalPages: 10,
    visiblePages: 5,
    href: true,
    onPageClick: function (event, page) {
      $('#page-content').text('Page ' + page);
    }
  });
});
