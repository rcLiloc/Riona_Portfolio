const navtoggle = document.getElementById('navtoggle');
  const navlinks = document.getElementById('navlinks');
  navtoggle.addEventListener('click', () => navlinks.classList.toggle('open'));
  navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));

  // reveal sections/cards as they enter the viewport
  const revealTargets = document.querySelectorAll(
    'section:not(#home), .card, .proj-card, .skill-chip, .goal-item, .contact-card, .tl-item'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => revealObserver.observe(el));

  // highlight the nav link for the section currently on screen
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = [...navlinks.querySelectorAll('a')];

  const setActiveLink = () => {
    let current = 'home';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 140) current = section.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };

  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive:true });

  // soft cursor glow for desktop
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => cursorGlow.style.opacity = '0');
  }

  // tiny 3D tilt on project cards
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        `translateY(-3px) perspective(700px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
