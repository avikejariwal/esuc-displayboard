var i = 0;

$(document).ready(function(){
	var oneImage = false;
	$('#carousel img').each(function(){
		if (oneImage){
			$(this).hide();
		}
		else {
			$(this).show();
			oneImage = true;
		}
	})
      window.setInterval(function(){
      	console.log("Next slide");
      	nextSlide();
      }, 5000);
    });

function nextSlide(){
	var numFliers = $("#carousel img").length;
	var j = 0;
	$('#carousel img').each(function(){
		$(this).hide();
		if (i == j){
			$(this).show();
		}
		j = (j + 1) % numFliers;
	})
	i = (i + 1) % numFliers;
}