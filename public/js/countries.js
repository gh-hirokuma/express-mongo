//国選ばせる
$(function() {
  // $.ajax({
  //   type: "GET",
  //   url: "/countries.json",
  //   success: async function(data) {
  //     for (country of data.data) {
  //       const $option = $("<option>")
  //         .val(country.name)
  //         .text(country.name);

  //       $('select[name="country"]').append($option);
  //     }

  //     $(".js-example-basic-single").select2();
  //   },
  //   fail: function(err) {
  //     console.log(err);
  //   }
  // });

  $(".js-example-basic-single").select2();
});
