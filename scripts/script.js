// ======= DADOS (edite aqui conforme suas ações reais) =======
const ACOES = [
    {
        id: 1,
        data: '2025-01-18',
        titulo: 'Treinamento NR-35 — Trabalho em Altura',
        categoria: 'Treinamento',
        local: 'Unidade Juazeiro',
        descricao: 'Capacitação da equipe operacional com foco em ancoragem, EPIs e resgate. 24 colaboradores treinados.',
        imagem: 'https://images.unsplash.com/photo-1548778943-5dde6c978d39?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: 2,
        data: '2025-02-10',
        titulo: 'Inspeção de Extintores e Sinalização',
        categoria: 'Inspeção',
        local: 'Unidade Petrolina',
        descricao: 'Checagem de validade, pressurização e posicionamento. Atualização de mapas de rota de fuga.',
        imagem: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: 3,
        data: '2025-03-05',
        titulo: 'Campanha: Zero Acidentes — EPIs em 1º lugar',
        categoria: 'Campanha',
        local: 'Todas as unidades',
        descricao: 'Distribuição de materiais visuais, DDS temáticos e auditorias surpresas de uso de EPI.',
        imagem: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: 4,
        data: '2025-04-16',
        titulo: 'Auditoria Interna — NR-12',
        categoria: 'Inspeção',
        local: 'Unidade Alagoinhas',
        descricao: 'Verificação de proteções coletivas, enclausuramento e dispositivos de parada de emergência.',
        imagem: 'https://images.unsplash.com/photo-1581091870622-7c880d3d5b03?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: 5,
        data: '2025-05-09',
        titulo: 'Treinamento Brigada de Incêndio',
        categoria: 'Treinamento',
        local: 'Unidade Paulo Afonso',
        descricao: 'Formação de brigadistas, combate inicial e evacuação. Simulado com o corpo de bombeiros.',
        imagem: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: 6,
        data: '2025-06-20',
        titulo: 'SIPAT — Semana Interna de Prevenção',
        categoria: 'Campanha',
        local: 'Unidade Matriz',
        descricao: 'Palestras, ginástica laboral e stands de saúde ocupacional. 320 participações registradas.',
        imagem: 'https://images.unsplash.com/photo-1549049950-48d5887197fb?q=80&w=1600&auto=format&fit=crop'
    }
];

// ======= UTIL =======
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const fmt = (dateStr) => new Date(dateStr);

// ======= ESTADO E FILTRO =======
const state = { q: '', mes: 'todos', cat: 'todas' };

const cats = [...new Set(ACOES.map(a => a.categoria))];

function applyFilters() {
    const q = state.q.toLowerCase();
    const list = ACOES.filter(a => {
        const m = fmt(a.data).getMonth();
        const passMes = state.mes === 'todos' || Number(state.mes) === m;
        const passCat = state.cat === 'todas' || a.categoria === state.cat;
        const text = (a.titulo + ' ' + a.descricao + ' ' + (a.local || '')).toLowerCase();
        const passQ = !q || text.includes(q);
        return passMes && passCat && passQ;
    }).sort((a, b) => fmt(b.data) - fmt(a.data));
    renderGrid(list);
    renderTimeline(list);
    renderKpis();
}

// ======= RENDER: SELECTS =======
function setupSelects() {
    const selMes = document.getElementById('mes');
    const selCat = document.getElementById('categoria');
    selMes.innerHTML = `<option value="todos">Todos os meses</option>` + MONTHS.map((m, i) => `<option value="${i}">${m}</option>`).join('');
    selCat.innerHTML = `<option value="todas">Todas as categorias</option>` + cats.map(c => `<option>${c}</option>`).join('');
    selMes.addEventListener('change', e => { state.mes = e.target.value; applyFilters(); });
    selCat.addEventListener('change', e => { state.cat = e.target.value; applyFilters(); });
}

// ======= RENDER: KPIs =======

function renderKpis() {
    const total = ACOES.length;
    const trein = ACOES.filter(a => a.categoria === 'Treinamento').length;
    const insp = ACOES.filter(a => a.categoria === 'Inspeção').length;
    const camp = ACOES.filter(a => a.categoria === 'Campanha').length;

    // Preencher os elementos do DOM
    document.getElementById('kpi-total').textContent = total;
    document.getElementById('kpi-trein').textContent = trein;
    document.getElementById('kpi-insp').textContent = insp;
    document.getElementById('kpi-camp').textContent = camp;
}


// ======= RENDER: GRID =======
function renderGrid(list) {
    const grid = document.getElementById('grid');
    if (list.length === 0) {
        grid.innerHTML = `<div class="card" style="grid-column:1/-1">Nenhum resultado com os filtros atuais.</div>`;
        return;
    }
    grid.innerHTML = list.map(a => {
        const d = fmt(a.data);
        return `
          <article class="tile" role="listitem">
            <div class="tile__chip">${MONTHS[d.getMonth()]} • ${d.getDate().toString().padStart(2, '0')}</div>
            <img src="${a.imagem}" alt="${a.titulo} — ${a.local}" loading="lazy" data-id="${a.id}" class="js-open"/>
            <div class="tile__meta">
              <strong>${a.titulo}</strong>
              <span>${a.categoria} • ${a.local || ''}</span>
            </div>
          </article>
        `;
    }).join('');

    // bind modal
    grid.querySelectorAll('.js-open').forEach(img => {
        img.addEventListener('click', () => openModal(Number(img.dataset.id)));
    });
}

// ======= RENDER: TIMELINE =======
function renderTimeline(list) {
    const tl = document.getElementById('timeline');
    tl.innerHTML = list.map(a => {
        const d = fmt(a.data);
        const when = `${d.getDate().toString().padStart(2, '0')} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`;
        return `
          <div class="event" role="listitem">
            <div class="when">${when} • ${a.local || ''}</div>
            <div class="title">${a.titulo} <span style="font-size:12px;color:var(--blue-600);border:1px solid var(--ink-100);padding:2px 6px;border-radius:999px;margin-left:6px;">${a.categoria}</span></div>
            <div class="desc">${a.descricao}</div>
          </div>
        `;
    }).join('');
}

// ======= MODAL =======
function openModal(id) {
    const a = ACOES.find(x => x.id === id);
    if (!a) return;
    document.getElementById('modalTitle').textContent = a.titulo;
    const d = fmt(a.data);
    document.getElementById('modalDesc').textContent = `${a.descricao}\n${a.local ? 'Local: ' + a.local + ' — ' : ''}${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    const img = document.getElementById('modalImg');
    img.src = a.imagem;
    img.alt = a.titulo + ' — ' + (a.local || '');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
}
function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
}

// ======= INIT =======
const ano = new Date().getFullYear();
document.getElementById('anoAtual').textContent = ano;
document.getElementById('y').textContent = ano;

setupSelects();
applyFilters();
renderKpis();

// search + limpar
document.getElementById('q').addEventListener('input', e => { state.q = e.target.value; applyFilters(); });
document.getElementById('limpar').addEventListener('click', () => {
    state.q = ''; state.mes = 'todos'; state.cat = 'todas';
    document.getElementById('q').value = '';
    document.getElementById('mes').value = 'todos';
    document.getElementById('categoria').value = 'todas';
    applyFilters();
});

// modal handlers
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Defina a data de início (AAAA, MM-1, DD) -> Janeiro é 0
const dataInicial = new Date(2025, 0, 1); // 1º de janeiro de 2025

function contadorDias() {
    const hoje = new Date();

    // Zerar horas, minutos, segundos e ms
    const hojeZerado = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const dataInicialZerada = new Date(dataInicial.getFullYear(), dataInicial.getMonth(), dataInicial.getDate());

    const diffTempo = hojeZerado - dataInicialZerada; // diferença em ms
    let diffDias = Math.floor(diffTempo / (1000 * 60 * 60 * 24));

    if (diffDias < 0) diffDias = 0;

    document.getElementById("dias").textContent = diffDias;
}

// Atualiza o contador imediatamente
contadorDias();

// Atualiza a cada minuto
setInterval(contadorDias, 60 * 1000 * 60); // 60.000 ms = 1 minuto