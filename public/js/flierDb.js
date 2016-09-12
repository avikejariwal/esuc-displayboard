
$(document).ready(function(){
      $('.carousel.carousel-slider').carousel({
      	full_width: true,
      	time_constant: 500
      });
      window.setInterval(function(){
      	nextSlide();
      }, 10000);
    });

function nextSlide(){
	$('.carousel.carousel-slider').carousel('next');
}