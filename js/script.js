
// Aguarda o DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');

  // Segurança: só adiciona eventos se os elementos existirem
  if (!menuToggle || !navList) {
    console.warn('Menu: elementos .menu-toggle ou .nav-list não encontrados.');
    return;
  }

  // Estado inicial de acessibilidade
  menuToggle.setAttribute('aria-expanded', 'false');

  // Função para bloquear/desbloquear rolagem do body (mobile)
  const toggleScrollLock = (lock) => {
    document.documentElement.style.overflow = lock ? 'hidden' : '';
    document.body.style.overflow = lock ? 'hidden' : '';
  };

  // Abre/fecha o menu no clique
  let lockClicks = false;
  menuToggle.addEventListener('click', () => {
    if (lockClicks) return;
    lockClicks = true;

    const isActive = navList.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isActive));
    document.body.classList.toggle('menu-open', isActive);
    toggleScrollLock(isActive);

    // Foco no primeiro link ao abrir (acessibilidade)
    if (isActive) {
      const firstLink = navList.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    setTimeout(() => (lockClicks = false), 200);
  });

  // Fecha ao clicar fora do menu
  document.addEventListener('click', (e) => {
    const clickedOutside =
      !navList.contains(e.target) && !menuToggle.contains(e.target);

    if (clickedOutside && navList.classList.contains('active')) {
      navList.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      toggleScrollLock(false);
    }
  });

  // Fecha com tecla Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('active')) {
      navList.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      toggleScrollLock(false);
      menuToggle.focus(); // retorna o foco para o botão
    }
  });

  // Fecha ao clicar em qualquer link do menu (opcional)
  navList.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && navList.classList.contains('active')) {
      navList.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      toggleScrollLock(false);
    }
  });

  // Acessibilidade extra para teclado (se necessário)
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      menuToggle.click();
    }
  });
});
