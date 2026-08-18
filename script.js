(function(){
  "use strict";

  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobile-nav');
  var iconOpen = document.getElementById('navIconOpen');
  var iconClose = document.getElementById('navIconClose');

  navToggle.addEventListener('click', function(){
    var isOpen = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    iconOpen.style.display = isOpen ? 'none' : 'block';
    iconClose.style.display = isOpen ? 'block' : 'none';
  });

  mobileNav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      iconOpen.style.display = 'block';
      iconClose.style.display = 'none';
    });
  });

  // Active nav link on scroll
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-desktop a');
  if('IntersectionObserver' in window && sections.length){
    var navObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function(link){
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function(s){ navObserver.observe(s); });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && reveals.length){
    var revealObserver = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function(el){ revealObserver.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in-view'); });
  }

  // Quote form -> WhatsApp deep link
  var form = document.getElementById('quoteForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('name').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var type = document.getElementById('type').value;
    var message = document.getElementById('message').value.trim();

    var text = "Hello, I'd like a site estimate.\n" +
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      "Project type: " + type +
      (message ? ("\nDetails: " + message) : "");

    var url = "https://wa.me/919952661157?text=" + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener');
  });
})();

