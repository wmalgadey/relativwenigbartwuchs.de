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

