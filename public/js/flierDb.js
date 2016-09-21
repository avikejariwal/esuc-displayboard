
$(document).ready(function(){
      $('.carousel.carousel-slider').carousel({full_width: true, time_constant:500});

      window.setInterval(function(){
      	nextSlide();
      }, 10000);
    });

function nextSlide(){
	var numFliers = $('#flierCarousel a').length;
	if (numFliers != 1){
		$('.carousel.carousel-slider').carousel('next');
	}	
}