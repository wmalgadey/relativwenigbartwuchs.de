document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close the menu
  function openMenu($trigger, $menu) {
    $trigger.classList.add('is-active');

    $menu.style.display = 'block';
    $menu.classList.add('is-active');
  }

  function closeMenu($trigger, $menu) {
    $trigger.classList.remove('is-active');

    $menu.style.display = 'none';
    $menu.classList.remove('is-active');
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.menu-toggle') || []).forEach(($trigger) => {
    const menu = $trigger.attributes['aria-controls'].value;
    const $target = document.getElementById(menu);

    const close = $trigger.attributes['aria-expanded'].value;

    if (close === 'true') {
      $trigger.addEventListener('click', () => {
        closeMenu($trigger, $target);
      });
    } else {
      $trigger.addEventListener('click', () => {
        openMenu($trigger, $target);
      });
    }
  });
});
