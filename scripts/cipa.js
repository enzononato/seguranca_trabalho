const acoes = [
  { nome_acao: "MARÇO LILÁS", descricao: "Campanha de prevenção", tipo: "video", midia: "/pages/cipa/assets/video_marco_lilas.mp4" },
  { nome_acao: "Dia da Segurança", descricao: "Palestra com especialistas", tipo: "foto", midia: "https://via.placeholder.com/200x180" },
  { nome_acao: "Treinamento CIPA", descricao: "Capacitação dos membros", tipo: "foto", midia: "https://via.placeholder.com/200x180" },
  { nome_acao: "Semana da Saúde", descricao: "Atividades físicas e exames", tipo: "video", midia: "videos/semana_saude.mp4" }
];

const grid = document.getElementById("cipaGrid");

// Função que cria os cards
function montarCIPA() {
  acoes.forEach(acao => {
    const card = document.createElement("div");
    card.classList.add("cardcipa");

    let midiaHTML = "";

    if (acao.tipo === "foto") {
      midiaHTML = `<img class="img_cipa" src="${acao.midia}" alt="${acao.nome_acao}">`;
    } else if (acao.tipo === "video") {
      midiaHTML = `
        <video class="img_cipa" controls>
          <source src="${acao.midia}" type="video/mp4">
          Seu navegador não suporta vídeo.
        </video>`;
    }

    card.innerHTML = `
      ${midiaHTML}
      <div>
        <h3>${acao.nome_acao}</h3>
        <p>${acao.descricao}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Chama a função ao carregar a página
montarCIPA();
