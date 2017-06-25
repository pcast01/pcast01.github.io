let menu = document.getElementById('site-nav');
//document.querySelector(".masthead");
console.dir(menu);

//const nav = document.querySelector('#main');
  const topOfNav = menu.offsetTop;

  function fixNav() {
        console.log(`scrollY ${window.scrollY} and topOfNav ${topOfNav}`);
    if(window.scrollY >= topOfNav) {
      document.body.style.paddingTop = '0px';
      document.body.classList.add('fixed-nav');
      console.log(window.innerWidth);
      menu.style.width = window.innerWidth + 'px';
      menu.style.left = 0;
      menu.style.top = 0;
    } else {
        console.log('else');
      document.body.style.paddingTop = 0;
      document.body.classList.remove('fixed-nav');
      menu.style.left = 20;
    }
  }

  window.addEventListener('scroll', fixNav);