document.addEventListener('DOMContentLoaded', () => {
  // Seleção de elementos do DOM
  const header = document.getElementById('mainHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const menuOverlay = document.getElementById('menuOverlay');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  /* ==========================================================================
     Efeito Scroll Shrink (Navbar Sticky)
     ========================================================================== */
  let lastKnownScrollPosition = 0;
  let ticking = false;

  function handleScroll(scrollPos) {
    // Adiciona classe .shrink após rolar 50px
    if (scrollPos > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  }

  window.addEventListener('scroll', () => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  });

  // Executa uma vez no início caso a página já seja carregada com scroll
  handleScroll(window.scrollY);

  /* ==========================================================================
     Menu Responsivo Mobile (Hambúrguer & Overlay)
     ========================================================================== */
  function toggleMenu() {
    const isOpen = mobileMenuBtn.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    menuOverlay.classList.toggle('open', isOpen);
    
    // Impede a rolagem do body com o menu aberto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeMenu() {
    mobileMenuBtn.classList.remove('open');
    navLinks.classList.remove('open');
    menuOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Ouvintes de evento para o menu
  mobileMenuBtn.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', closeMenu);

  // Fecha o menu ao clicar em qualquer item de navegação (âncora)
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Atualiza a classe active para feedback visual
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // Fecha o menu se for mobile
      closeMenu();
    });
  });

  /* ==========================================================================
     Destaque Ativo Dinâmico ao Rolar (Scroll Spy - Opcional Premium)
     ========================================================================== */
  const sections = document.querySelectorAll('main section');
  
  function scrollSpy() {
    const scrollPos = window.scrollY + 150; // Offset para detectar antes de chegar ao topo absoluto
    
    sections.forEach(section => {
      if (section.id) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        
        if (scrollPos >= top && scrollPos < top + height) {
          navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${section.id}`) {
              item.classList.add('active');
            }
          });
        }
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        scrollSpy();
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ==========================================================================
     Cópia de Chave PIX (Fase 5)
     ========================================================================== */
  const pixKeyInput = document.getElementById('pixKey');
  const copyPixBtn = document.getElementById('copyPixBtn');
  const copySuccessMsg = document.getElementById('copySuccessMsg');

  if (copyPixBtn && pixKeyInput) {
    copyPixBtn.addEventListener('click', () => {
      const pixKey = pixKeyInput.value;
      
      navigator.clipboard.writeText(pixKey).then(() => {
        // Feedback visual no botão
        const btnText = copyPixBtn.querySelector('span');
        const originalText = btnText.textContent;
        btnText.textContent = 'Copiado!';
        copyPixBtn.classList.add('copied');
        
        // Exibe mensagem de sucesso
        copySuccessMsg.classList.add('show');
        
        // Reseta o estado após 3 segundos
        setTimeout(() => {
          btnText.textContent = originalText;
          copyPixBtn.classList.remove('copied');
          copySuccessMsg.classList.remove('show');
        }, 3000);
      }).catch(err => {
        console.error('Erro ao copiar chave PIX: ', err);
      });
    });
  }

  /* ==========================================================================
     Intersection Observer para Scroll Reveal (Fase 2 a 5)
     ========================================================================== */
  const revealElements = [
    'section h2',
    '.valor-card',
    '.quem-somos-img-container',
    '.quem-somos-content',
    '.gov-badge',
    '.ministerio-card',
    '.teologia-title-block',
    '.credos-list li',
    '.downloads-card',
    '.agenda-item',
    '.visite-map-container',
    '.contribuir-box'
  ];

  // Adiciona a classe .reveal a todos os seletores e configura os delays de cascata nos cards
  revealElements.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      el.classList.add('reveal');
      
      // Adiciona delay de cascata para elementos filhos de grids/listas
      if (selector.includes('card') || selector.includes('badge') || selector.includes('item') || selector.includes('li')) {
        const delayClass = `reveal-delay-${(index % 4) + 1}`;
        el.classList.add(delayClass);
      }
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Começa a observar os elementos configurados
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
});
