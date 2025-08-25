const acoes = [
      { nome_acao: "MARÇO LILÁS", descricao: "Presidente", foto: "" },
      { nome_acao: "João Souza", descricao: "Vice-Presidente", foto: "https://via.placeholder.com/200x180" },
      { nome_acao: "Ana Costa", descricao: "Secretária", foto: "https://via.placeholder.com/200x180" },
      { nome_acao: "Maria Oliveira", descricao: "Suplente", foto: "https://via.placeholder.com/200x180" }
    ];

    const grid = document.getElementById("cipaGrid");

    // Função que cria os cards
    function montarCIPA() {
      acoes.forEach(acao => {
        const card = document.createElement("div");
        card.classList.add("cardcipa");

        card.innerHTML = `
          <img class="img_cipa" src="${acao.foto}" alt="${acao.nome_acao}">
          <div><h3>${acao.nome_acao}</h3>
          <p>${acao.descricao}</p></div>
        `;

        grid.appendChild(card);
      });
    }

    // Chama a função ao carregar a página
    montarCIPA();