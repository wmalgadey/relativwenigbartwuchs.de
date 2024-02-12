document.addEventListener('DOMContentLoaded', () => {
  const menus = new Map();

  // Functions to open and close the menu
  function openMenu($trigger, $menu) {
    $trigger.classList.add('is-active');

    $menu.style.display = 'block';
    $menu.classList.add('is-active');
    $menu.classList.remove('fade-out-down');
    $menu.classList.add('fade-in-up');

    document.documentElement.classList.add('disable-scroll');

    $trigger.attributes['aria-expanded'].value = 'true';

  }

  function closeMenu($trigger, $menu) {
    $trigger.classList.remove('is-active');

    setTimeout(function () {
      $menu.style.display = 'none';
    }, 550)

    $menu.classList.remove('is-active');
    $menu.classList.remove('fade-in-up');
    $menu.classList.add('fade-out-down');

    document.documentElement.classList.remove('disable-scroll');

    $trigger.attributes['aria-expanded'].value = 'false';
  }

  function toggleMenu($trigger, $target) {
    for (const [menu, trigger] of menus) {
      if (menu === $target) {
        continue;
      }

      trigger.forEach(tr => closeMenu(tr, menu));
    }

    const open = $trigger.attributes['aria-expanded'].value;

    if (open === 'true') {
      closeMenu($trigger, $target)
    } else {
      openMenu($trigger, $target);
    }
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.menu-toggle') || []).forEach(($trigger) => {
    const menu = $trigger.attributes['aria-controls'].value;
    const $target = document.getElementById(menu);

    const trigger = menus.get($target) ?? [];
    trigger.push($trigger);

    menus.set($target, trigger);

    $trigger.addEventListener('click', () => {
      toggleMenu($trigger, $target);
    });
  });
});

return;


var b, c, d, e, f, g, h, i, j, k, l;
b = a("#site-wrapper"),
  c = b.find("#scroll-up"),
  d = b.find("#scroll-to-content"),
  e = b.find("#menu-primary"),
  f = b.find("#menu-primary .wrap"),
  g = b.find("#sidebar-primary"),
  h = b.find("#sidebar-primary .wrap"),
  i = b.find("#menu-button"),
  j = b.find(".main-navigation-toggle"),
  k = b.find("#sidebar-button"),
  l = b.find(".sidebar-primary-toggle"),
  a(window).load(function () {
    a("#status").fadeOut(),
      a("#preloader").delay(350).fadeOut("slow")
  }),
  c.length && smoothScroll.init({
    speed: 800,
    updateURL: !1
  }),
  d.length && smoothScroll.init({
    speed: 800,
    updateURL: !1
  }),
  function () {
    j.length && (j.attr("aria-expanded", "false"),
      e.attr("aria-expanded", "false"),
      j.on("click", function (b) {
        if (a("html").toggleClass("disable-scroll"),
          a("body").toggleClass("main-navigation-open"),
          e.toggleClass("open"),
          e.hasClass("open")) {
          a(e).css("display", "block"),
            a(e).addClass("fadeIn"),
            a(e).removeClass("fadeOut"),
            a(f).addClass("fadeInDown");
          var c, d, g;
          c = e.find("select, input, textarea, button, a").filter(":visible"),
            d = c.first(),
            g = c.last(),
            g.on("keydown", function (a) {
              9 !== a.keyCode || a.shiftKey || (a.preventDefault(),
                d.focus())
            }),
            d.on("keydown", function (a) {
              9 === a.keyCode && a.shiftKey && (a.preventDefault(),
                g.focus())
            })
        } else
          setTimeout(function () {
            a(e).css("display", "none")
          }, 550),
            a(e).addClass("fadeOut"),
            a(e).removeClass("fadeIn"),
            a(f).removeClass("fadeInDown"),
            i.focus();
        j.html(j.html() === MunsaLiteScreenReaderText.expandMenu ? MunsaLiteScreenReaderText.collapseMenu : MunsaLiteScreenReaderText.expandMenu),
          a(j).attr("aria-expanded", "false" === a(j).attr("aria-expanded") ? "true" : "false"),
          a(e).attr("aria-expanded", "false" === a(e).attr("aria-expanded") ? "true" : "false")
      }))
  }(),
  function () {
    l.length && (l.attr("aria-expanded", "false"),
      g.attr("aria-expanded", "false"),
      l.on("click", function (b) {
        if (a("html").toggleClass("disable-scroll"),
          a("body").toggleClass("sidebar-primary-open"),
          g.toggleClass("open"),
          g.hasClass("open")) {
          a(g).css("display", "block"),
            a(g).addClass("fadeIn"),
            a(g).removeClass("fadeOut"),
            a(h).addClass("fadeInDown"),
            a(h).removeClass("fadeOutUp");
          var c, d, e;
          c = g.find("select, input, textarea, button, a").filter(":visible"),
            d = c.first(),
            e = c.last(),
            e.on("keydown", function (a) {
              9 !== a.keyCode || a.shiftKey || (a.preventDefault(),
                d.focus())
            }),
            d.on("keydown", function (a) {
              9 === a.keyCode && a.shiftKey && (a.preventDefault(),
                e.focus())
            })
        } else
          setTimeout(function () {
            a(g).css("display", "none")
          }, 550),
            a(g).addClass("fadeOut"),
            a(g).removeClass("fadeIn"),
            a(h).addClass("fadeOutUp"),
            a(h).removeClass("fadeInDown"),
            k.focus();
        l.html(l.html() === MunsaLiteScreenReaderText.expandSidebar ? MunsaLiteScreenReaderText.collapseSidebar : MunsaLiteScreenReaderText.expandSidebar),
          a(l).attr("aria-expanded", "false" === a(l).attr("aria-expanded") ? "true" : "false"),
          a(g).attr("aria-expanded", "false" === a(g).attr("aria-expanded") ? "true" : "false")
      }))
  }(),
  a(document).keyup(function (b) {
    27 == b.keyCode && (a("body").hasClass("main-navigation-open") ? (a("html").removeClass("disable-scroll"),
      a("body").removeClass("main-navigation-open"),
      e.removeClass("open"),
      setTimeout(function () {
        a(e).css("display", "none")
      }, 550),
      a(e).addClass("fadeOut"),
      a(e).removeClass("fadeIn"),
      a(f).removeClass("fadeInDown"),
      j.html(j.html() === MunsaLiteScreenReaderText.expandMenu ? MunsaLiteScreenReaderText.collapseMenu : MunsaLiteScreenReaderText.expandMenu),
      i.focus(),
      a(j).attr("aria-expanded", "false" === a(j).attr("aria-expanded") ? "true" : "false"),
      a(e).attr("aria-expanded", "false" === a(e).attr("aria-expanded") ? "true" : "false")) : a("body").hasClass("sidebar-primary-open") && (a("html").removeClass("disable-scroll"),
        a("body").removeClass("sidebar-primary-open"),
        g.removeClass("open"),
        setTimeout(function () {
          a(g).css("display", "none")
        }, 550),
        a(g).addClass("fadeOut"),
        a(g).removeClass("fadeIn"),
        a(h).addClass("fadeOutUp"),
        a(h).removeClass("fadeInDown"),
        l.html(l.html() === MunsaLiteScreenReaderText.expandSidebar ? MunsaLiteScreenReaderText.collapseSidebar : MunsaLiteScreenReaderText.expandSidebar),
        k.focus(),
        a(l).attr("aria-expanded", "false" === a(l).attr("aria-expanded") ? "true" : "false"),
        a(g).attr("aria-expanded", "false" === a(g).attr("aria-expanded") ? "true" : "false")))
  })

