(function (window, document) {

  'use strict';

  var navbar, navbarMenu, toggleMenu, navbarMenuLinks;


  document.addEventListener('click', function (event) {
    if (toggleMenu.contains(event.target)) {
        navbar.classList.toggle("show");
    } else if (!navbarMenu.contains(event.target) && navbar.classList.contains('show')) {
        navbar.classList.remove("show");
    }
});

  function initMenu() {
    toggleMenu = document.querySelector('.toggle-menu');
    navbar = document.querySelector('.nav');
    navbarMenu = document.querySelector('.navbar-menu');
    navbarMenuLinks = document.querySelectorAll('.navbar-menu ul li a');

    navbarMenuLinks.forEach(link => {
      link.classList.remove('active')

      if(getCurrentPathName() === link.href.replace(window.location.origin, '')){
        link.classList.add('active');
      }
      
    })
  }

  function getCurrentPathName(){
    if(window.location.pathname === '/'){
      return window.location.pathname;
    }else{
      return window.location.pathname.slice(0, -1); 
    }
  }
  

  window.initMenu = initMenu;

})(window, document);