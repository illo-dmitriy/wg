$(document).ready(function(){
  $('.slider').slick({
  	autoplay: true,
  	autoplaySpeed: 3000,
  	arrows: false
  });

  $('.carousel').slick({
  	dots: true,
  	slidesToShow: 2,
  	slidesToScroll: 1,
  	responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      }
    }]
	});

  $(".jquery-validation-zipCodeForm").validate({
		wrapper: "p",
		rules: {
			zipCode: {
				required: true,
				minlength: 3
			}
		}
	});

	$(".jquery-validation-feedback").validate({
		wrapper: "span",
		rules: {
			name: {
				required: true,
				minlength: 2
			}
		}
	});

});

function initMap() {
  var uluru = {lat: 50.005725, lng: 36.229191 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: uluru
  });
}






