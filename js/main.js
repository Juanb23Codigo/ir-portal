/* ============================================
   IR Portal – Main JavaScript
   Language toggle, FAQ, interactions
   ============================================ */

(function($) {
  'use strict';

  // -------- Language Toggle --------
  var currentLang = localStorage.getItem('ir-portal-lang') || 'en';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ir-portal-lang', lang);

    if (lang === 'es') {
      $('body').addClass('lang-active-es');
    } else {
      $('body').removeClass('lang-active-es');
    }

    // Update toggle button text
    $('#lang-toggle-btn').text(lang === 'en' ? 'ES' : 'EN');
    $('#lang-current').text(lang.toUpperCase());
  }

  // -------- Loading Screen --------
  $(window).on('load', function() {
    var $overlay = $('#loading-overlay');
    if ($overlay.length) {
      $overlay.addClass('fade-out');
      setTimeout(function() { $overlay.remove(); }, 400);
    }
  });

  // Initialize language on page load
  $(document).ready(function() {
    setLanguage(currentLang);

    // Also apply language to loading screen immediately
    var $overlay = $('#loading-overlay');
    if ($overlay.length) {
      if (currentLang === 'es') {
        $overlay.find('.lang-en').hide();
        $overlay.find('.lang-es').show();
      } else {
        $overlay.find('.lang-es').hide();
        $overlay.find('.lang-en').show();
      }
    }

    // Language toggle click
    $('#lang-toggle-btn').on('click', function(e) {
      e.preventDefault();
      setLanguage(currentLang === 'en' ? 'es' : 'en');
    });

    // FAQ accordion
    $('.faq-question').on('click', function() {
      var $this = $(this);
      var $answer = $this.next('.faq-answer');

      // Close others
      $('.faq-question').not($this).removeClass('active');
      $('.faq-answer').not($answer).removeClass('active').slideUp(200);

      // Toggle current
      $this.toggleClass('active');
      if ($answer.hasClass('active')) {
        $answer.removeClass('active').slideUp(200);
      } else {
        $answer.addClass('active').slideDown(200);
      }
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: target.offset().top - 80 }, 400);
      }
    });

    // Add active class to current nav item
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('.navbar-nav a').each(function() {
      var href = $(this).attr('href');
      if (href === currentPage) {
        $(this).parent('li').addClass('active');
      }
    });

    // Bar chart tooltip
    $('.bar').on('mouseenter', function() {
      $(this).find('.bar-value').css('opacity', '1');
    }).on('mouseleave', function() {
      $(this).find('.bar-value').css('opacity', '');
    });
  });

})(jQuery);
