/**
 * Portal Administrativo - IBT Admin (Igreja Bíblica da Trindade)
 * Gerenciamento de Membros, Finanças, Escalas de Culto e CMS do Site
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     Dados Iniciais Padrão (Seed Data)
     ========================================================================== */
  
  const defaultMembers = [
    { id: 'm1', name: 'Pr. Marcos de Souza', role: 'Pastor', phone: '(19) 99123-4567', date: '2022-01-15', status: 'Ativo' },
    { id: 'm2', name: 'Presb. Thiago Cintra', role: 'Presbítero', phone: '(19) 99876-5432', date: '2022-03-10', status: 'Ativo' },
    { id: 'm3', name: 'Diác. André Albuquerque', role: 'Diácono/Diaconisa', phone: '(19) 98111-2222', date: '2023-05-20', status: 'Ativo' },
    { id: 'm4', name: 'Diác. Cláudia Rodrigues', role: 'Diácono/Diaconisa', phone: '(19) 98222-3333', date: '2023-05-20', status: 'Ativo' },
    { id: 'm5', name: 'Gabriel Pires (Louvor)', role: 'Membro', phone: '(19) 99333-4444', date: '2022-08-01', status: 'Ativo' },
    { id: 'm6', name: 'Juliana Cintra (Kids)', role: 'Membro', phone: '(19) 99444-5555', date: '2023-01-10', status: 'Ativo' },
    { id: 'm7', name: 'Lucas Silveira (Som)', role: 'Membro', phone: '(19) 99555-6666', date: '2024-02-15', status: 'Ativo' },
    { id: 'm8', name: 'Matheus Fernandes (Mídia)', role: 'Membro', phone: '(19) 99666-7777', date: '2024-03-01', status: 'Ativo' },
    { id: 'm9', name: 'Roberto Godoy', role: 'Visitante', phone: '(19) 98888-9999', date: '2026-05-01', status: 'Ativo' }
  ];

  const defaultFinance = [
    { id: 'f1', date: '2026-06-01', desc: 'Dízimo Congregacional - Culto de Domingo', type: 'entrada', cat: 'Dízimo', val: 4250.00 },
    { id: 'f2', date: '2026-06-05', desc: 'Oferta Especial para Missões Nacionais', type: 'entrada', cat: 'Oferta', val: 1200.00 },
    { id: 'f3', date: '2026-06-08', desc: 'Pagamento de Aluguel do Salão de Cultos', type: 'saida', cat: 'Aluguel/Manutenção', val: 2800.00 },
    { id: 'f4', date: '2026-06-10', desc: 'Conta de Energia Elétrica', type: 'saida', cat: 'Aluguel/Manutenção', val: 450.00 },
    { id: 'f5', date: '2026-06-12', desc: 'Manutenção de Equipamento de Som (Cabos)', type: 'saida', cat: 'Ministério de Som/Música', val: 180.00 },
    { id: 'f6', date: '2026-06-14', desc: 'Dízimos e Ofertas via PIX', type: 'entrada', cat: 'Dízimo', val: 2350.00 }
  ];

  const defaultScales = {};

  const defaultSettings = {
    heroTitle: 'Igreja Bíblica da Trindade',
    heroSubtitle: 'Firmados na Palavra, vivendo em comunidade e proclamando o Evangelho em Pirassununga-SP.',
    pixKey: '61594801000117',
    bankName: '403 – Cora SCFI',
    bankAgency: '0001',
    bankAccount: '6086356-4',
    cultoDomTitle: 'Culto Solene de Adoração',
    cultoDomDesc: 'Nossa principal celebração da semana. Adoração com hinos doutrinários, orações coletivas e pregação expositiva fiel.',
    cultoQuaTitle: 'Estudo Bíblico & Oração',
    cultoQuaDesc: 'Momento devocional focado no estudo aprofundado de temas teológicos e intercessão mútua por nossa comunidade.',
    contactPhone: '(19) 99876-5432',
    addressText: 'Rua Siqueira Campos, 1200 - Centro, Pirassununga - SP',
    instagramUrl: 'https://www.instagram.com/ibt.igreja/'
  };

  // Inicializa o LocalStorage com os dados default se vazios
  function initializeDatabase() {
    if (!localStorage.getItem('ibt_members')) {
      localStorage.setItem('ibt_members', JSON.stringify(defaultMembers));
    }
    if (!localStorage.getItem('ibt_finance')) {
      localStorage.setItem('ibt_finance', JSON.stringify(defaultFinance));
    }
    if (!localStorage.getItem('ibt_scales')) {
      localStorage.setItem('ibt_scales', JSON.stringify(defaultScales));
    }
    if (!localStorage.getItem('ibt_settings')) {
      localStorage.setItem('ibt_settings', JSON.stringify(defaultSettings));
    }
  }

  initializeDatabase();

  /* ==========================================================================
     CMS: Carregamento Inicial no Front da Landing Page
     ========================================================================== */
  function applyCMSSettingsToFront() {
    const settings = JSON.parse(localStorage.getItem('ibt_settings'));
    if (!settings) return;

    // Atualiza Hero
    const heroTitleEl = document.querySelector('.hero-content h1');
    const heroSubtitleEl = document.querySelector('.hero-content p');
    if (heroTitleEl) heroTitleEl.textContent = settings.heroTitle;
    if (heroSubtitleEl) heroSubtitleEl.textContent = settings.heroSubtitle;

    // Atualiza Pix e Dados Bancários
    const pixInputEl = document.getElementById('pixKey');
    if (pixInputEl) pixInputEl.value = settings.pixKey;

    const bankEl = document.querySelector('.transf-item:nth-child(1) .val');
    const agencyEl = document.querySelector('.transf-item:nth-child(2) .val');
    const accountEl = document.querySelector('.transf-item:nth-child(3) .val');
    const cnpjEl = document.querySelector('.transf-item:nth-child(5) .val');

    if (bankEl) bankEl.textContent = settings.bankName;
    if (agencyEl) agencyEl.textContent = settings.bankAgency;
    if (accountEl) accountEl.textContent = settings.bankAccount;
    if (cnpjEl) cnpjEl.textContent = formatCNPJ(settings.pixKey);

    // Atualiza Cultos
    const domTitleEl = document.querySelector('.agenda-item.highlighted .agenda-info h3');
    const domDescEl = document.querySelector('.agenda-item.highlighted .agenda-info p');
    const quaTitleEl = document.querySelector('.agenda-item:not(.highlighted) .agenda-info h3');
    const quaDescEl = document.querySelector('.agenda-item:not(.highlighted) .agenda-info p');

    if (domTitleEl) domTitleEl.textContent = settings.cultoDomTitle;
    if (domDescEl) domDescEl.textContent = settings.cultoDomDesc;
    if (quaTitleEl) quaTitleEl.textContent = settings.cultoQuaTitle;
    if (quaDescEl) quaDescEl.textContent = settings.cultoQuaDesc;

    // Contatos e Rodapé
    const addressDescEl = document.querySelector('.visite-map-wrapper .section-desc');
    const mapCardDescEl = document.querySelector('.map-card p');
    const footerPhoneEl = document.querySelector('.foot-tel');
    const footerAddressEl = document.querySelector('.footer-col:nth-child(2) p');
    const footerInstagramEl = document.querySelector('.footer-socials a[aria-label="Instagram"]');

    if (addressDescEl) addressDescEl.textContent = settings.addressText;
    if (mapCardDescEl) mapCardDescEl.textContent = settings.addressText.split(' - ')[0];
    if (footerPhoneEl) footerPhoneEl.textContent = `WhatsApp: ${settings.contactPhone}`;
    if (footerAddressEl) footerAddressEl.innerHTML = `${settings.addressText.split(' - ')[0]}<br>${settings.addressText.split(' - ')[1] || 'Pirassununga - SP'}`;
    if (footerInstagramEl) footerInstagramEl.href = settings.instagramUrl;
  }

  function formatCNPJ(cnpjRaw) {
    if (cnpjRaw.length !== 14) return cnpjRaw;
    return cnpjRaw.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  }

  // Carrega na montagem
  applyCMSSettingsToFront();

  /* ==========================================================================
     Lógica de Login & Logout do Admin
     ========================================================================== */
  
  const adminOpenLink = document.getElementById('adminOpenLink');
  const adminCloseBtn = document.getElementById('adminCloseBtn');
  const adminLoginModal = document.getElementById('adminLoginModal');
  const closeLoginBtn = document.getElementById('closeLoginBtn');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const loginErrorMsg = document.getElementById('loginErrorMsg');
  const adminDashboard = document.getElementById('adminDashboard');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');

  // Abre Modal de Login
  if (adminOpenLink) {
    adminOpenLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Se já estiver logado na sessão corrente, pula o login e abre direto o dashboard
      if (sessionStorage.getItem('ibt_admin_logged') === 'true') {
        openDashboard();
      } else {
        adminLoginModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Fecha Modal de Login
  if (closeLoginBtn) {
    closeLoginBtn.addEventListener('click', () => {
      adminLoginModal.classList.remove('open');
      document.body.style.overflow = '';
      loginErrorMsg.style.display = 'none';
      adminLoginForm.reset();
    });
  }

  // Submit do Login
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('adminUser').value.trim();
      const pass = document.getElementById('adminPass').value.trim();

      if (user === 'admin' && pass === 'ibt321') {
        sessionStorage.setItem('ibt_admin_logged', 'true');
        adminLoginModal.classList.remove('open');
        loginErrorMsg.style.display = 'none';
        adminLoginForm.reset();
        openDashboard();
      } else {
        loginErrorMsg.style.display = 'block';
      }
    });
  }

  // Abre Dashboard Administrativo
  function openDashboard() {
    adminDashboard.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Inicia na primeira aba
    switchTab('dashboard');
    loadAllDashboardData();
  }

  // Fecha Dashboard e volta ao site
  if (adminCloseBtn) {
    adminCloseBtn.addEventListener('click', closeDashboard);
  }
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('ibt_admin_logged');
      closeDashboard();
    });
  }

  function closeDashboard() {
    adminDashboard.style.display = 'none';
    document.body.style.overflow = '';
    applyCMSSettingsToFront(); // Atualiza front com as possíveis mudanças feitas no CMS
  }

  // Restaura dashboard aberto em caso de refresh e já autenticado
  if (sessionStorage.getItem('ibt_admin_logged') === 'true') {
    openDashboard();
  }

  /* ==========================================================================
     SPA: Navegação por Abas
     ========================================================================== */
  
  const menuItems = document.querySelectorAll('.admin-sidebar .menu-item');
  const tabContents = document.querySelectorAll('.admin-tab-content');
  const adminTabTitle = document.getElementById('adminTabTitle');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabName = item.getAttribute('data-tab');
      
      menuItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      switchTab(tabName);
    });
  });

  function switchTab(tabName) {
    tabContents.forEach(tab => {
      tab.classList.remove('active');
      if (tab.id === `tab-${tabName}`) {
        tab.classList.add('active');
      }
    });

    // Atualiza cabeçalho
    const titlesMap = {
      dashboard: 'Visão Geral do Ministério',
      membros: 'Secretaria: Controle de Membros',
      financeiro: 'Tesouraria: Gestão Financeira',
      escalas: 'Escalas de Voluntários para Cultos',
      cms: 'CMS: Gerenciador de Conteúdo'
    };
    adminTabTitle.textContent = titlesMap[tabName] || 'Painel de Controle';

    // Roda carregamentos específicos da aba
    if (tabName === 'dashboard') loadAllDashboardData();
    if (tabName === 'membros') renderMembersTable();
    if (tabName === 'financeiro') renderFinanceTable();
    if (tabName === 'escalas') loadScalesModule();
    if (tabName === 'cms') loadCMSForm();
  }

  /* ==========================================================================
     Módulo: Visão Geral (Dashboard)
     ========================================================================== */
  
  function loadAllDashboardData() {
    const members = JSON.parse(localStorage.getItem('ibt_members')) || [];
    const finance = JSON.parse(localStorage.getItem('ibt_finance')) || [];
    
    // Atualiza contadores
    document.getElementById('statTotalMembers').textContent = members.filter(m => m.role !== 'Visitante' && m.status === 'Ativo').length;
    
    // Calcula Saldo
    let totalIn = 0;
    let totalOut = 0;
    finance.forEach(f => {
      if (f.type === 'entrada') totalIn += f.val;
      else totalOut += f.val;
    });
    const balance = totalIn - totalOut;
    document.getElementById('statCurrentBalance').textContent = formatCurrency(balance);

    // Contagem de voluntários escalados para o próximo culto
    const scales = JSON.parse(localStorage.getItem('ibt_scales')) || {};
    const nextCultoDate = getNextCultoDate();
    const currentScale = scales[nextCultoDate] || {};
    let volunteerCount = 0;
    if (currentScale.lider) volunteerCount++;
    if (currentScale.som) volunteerCount++;
    if (currentScale.midia) volunteerCount++;
    if (currentScale.transmissao) volunteerCount++;
    if (currentScale.vocal) volunteerCount += currentScale.vocal.length;
    if (currentScale.instrumentos) volunteerCount += currentScale.instrumentos.length;
    if (currentScale.recepcao) volunteerCount += currentScale.recepcao.length;
    if (currentScale.acolhimento) volunteerCount += currentScale.acolhimento.length;
    if (currentScale.professores) volunteerCount += currentScale.professores.length;
    if (currentScale.monitores) volunteerCount += currentScale.monitores.length;
    document.getElementById('statTotalVolunteers').textContent = volunteerCount;

    // Renderiza Gráfico SVG
    renderSVGChart(finance);

    // Feed de atividades
    renderActivityFeed(members, finance);
  }

  function formatCurrency(val) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  }

  function getNextCultoDate() {
    const today = new Date();
    const resultDate = new Date(today);
    
    // Procura o próximo Domingo (dia 0) ou Quarta (dia 3)
    let day = today.getDay();
    let daysToAdd = 0;
    if (day === 0) {
      daysToAdd = 0; // Hoje é domingo
    } else if (day <= 3) {
      daysToAdd = 3 - day; // Próxima quarta
    } else {
      daysToAdd = 7 - day; // Próximo domingo
    }
    
    resultDate.setDate(today.getDate() + daysToAdd);
    return resultDate.toISOString().split('T')[0];
  }

  // Renderiza Gráfico de Caixa em SVG Manual de alta performance
  function renderSVGChart(finance) {
    const container = document.getElementById('financeChartContainer');
    if (!container) return;

    // Agrupa dados por categoria ou últimos lançamentos
    // Criaremos um gráfico simples de barras emparelhadas para os últimos 5 lançamentos
    const lastTransactions = [...finance].slice(-5);
    
    if (lastTransactions.length === 0) {
      container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);">Nenhum lançamento registrado.</div>';
      return;
    }

    let barsHTML = '';
    const maxVal = Math.max(...lastTransactions.map(t => t.val), 1000);
    const chartWidth = 460;
    const chartHeight = 200;
    const barSpacing = chartWidth / lastTransactions.length;

    lastTransactions.forEach((t, i) => {
      const height = (t.val / maxVal) * (chartHeight - 40);
      const x = i * barSpacing + 30;
      const y = chartHeight - height - 20;
      const color = t.type === 'entrada' ? '#02ABCB' : '#EF4444';
      const label = t.desc.length > 15 ? t.desc.slice(0, 15) + '...' : t.desc;

      barsHTML += `
        <!-- Barra -->
        <rect x="${x}" y="${y}" width="30" height="${height}" rx="4" fill="${color}" opacity="0.85">
          <animate attributeName="height" from="0" to="${height}" dur="0.6s" fill="freeze" />
          <animate attributeName="y" from="${chartHeight - 20}" to="${y}" dur="0.6s" fill="freeze" />
        </rect>
        <!-- Texto de Valor -->
        <text x="${x + 15}" y="${y - 6}" font-size="9" fill="#FFF" font-weight="700" text-anchor="middle">R$ ${Math.round(t.val)}</text>
        <!-- Legenda X -->
        <text x="${x + 15}" y="${chartHeight - 2}" font-size="8" fill="var(--text-muted)" text-anchor="middle">${label}</text>
      `;
    });

    container.innerHTML = `
      <svg viewBox="0 0 ${chartWidth} ${chartHeight}" width="100%" height="100%">
        <!-- Linhas de Grade de Fundo -->
        <line x1="20" y1="180" x2="${chartWidth}" y2="180" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="20" y1="120" x2="${chartWidth}" y2="120" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="20" y1="60" x2="${chartWidth}" y2="60" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        
        <!-- Barras e Rótulos -->
        ${barsHTML}
      </svg>
    `;
  }

  // Lista de atividades recentes
  function renderActivityFeed(members, finance) {
    const feed = document.getElementById('activityFeed');
    if (!feed) return;

    // Junta novos membros e lançamentos de caixa
    const items = [];
    members.slice(-4).forEach(m => {
      items.push({
        type: 'member',
        date: m.date,
        desc: `Novo membro cadastrado: <strong>${m.name}</strong> (${m.role})`,
        time: 'Recente'
      });
    });

    finance.slice(-4).forEach(f => {
      const formattedVal = formatCurrency(f.val);
      const isEntrada = f.type === 'entrada';
      items.push({
        type: isEntrada ? 'in' : 'out',
        date: f.date,
        desc: isEntrada 
          ? `Entrada de dízimo/oferta: <strong>${f.desc}</strong> no valor de <strong>${formattedVal}</strong>`
          : `Saída de caixa: <strong>${f.desc}</strong> no valor de <strong>${formattedVal}</strong>`,
        time: f.date.split('-').reverse().slice(0, 2).join('/')
      });
    });

    // Ordena do mais recente
    items.sort((a, b) => new Date(b.date) - new Date(a.date));

    feed.innerHTML = items.slice(0, 5).map(item => `
      <li>
        <span class="activity-icon ${item.type}"></span>
        <div class="activity-desc">${item.desc}</div>
        <span class="activity-time">${item.time}</span>
      </li>
    `).join('');
  }

  /* ==========================================================================
     Módulo: Secretaria (Membros CRUD)
     ========================================================================== */
  
  const addMemberBtn = document.getElementById('addMemberBtn');
  const membroModal = document.getElementById('membroModal');
  const closeMembroModalBtn = document.getElementById('closeMembroModalBtn');
  const membroForm = document.getElementById('membroForm');
  const membersTableBody = document.getElementById('membersTableBody');
  const memberSearch = document.getElementById('memberSearch');
  const memberFilterRole = document.getElementById('memberFilterRole');

  function renderMembersTable() {
    if (!membersTableBody) return;
    const members = JSON.parse(localStorage.getItem('ibt_members')) || [];
    const query = memberSearch.value.toLowerCase().trim();
    const filterRole = memberFilterRole.value;

    const filtered = members.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(query) || m.phone.includes(query);
      const matchesRole = filterRole === 'todos' || m.role === filterRole;
      return matchesSearch && matchesRole;
    });

    membersTableBody.innerHTML = filtered.map(m => {
      const dateFormatted = m.date.split('-').reverse().join('/');
      const roleClass = getRoleClass(m.role);
      
      return `
        <tr>
          <td>
            <strong>${m.name}</strong>
          </td>
          <td>
            <span class="role-badge ${roleClass}">${m.role}</span>
          </td>
          <td>${m.phone}</td>
          <td>${dateFormatted}</td>
          <td>
            <span class="status-indicator ${m.status === 'Ativo' ? 'active' : 'inactive'}">${m.status}</span>
          </td>
          <td>
            <div class="table-actions">
              <button class="action-icon-btn edit-member" data-id="${m.id}" title="Editar Membro">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="action-svg"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
              </button>
              <button class="action-icon-btn delete delete-member" data-id="${m.id}" title="Excluir Membro">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="action-svg"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Adiciona ouvintes de eventos para as ações
    document.querySelectorAll('.edit-member').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openMemberModal(id);
      });
    });

    document.querySelectorAll('.delete-member').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteMember(id);
      });
    });
  }

  function getRoleClass(role) {
    if (role === 'Pastor') return 'pastor';
    if (role === 'Presbítero') return 'presbitero';
    if (role === 'Diácono/Diaconisa') return 'diacono';
    if (role === 'Membro') return 'membro';
    return 'visitante';
  }

  // Busca e Filtros da tabela de membros
  if (memberSearch) memberSearch.addEventListener('input', renderMembersTable);
  if (memberFilterRole) memberFilterRole.addEventListener('change', renderMembersTable);

  // Modais Secretaria
  if (addMemberBtn) {
    addMemberBtn.addEventListener('click', () => openMemberModal());
  }
  if (closeMembroModalBtn) {
    closeMembroModalBtn.addEventListener('click', () => membroModal.classList.remove('open'));
  }

  function openMemberModal(id = null) {
    const modalTitle = document.getElementById('membroModalTitle');
    membroForm.reset();
    document.getElementById('membroId').value = '';

    if (id) {
      modalTitle.textContent = 'Editar Cadastro de Membro';
      const members = JSON.parse(localStorage.getItem('ibt_members')) || [];
      const member = members.find(m => m.id === id);
      if (member) {
        document.getElementById('membroId').value = member.id;
        document.getElementById('membroName').value = member.name;
        document.getElementById('membroRole').value = member.role;
        document.getElementById('membroPhone').value = member.phone;
        document.getElementById('membroDate').value = member.date;
        document.getElementById('membroStatus').value = member.status;
      }
    } else {
      modalTitle.textContent = 'Cadastrar Novo Membro';
      // Seta data atual como default
      document.getElementById('membroDate').value = new Date().toISOString().split('T')[0];
    }
    membroModal.classList.add('open');
  }

  // Submit do Membro (Criar ou Editar)
  if (membroForm) {
    membroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('membroId').value;
      const name = document.getElementById('membroName').value.trim();
      const role = document.getElementById('membroRole').value;
      const phone = document.getElementById('membroPhone').value.trim();
      const date = document.getElementById('membroDate').value;
      const status = document.getElementById('membroStatus').value;

      const members = JSON.parse(localStorage.getItem('ibt_members')) || [];

      if (id) {
        // Editando
        const index = members.findIndex(m => m.id === id);
        if (index !== -1) {
          members[index] = { id, name, role, phone, date, status };
        }
      } else {
        // Criando
        const newId = 'm_' + Date.now();
        members.push({ id: newId, name, role, phone, date, status });
      }

      localStorage.setItem('ibt_members', JSON.stringify(members));
      membroModal.classList.remove('open');
      renderMembersTable();
      updateMembrosSelects(); // Atualiza os selects da aba de escalas
    });
  }

  // Excluir Membro
  function deleteMember(id) {
    const members = JSON.parse(localStorage.getItem('ibt_members')) || [];
    const member = members.find(m => m.id === id);
    if (!member) return;

    if (confirm(`Tem certeza de que deseja excluir o cadastro de "${member.name}"?`)) {
      const updated = members.filter(m => m.id !== id);
      localStorage.setItem('ibt_members', JSON.stringify(updated));
      renderMembersTable();
      updateMembrosSelects(); // Atualiza os selects da aba de escalas
    }
  }

  /* ==========================================================================
     Módulo: Tesouraria (Finanças CRUD)
     ========================================================================== */
  
  const addTransactionBtn = document.getElementById('addTransactionBtn');
  const transacaoModal = document.getElementById('transacaoModal');
  const closeTransacaoModalBtn = document.getElementById('closeTransacaoModalBtn');
  const transacaoForm = document.getElementById('transacaoForm');
  const financeTableBody = document.getElementById('financeTableBody');

  function renderFinanceTable() {
    if (!financeTableBody) return;
    const finance = JSON.parse(localStorage.getItem('ibt_finance')) || [];

    // Calcula os Totais de Lançamentos
    let totalIn = 0;
    let totalOut = 0;
    finance.forEach(f => {
      if (f.type === 'entrada') totalIn += f.val;
      else totalOut += f.val;
    });

    document.getElementById('finTotalIn').textContent = formatCurrency(totalIn);
    document.getElementById('finTotalOut').textContent = formatCurrency(totalOut);

    // Ordena por data decrescente
    const sorted = [...finance].sort((a, b) => new Date(b.date) - new Date(a.date));

    financeTableBody.innerHTML = sorted.map(f => {
      const dateFormatted = f.date.split('-').reverse().join('/');
      const typeBadge = f.type === 'entrada' ? 'entrada' : 'saida';
      const typeLabel = f.type === 'entrada' ? 'Receita' : 'Despesa';
      
      return `
        <tr>
          <td>${dateFormatted}</td>
          <td><strong>${f.desc}</strong></td>
          <td>
            <span class="trans-badge ${typeBadge}">${typeLabel}</span>
          </td>
          <td>${f.cat}</td>
          <td class="${f.type === 'entrada' ? 'text-success' : 'text-danger'}" font-weight="700">
            ${f.type === 'entrada' ? '+' : '-'} ${formatCurrency(f.val)}
          </td>
          <td>
            <div class="table-actions">
              <button class="action-icon-btn edit-transaction" data-id="${f.id}" title="Editar Lançamento">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="action-svg"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
              </button>
              <button class="action-icon-btn delete delete-transaction" data-id="${f.id}" title="Excluir Lançamento">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="action-svg"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Registra eventos das ações financeiras
    document.querySelectorAll('.edit-transaction').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openTransactionModal(id);
      });
    });

    document.querySelectorAll('.delete-transaction').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteTransaction(id);
      });
    });
  }

  // Modais Finanças
  if (addTransactionBtn) {
    addTransactionBtn.addEventListener('click', () => openTransactionModal());
  }
  if (closeTransacaoModalBtn) {
    closeTransacaoModalBtn.addEventListener('click', () => transacaoModal.classList.remove('open'));
  }

  function openTransactionModal(id = null) {
    const modalTitle = document.getElementById('transacaoModalTitle');
    transacaoForm.reset();
    document.getElementById('transacaoId').value = '';

    if (id) {
      modalTitle.textContent = 'Editar Lançamento Financeiro';
      const finance = JSON.parse(localStorage.getItem('ibt_finance')) || [];
      const item = finance.find(f => f.id === id);
      if (item) {
        document.getElementById('transacaoId').value = item.id;
        document.getElementById('transDesc').value = item.desc;
        document.getElementById('transType').value = item.type;
        document.getElementById('transCat').value = item.cat;
        document.getElementById('transDate').value = item.date;
        document.getElementById('transVal').value = item.val;
      }
    } else {
      modalTitle.textContent = 'Registrar Lançamento Financeiro';
      document.getElementById('transDate').value = new Date().toISOString().split('T')[0];
    }
    transacaoModal.classList.add('open');
  }

  // Submit de Transação (Criar ou Editar)
  if (transacaoForm) {
    transacaoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('transacaoId').value;
      const desc = document.getElementById('transDesc').value.trim();
      const type = document.getElementById('transType').value;
      const cat = document.getElementById('transCat').value;
      const date = document.getElementById('transDate').value;
      const val = parseFloat(document.getElementById('transVal').value);

      const finance = JSON.parse(localStorage.getItem('ibt_finance')) || [];

      if (id) {
        // Editar
        const index = finance.findIndex(f => f.id === id);
        if (index !== -1) {
          finance[index] = { id, desc, type, cat, date, val };
        }
      } else {
        // Criar
        const newId = 'f_' + Date.now();
        finance.push({ id: newId, desc, type, cat, date, val });
      }

      localStorage.setItem('ibt_finance', JSON.stringify(finance));
      transacaoModal.classList.remove('open');
      renderFinanceTable();
    });
  }

  // Excluir Transação
  function deleteTransaction(id) {
    const finance = JSON.parse(localStorage.getItem('ibt_finance')) || [];
    const item = finance.find(f => f.id === id);
    if (!item) return;

    if (confirm(`Tem certeza de que deseja excluir o lançamento de "${item.desc}" no valor de R$ ${item.val}?`)) {
      const updated = finance.filter(f => f.id !== id);
      localStorage.setItem('ibt_finance', JSON.stringify(updated));
      renderFinanceTable();
    }
  }

  /* ==========================================================================
     Módulo: Escala de Voluntários
     ========================================================================== */
  
  const scaleCultoDate = document.getElementById('scaleCultoDate');
  const saveScaleBtn = document.getElementById('saveScaleBtn');

  function loadScalesModule() {
    populateCultoDates();
    updateMembrosSelects();
    loadScaleForSelectedDate();
  }

  // Popula os próximos 4 domingos e 4 quartas-feiras
  function populateCultoDates() {
    if (!scaleCultoDate) return;
    const options = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = date.getDay();
      
      // Filtra Domingos (0) e Quartas (3)
      if (day === 0 || day === 3) {
        const valStr = date.toISOString().split('T')[0];
        const labelStr = date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' });
        options.push(`<option value="${valStr}">${labelStr} (${valStr})</option>`);
      }
      
      // Limita a 8 opções de datas futuras
      if (options.length >= 8) break;
    }
    
    scaleCultoDate.innerHTML = options.join('');
  }

  // Preenche todos os inputs do formulário com a lista de membros cadastrados
  function updateMembrosSelects() {
    const members = JSON.parse(localStorage.getItem('ibt_members')) || [];
    const selectInputs = document.querySelectorAll('.member-select-input');

    selectInputs.forEach(select => {
      const isMultiple = select.hasAttribute('multiple');
      const savedValues = Array.from(select.selectedOptions).map(o => o.value);
      
      let html = isMultiple ? '' : '<option value="">-- Selecione --</option>';
      members.forEach(m => {
        if (m.status === 'Ativo' && m.role !== 'Visitante') {
          html += `<option value="${m.id}">${m.name}</option>`;
        }
      });
      select.innerHTML = html;

      // Restaura seleção anterior se aplicável
      if (savedValues.length > 0) {
        Array.from(select.options).forEach(opt => {
          if (savedValues.includes(opt.value)) {
            opt.selected = true;
          }
        });
      }
    });
  }

  // Monitora mudança na data do culto para carregar a escala daquele dia
  if (scaleCultoDate) {
    scaleCultoDate.addEventListener('change', loadScaleForSelectedDate);
  }

  function loadScaleForSelectedDate() {
    if (!scaleCultoDate) return;
    const date = scaleCultoDate.value;
    const scales = JSON.parse(localStorage.getItem('ibt_scales')) || {};
    const scale = scales[date] || {};

    // Seta os valores correspondentes nos inputs
    setSelectValue('scaleLider', scale.lider);
    setSelectValueMultiple('scaleVocal', scale.vocal);
    setSelectValueMultiple('scaleInstrumentos', scale.instrumentos);
    setSelectValue('scaleSom', scale.som);
    setSelectValue('scaleMidia', scale.midia);
    setSelectValue('scaleTransmissao', scale.transmissao);
    setSelectValueMultiple('scaleRecepcao', scale.recepcao);
    setSelectValueMultiple('scaleAcolhimento', scale.acolhimento);
    setSelectValueMultiple('scaleProfessores', scale.professores);
    setSelectValueMultiple('scaleMonitores', scale.monitores);
  }

  function setSelectValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value || '';
  }

  function setSelectValueMultiple(id, valuesArr) {
    const el = document.getElementById(id);
    if (!el) return;
    Array.from(el.options).forEach(opt => {
      opt.selected = valuesArr && valuesArr.includes(opt.value);
    });
  }

  // Salvar Escala de Culto
  if (saveScaleBtn) {
    saveScaleBtn.addEventListener('click', () => {
      const date = scaleCultoDate.value;
      const scales = JSON.parse(localStorage.getItem('ibt_scales')) || {};

      scales[date] = {
        lider: document.getElementById('scaleLider').value,
        vocal: getMultipleSelectValues('scaleVocal'),
        instrumentos: getMultipleSelectValues('scaleInstrumentos'),
        som: document.getElementById('scaleSom').value,
        midia: document.getElementById('scaleMidia').value,
        transmissao: document.getElementById('scaleTransmissao').value,
        recepcao: getMultipleSelectValues('scaleRecepcao'),
        acolhimento: getMultipleSelectValues('scaleAcolhimento'),
        professores: getMultipleSelectValues('scaleProfessores'),
        monitores: getMultipleSelectValues('scaleMonitores')
      };

      localStorage.setItem('ibt_scales', JSON.stringify(scales));
      alert('Escala do culto salva com sucesso para a data: ' + date);
    });
  }

  function getMultipleSelectValues(id) {
    const el = document.getElementById(id);
    if (!el) return [];
    return Array.from(el.selectedOptions).map(option => option.value);
  }

  /* ==========================================================================
     Módulo: CMS do Site (Gerenciamento de Conteúdo)
     ========================================================================== */
  
  const cmsSettingsForm = document.getElementById('cmsSettingsForm');
  const cmsResetBtn = document.getElementById('cmsResetBtn');

  function loadCMSForm() {
    if (!cmsSettingsForm) return;
    const settings = JSON.parse(localStorage.getItem('ibt_settings')) || defaultSettings;

    document.getElementById('cmsHeroTitle').value = settings.heroTitle;
    document.getElementById('cmsHeroSubtitle').value = settings.heroSubtitle;
    document.getElementById('cmsPixKey').value = settings.pixKey;
    document.getElementById('cmsBankName').value = settings.bankName;
    document.getElementById('cmsBankAgency').value = settings.bankAgency;
    document.getElementById('cmsBankAccount').value = settings.bankAccount;
    document.getElementById('cmsCultoDomTitle').value = settings.cultoDomTitle;
    document.getElementById('cmsCultoDomDesc').value = settings.cultoDomDesc;
    document.getElementById('cmsCultoQuaTitle').value = settings.cultoQuaTitle;
    document.getElementById('cmsCultoQuaDesc').value = settings.cultoQuaDesc;
    document.getElementById('cmsContactPhone').value = settings.contactPhone;
    document.getElementById('cmsAddressText').value = settings.addressText;
    document.getElementById('cmsInstagramUrl').value = settings.instagramUrl;
  }

  // Salvar CMS
  if (cmsSettingsForm) {
    cmsSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const newSettings = {
        heroTitle: document.getElementById('cmsHeroTitle').value.trim(),
        heroSubtitle: document.getElementById('cmsHeroSubtitle').value.trim(),
        pixKey: document.getElementById('cmsPixKey').value.trim(),
        bankName: document.getElementById('cmsBankName').value.trim(),
        bankAgency: document.getElementById('cmsBankAgency').value.trim(),
        bankAccount: document.getElementById('cmsBankAccount').value.trim(),
        cultoDomTitle: document.getElementById('cmsCultoDomTitle').value.trim(),
        cultoDomDesc: document.getElementById('cmsCultoDomDesc').value.trim(),
        cultoQuaTitle: document.getElementById('cmsCultoQuaTitle').value.trim(),
        cultoQuaDesc: document.getElementById('cmsCultoQuaDesc').value.trim(),
        contactPhone: document.getElementById('cmsContactPhone').value.trim(),
        addressText: document.getElementById('cmsAddressText').value.trim(),
        instagramUrl: document.getElementById('cmsInstagramUrl').value.trim()
      };

      localStorage.setItem('ibt_settings', JSON.stringify(newSettings));
      applyCMSSettingsToFront(); // Atualiza na hora o site visível
      alert('Configurações do site salvas com sucesso! As alterações já estão visíveis na landing page.');
    });
  }

  // Resetar padrões
  if (cmsResetBtn) {
    cmsResetBtn.addEventListener('click', () => {
      if (confirm('Tem certeza de que deseja restaurar todos os textos e chaves PIX para os padrões de código da IBT?')) {
        localStorage.setItem('ibt_settings', JSON.stringify(defaultSettings));
        loadCMSForm();
        applyCMSSettingsToFront();
        alert('Configurações restauradas para o padrão com sucesso!');
      }
    });
  }

});
