window.onload=function(){
const  navSlide = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-list');
	const navLinks = document.querySelectorAll('.nav-list li');
	// Toggle Nav
	burger.addEventListener('click', ()=>{
		nav.classList.toggle('nav-active');
		
		navLinks.forEach((link, index) =>{ 
			if(link.style.animation) {
				link.style.animation = ''
			} else {
				link.style.animation = 'navLinkFade 0.5s ease forwards';
				console.log(index / 2);
			}
	});
	});
	// Animate Links
	
}

navSlide();
  
}

// Navbar hide scrolloll


$(function(){
var lastScrollTop = 0, delta = 5;
$(window).scroll(function(event){
   var st = $(this).scrollTop();

   if(Math.abs(lastScrollTop - st) <= delta)
      return;

   if (st > lastScrollTop){
       // downscroll code
       $("#header").css('visibility','hidden').hover ()
   } else {
      // upscroll code
      $("#header").css('visibility','visible');
   }
   lastScrollTop = st;
});
});

// $(document).on('mousemove',function(e){
//     var hidden = ($("#header").css('visibility')!='visible');
//     console.log(hidden);
//     if(e.clientY <70 && hidden)
//         $("#header").css('visibility','visible');
//     else if(e.clientY >70 && !hidden)
//         $("#header").css('visibility','hidden');
// });


