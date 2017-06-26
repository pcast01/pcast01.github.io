let menu = document.getElementById('site-nav');
//console.dir(menu);

  const topOfNav = menu.offsetTop;

  function fixNav() {
    //console.log(`scrollY ${window.scrollY} and topOfNav ${topOfNav}`);
    if(window.scrollY >= topOfNav) {
      document.body.style.paddingTop = '0px';
      menu.classList.add('fixed-nav');
      menu.style.width = window.innerWidth + 'px';
      menu.style.left = 0;
      menu.style.top = 0;
    } else {
      //console.log('else');
      menu.classList.remove('fixed-nav');
      menu.style.left = 20;
    }
  }

  window.addEventListener('scroll', fixNav);