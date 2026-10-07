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

    // -------- Vista de previsualización (?ver=todo) --------
    // Revela los bloques marcados .oculto para poder validarlos.
    // Ver OCULTO.md para el registro de qué está oculto y por qué.
    if (/[?&]ver=todo(&|$)/.test(window.location.search)) {
      $('body').addClass('ver-todo');
      var limpio = window.location.pathname;
      $('body').append(
        '<div class="banda-previsualizacion">' +
        'VISTA INTERNA &mdash; se muestran bloques ocultos (marcados con borde naranja). ' +
        '<a href="' + limpio + '">Ver la versión pública</a></div>'
      );
    }

    // -------- Próximas licitaciones --------
    // Fechas tomadas del cronograma oficial 2026 (las mismas que ya están
    // marcadas en cronograma-2026.html, que replica el calendario publicado
    // por el MECON). Se recalculan solas contra la fecha del día:
    // NO hay que editarlas cada mes.
    // Formato de cada fila: [mesLlamado, diaLlamado, mesLic, diaLic, mesLiq, diaLiq]
    var CRONOGRAMA_2026 = [
      [1,12,1,14,1,16],  [1,26,1,28,1,30],
      [2,9,2,11,2,13],   [2,23,2,25,2,27],
      [3,10,3,12,3,16],  [3,25,3,27,3,31],
      [4,13,4,15,4,17],  [4,24,4,28,4,30],
      [5,11,5,13,5,15],  [5,22,5,27,5,29],
      [6,8,6,10,6,12],   [6,24,6,26,6,30],
      [7,13,7,15,7,17],  [7,27,7,29,7,31],
      [8,10,8,12,8,14],  [8,25,8,27,8,31],
      [9,9,9,11,9,15],   [9,24,9,28,9,30],
      [10,9,10,14,10,16],[10,26,10,28,10,30],
      [11,9,11,11,11,13],[11,24,11,26,11,30],
      [12,9,12,11,12,15]
    ];
    var MES_ES = ['enero','febrero','marzo','abril','mayo','junio','julio',
                  'agosto','septiembre','octubre','noviembre','diciembre'];
    var MES_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var $lic = $('#proximas-licitaciones');
    if ($lic.length) {
      var hoy = new Date();
      var hoy0 = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
      var proximas = [];
      for (var i = 0; i < CRONOGRAMA_2026.length && proximas.length < 3; i++) {
        var f = CRONOGRAMA_2026[i];
        if (new Date(2026, f[2] - 1, f[3]) >= hoy0) { proximas.push(f); }
      }
      if (proximas.length === 0) {
        $lic.html('<p style="font-size:13px; margin:0">' +
          '<span class="lang-en">The 2026 schedule has concluded. The calendar for the ' +
          'following year is published by the Ministry of Economy.</span>' +
          '<span class="lang-es">El cronograma 2026 finalizó. El calendario del año ' +
          'siguiente lo publica el Ministerio de Economía.</span></p>');
      } else {
        var html = '';
        for (var j = 0; j < proximas.length; j++) {
          var p = proximas[j];
          html += '<div class="lic-item">' +
            '<div class="lic-fecha">' +
              '<span class="lang-es">' + p[3] + ' de ' + MES_ES[p[2]-1] + '</span>' +
              '<span class="lang-en">' + MES_EN[p[2]-1] + ' ' + p[3] + '</span>' +
            '</div>' +
            '<div class="lic-detalle">' +
              '<span class="lang-es">Llamado ' + p[1] + '/' + p[0] +
                ' &middot; Liquidación ' + p[5] + '/' + p[4] + '</span>' +
              '<span class="lang-en">Call ' + p[1] + '/' + p[0] +
                ' &middot; Settlement ' + p[5] + '/' + p[4] + '</span>' +
            '</div>' +
          '</div>';
        }
        $lic.html(html);
      }
      setLanguage(currentLang);  // re-aplicar idioma sobre lo recién insertado
    }

    // Bar chart tooltip
    $('.bar').on('mouseenter', function() {
      $(this).find('.bar-value').css('opacity', '1');
    }).on('mouseleave', function() {
      $(this).find('.bar-value').css('opacity', '');
    });
  });

})(jQuery);
