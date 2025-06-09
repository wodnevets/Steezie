/***************************************************
				 ANCHOR SCROLL JAVASCRIPT
***************************************************/
/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);

/***************************************************
		ADDITIONAL CODE FOR ANCHOR SCROLL
***************************************************/
  $(document).ready(function(){ 
    $.localScroll(); 
  });
  

/***************************************************
	  			SLIDING GRAPH
***************************************************/
jQuery(document).ready(function($){
	function isScrolledIntoView(id)
	{
		var elem = "#" + id;
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();
	
		if ($(elem).length > 0){
			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();
		}

		return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
		  && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
	}

	
	
	function sliding_horizontal_graph(id, speed){
		//alert(id);
		$("#" + id + " li span").each(function(i){
			var j = i + 1; 										  
			var cur_li = $("#" + id + " li:nth-child(" + j + ") span");
			var w = cur_li.attr("title");
			cur_li.animate({width: w + "%"}, speed);
		})
	}
	
	function graph_init(id, speed){
		$(window).scroll(function(){
			if (isScrolledIntoView(id)){
				sliding_horizontal_graph(id, speed);
			}
			else{
				//$("#" + id + " li span").css("width", "0");
			}
		})
		
		if (isScrolledIntoView(id)){
			sliding_horizontal_graph(id, speed);
		}
	}
	
	graph_init("services-graph", 1000);
	

});




/***************************************************
	    PORTFOLIO ITEM IMAGE HOVER
***************************************************/
$(document).ready(function(){
	$(".portfolio-grid ul li .item-info-overlay").hide();
	if( navigator.userAgent.match(/Android/i) ||
	    navigator.userAgent.match(/webOS/i) ||
	    navigator.userAgent.match(/iPhone/i) ||
	    navigator.userAgent.match(/iPod/i) ||
	    navigator.userAgent.match(/iPad/i)){
		$(".portfolio-grid ul li").click(function(){
		$(this).find(".item-info-overlay").fadeTo(250, 1.0);
		}, function() {
			$(this).find(".item-info-overlay").fadeTo(250, 0);		
		});

	}
	else{
		$(".portfolio-grid ul li").hover(function(){
		$(this).find(".item-info-overlay").fadeTo(250, 1.0);
		}, function() {
			$(this).find(".item-info-overlay").fadeTo(250, 0);		
		});
	}

	
	
	
});




/***************************************************
	  DUPLICATE H3 & H4 IN PORTFOLIO
***************************************************/
$(document).ready(function($){  
	$(".item-info").each(function(i){
		$(this).next().prepend($(this).html())
	});
});




/***************************************************
	  ADDITIONAL CODE FOR FILTER NAVIGATION
***************************************************/
$(document).ready(function($){
	$('ul#portfolio-nav a').click(function() {
		$(this).css('outline','none');
		$('ul#portfolio-nav .current').removeClass('current');
		$(this).parent().addClass('current');	
		return false;
	});
});




/***************************************************
	     TOGGLE STYLE
***************************************************/
jQuery(document).ready(function($) {	
	$(".toggle-container").hide(); 
	$(".trigger").toggle(function(){
		$(this).addClass("active");
		}, function () {
		$(this).removeClass("active");
	});
	$(".trigger").click(function(){
		$(this).next(".toggle-container").slideToggle();
	});
});




/***************************************************
	     ACCORDION
***************************************************/
$(document).ready(function(){	
	$('.trigger-button').click(function() {
		$(".trigger-button").removeClass("active")
	 	$('.accordion').slideUp('normal');
		if($(this).next().is(':hidden') == true) {
			$(this).next().slideDown('normal');
			$(this).addClass("active");
		 } 
	 });
	$('.accordion').hide();
});




/***************************************************
	    FLICKR AND SOCIALIZE ICON IMAGE HOVER
***************************************************/
$(function() {
$('.flickr_badge_image img').animate({ opacity: 0.7}, 0) ;
$('.flickr_badge_image img').each(function() {
$(this).hover(
function() {
$(this).stop().animate({ opacity: 1.0 }, 200);
},
function() {
$(this).stop().animate({ opacity: 0.7 }, 200);
})
});
});	


$(function() {
$('.social-bookmarks img').animate({ opacity: 0.5}, 0) ;
$('.social-bookmarks img').each(function() {
$(this).hover(
function() {
$(this).stop().animate({ opacity: 1.0 }, 200);
},
function() {
$(this).stop().animate({ opacity: 0.5 }, 200);
})
});
});	




/***************************************************
	   HIDDEN FOOTER CONTENT ADDITIONAL CODE
***************************************************/
jQuery(document).ready(function($){
	$(".trigger-footer a").click(function(){
		if ($(".trigger-footer a").html() == "View more stuff"){
			$(".trigger-footer a").html("View less stuff");
		}
		else{
			$(".trigger-footer a").html("View more stuff");
		}
		var bottom_h = parseInt($("#footer-bottom").height() + 30);
		$(".footer-content-wrapper").css("bottom", bottom_h)
		$(".footer-content-wrapper").slideToggle("fast");
		$(this).toggleClass("active");
		return false;
	});
});


/***************************************************
	  SCROLLUP
***************************************************/
$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});

/***************************************************
	  ARCHIVE PAGE TABS
***************************************************/
$(document).ready(function($){
	$('.archive-list > div').slideUp();
	$('#archive-nav li a').click(function(){
		var li_ord = $(this).parent().prevAll().length;
		var li_ord_plus = li_ord + 1;		
		if ($('.archive-list div:nth-child(' + li_ord_plus + ')').css("display") == "none"){			
			$('.archive-list div:visible').slideUp();
			$('.archive-list div:nth-child(' + li_ord_plus + ')').slideDown();
		}
		else{
			$('.archive-list div:visible').slideUp();
		}				
		return false;
	})

});