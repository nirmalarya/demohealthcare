require(['jquery'], function($)
	{
	$(document).ready(function(){
		/* This code is executed after the DOM has been completely loaded. You can remove this if you want. */
		 /*var sds = document.getElementById("dum");
	    if(sds == null){
	        alert("You are using a free package.\n You are not allowed to remove the tag.\n");
	    }
	    var sdss = document.getElementById("dumdiv");
	    if(sdss == null){
	        alert("You are using a free package.\n You are not allowed to remove the tag.\n");
	    }*/
		var total_width=0;
		var elements = new Array();
		
		$('#main_slides .slide').each(function(i){
			
			/* Traverse through all the main_slides and store their accumulative widths in total_width */
			
			elements[i]= total_width;
			total_width += $(this).width();
			
			/* The elements array contains each slide's commulutative offset from the left part of the container */
			
			if(!$(this).width())
			{
				//alert("Please, fill the width & height for all the images!");
				return false;
			}
			
		});
		
		$('#main_slides').width(total_width);
	
		/* Change the cotnainer div's width to the exact width of all the main_slides combined */
	
		$('#pagination ul li a').click(function(e,keep_scrolling){
	
				/* On a thumbnail click */
	
				$('li.pageNumber').removeClass('act').addClass('inact');
				$(this).parent().addClass('act');
				
				var pos = $(this).parent().prevAll('.pageNumber').length;
				
				$('#main_slides').stop().animate({marginLeft:-elements[pos]+'px'},450);
				/* Start the sliding animation */
				
				e.preventDefault();
				/* Prevent the default action of the link */
				
				
				// Stopping the auto-advance if an icon has been clicked:
				//if(!keep_scrolling) clearInterval(interval_time);
		});
		
		$('#pagination ul li.pageNumber:first').addClass('act').siblings().addClass('inact');
		/* On page load, mark the first thumbnail as active */
		
		
		
		/*****
		 *
		 *	Code for auto advance of pictures.
		 *
		 ****/
		 
		var current=1;
		function autoAdvance()
		{
			if(current==-1) return false;
			
			$('#pagination ul li a').eq(current%$('#pagination ul li a').length).trigger('click',[true]);	// [true] will be passed as the keep_scrolling parameter of the click function on line 28
			current++;
		}
	
		// Auto advance time in seconds:
		
		$('#pagination ul li a').click(function(e,keep_scrolling){
	
				/* On a page number click */
	
				$('li.pageNumber').removeClass('act').addClass('inact');
				$(this).parent().addClass('act');
				
				var pos = $(this).parent().prevAll('.pageNumber').length;
				
				$('#main_slides').stop().animate({marginLeft:-elements[pos]+'px'},450);
				/* Start the sliding animation */
				
				e.preventDefault();
				/* Prevent the default action of the link */
				
				
				// Stopping the auto-advance if an slide has been clicked:
				/*if(!keep_scrolling) {
					$("#auto_slide_check").removeAttr('checked');
					$("#scroll_info").html("<font color = 'red'>Auto Scroll is off</font>");
					clearInterval(interval_time);					
				}*/
				
		});
		
	
		
		var changeEvery = 3;
	
		var interval_time = setInterval(function(){autoAdvance()},changeEvery*1000);
	
		/*$('#auto_slide_check').click(function(){
			if ($('#auto_slide_check').is(':checked')) { current = 0; clearInterval(interval_time); interval_time = setInterval(function(){autoAdvance()},changeEvery*1000); $("#scroll_info").html("<font color = 'green'>Auto Scroll is on</font>"); } else { clearInterval(interval_time); current = -1;$("#scroll_info").html("<font color = 'red'>Auto Scroll is off</font>");  }
		});*/
		
		
		
		
	});
}); 