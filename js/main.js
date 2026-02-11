/* ============================================
   IR Portal – Main JavaScript
   Language toggle, FAQ, interactions
   ============================================ */

(function($) {
  'use strict';

  // -------- Password Gate --------
  var PW_HASH = '529740df6896297f915d2640fc45f2ae7459077636d72ec96c5c6dd45b1ddca1';

  function sha256(str) {
    var encoder = new TextEncoder();
    var data = encoder.encode(str);
    return crypto.subtle.digest('SHA-256', data).then(function(buf) {
      var arr = Array.from(new Uint8Array(buf));
      return arr.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
    });
  }

  function showPasswordGate() {
    var gate = document.createElement('div');
    gate.className = 'password-gate';
    gate.id = 'password-gate';
    gate.innerHTML =
      '<div class="pw-box">' +
        '<div class="pw-flag"><div class="pw-flag-stripe"></div><div class="pw-flag-stripe pw-flag-white"></div><div class="pw-flag-stripe"></div></div>' +
        '<div class="pw-title">Investor Relations Portal</div>' +
        '<input type="password" class="pw-input" id="pw-input" placeholder="Enter password">' +
        '<button class="pw-btn" id="pw-btn">Access</button>' +
        '<div class="pw-error" id="pw-error">Incorrect password</div>' +
      '</div>';
    document.body.insertBefore(gate, document.body.firstChild);

    var $input = $('#pw-input');
    var $btn = $('#pw-btn');
    var $error = $('#pw-error');

    function tryPassword() {
      var val = $input.val();
      sha256(val).then(function(hash) {
        if (hash === PW_HASH) {
          sessionStorage.setItem('ir-portal-auth', '1');
          $('#password-gate').addClass('fade-out');
          setTimeout(function() { $('#password-gate').remove(); }, 400);
        } else {
          $error.show();
          $input.val('').focus();
        }
      });
    }

    $btn.on('click', tryPassword);
    $input.on('keypress', function(e) {
      if (e.which === 13) tryPassword();
    });
    setTimeout(function() { $input.focus(); }, 100);
  }

  // Check auth on every page
  if (!sessionStorage.getItem('ir-portal-auth')) {
    $(function() { showPasswordGate(); });
  }

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
