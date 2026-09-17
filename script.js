/* ===================================================================== */
//   SCORERAID — LÓGICA DO JOGO (v4)
//  JavaScript puro, sem dependências externas.
//  TEMAS e BANCO_PERGUNTAS agora vêm de data.js (carregado antes deste arquivo).
/* ===================================================================== */

/* ----------------------------------------------------------------------
   1) CONFIGURAÇÕES GERAIS DO JOGO
---------------------------------------------------------------------- */
const PONTOS_INICIAIS = 30;
const TOTAL_RODADAS = 6;
const PERGUNTAS_POR_RODADA = 6;
const VALOR_OFENSIVA = 20;
const DURACAO_CRONOMETRO = 10;
const PESO_ANIME = 2; // anime tem o dobro de chance de aparecer que os outros temas
const TOTAL_PERGUNTAS_DESEMPATE = 3;
const CHAVE_LOCALSTORAGE_RODADA = "scoreraid_rodada_atual";
const RODADAS_COM_EVENTO = [2, 4, 6]; // dispara o Evento Especial logo antes destas rodadas começarem
const PONTOS_GANHO_EVENTO = 20;
const PONTOS_PERDA_EVENTO = 40;

const VALOR_POR_DIFICULDADE = { facil: 10, dificil: 20 };
const CORES_GRUPO = ["cor-1", "cor-2", "cor-3"];

/* ----------------------------------------------------------------------
   2) ESTADO DO JOGO
---------------------------------------------------------------------- */
let estado = {
  grupos: [],
  rodadaAtual: 1,
  perguntaAtualIndex: 0,
  temasUsadosRodadaAnterior: [],   // usado só na rodada final (montarPerguntasDaRodada)
  temasUsadosNestaRodada: [],      // evita repetir tema dentro da mesma rodada normal
  temaEscolhidoAtual: null,        // tema decidido na roleta antes de montar a pergunta
  ehUltimaDaRodadaAtual: false,    // marca se a próxima pergunta é a Ofensiva da rodada
  perguntaAtual: null,             // pergunta em exibição (rodadas normais e final)
  perguntasDaRodada: [],           // usado só na rodada final
  perguntasUsadasIds: new Set(),
  gruposQueJaErraramNestaPergunta: [],
  grupoQueAcertou: null,

  // ---- Desempate ----
  modoDesempate: false,
  gruposDesempateIdx: [],
  perguntaDesempateIndex: 0,
  acertosDesempate: {},
  vencedorDesempateIdx: null,

  // ---- Evento Especial ----
  bagEventoGrupos: [],       // grupos ainda não sorteados para o evento (embaralhado)
  grupoEventoAtual: null,
  cartaBoaEvento: null,      // índice (0 ou 1) da carta que dá +20 nesta rodada de evento
  variacaoAntesDoEvento: [0, 0, 0],
};

let idIntervaloCronometro = null;
let variacaoPendente = [0, 0, 0];

/* ----------------------------------------------------------------------
   3) ELEMENTOS DO DOM / TELAS
---------------------------------------------------------------------- */
const telas = {
  inicio: document.getElementById("tela-inicio"),
  placar: document.getElementById("tela-placar"),
  evento: document.getElementById("tela-evento"),
  roleta: document.getElementById("tela-roleta"),
  cartas: document.getElementById("tela-cartas"),
  pergunta: document.getElementById("tela-pergunta"),
  final: document.getElementById("tela-final"),
  frase: document.getElementById("tela-frase"),
};

function mostrarTela(nome) {
  Object.values(telas).forEach(t => t.classList.remove("ativa"));
  telas[nome].classList.add("ativa");

  const sidebar = document.getElementById("barra-lateral-placar");
  const precisaSidebar = ["placar", "evento", "roleta", "cartas", "pergunta"].includes(nome);
  sidebar.classList.toggle("oculto", !precisaSidebar);
  document.body.classList.toggle("com-sidebar", precisaSidebar);
}

/* ----------------------------------------------------------------------
   3.1) BROADCAST DA PERGUNTA/RESPOSTA PARA respostas.html (via localStorage)
---------------------------------------------------------------------- */
function transmitirPerguntaAtual() {
  const pergunta = estado.perguntaAtual;
  if (!pergunta) return;
  try {
    localStorage.setItem(CHAVE_LOCALSTORAGE_RODADA, JSON.stringify({
      enunciado: pergunta.enunciado,
      resposta: pergunta.alternativas[pergunta.correta],
    }));
  } catch (e) {
    // localStorage indisponível (ex: modo privado) — falha silenciosa, não afeta o jogo
  }
}

function limparPerguntaTransmitida() {
  try {
    localStorage.removeItem(CHAVE_LOCALSTORAGE_RODADA);
  } catch (e) {}
}

/* ----------------------------------------------------------------------
   4) FUNÇÕES AUXILIARES DE SORTEIO
---------------------------------------------------------------------- */
function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function obterTemaPorId(id) { return TEMAS.find(t => t.id === id); }

function sortearTemasDaRodada() {
  // usado só para a rodada final (mantém o comportamento antigo)
  let temasDisponiveis = TEMAS.map(t => t.id);
  let temasPreferidos = temasDisponiveis.filter(id => !estado.temasUsadosRodadaAnterior.includes(id));
  let poolEscolha = temasPreferidos.length >= PERGUNTAS_POR_RODADA ? temasPreferidos : temasDisponiveis;
  const escolhidos = embaralhar(poolEscolha).slice(0, PERGUNTAS_POR_RODADA);
  estado.temasUsadosRodadaAnterior = escolhidos;
  return escolhidos;
}

function sortearPerguntaDoTema(temaId, dificuldadeFiltro) {
  const combina = p => p.tema === temaId && (!dificuldadeFiltro || p.dificuldade === dificuldadeFiltro);

  const candidatas = BANCO_PERGUNTAS
    .map((p, idx) => ({ ...p, _idx: idx }))
    .filter(p => combina(p) && !estado.perguntasUsadasIds.has(p._idx));

  const pool = candidatas.length > 0
    ? candidatas
    : BANCO_PERGUNTAS.map((p, idx) => ({ ...p, _idx: idx })).filter(combina);

  const escolhida = pool[Math.floor(Math.random() * pool.length)];
  estado.perguntasUsadasIds.add(escolhida._idx);
  return escolhida;
}

function construirPoolPonderado(excluirIds) {
  let pool = [];
  TEMAS.forEach(t => {
    if (excluirIds.includes(t.id)) return;
    const peso = t.id === "anime" ? PESO_ANIME : 1;
    for (let i = 0; i < peso; i++) pool.push(t.id);
  });
  if (pool.length === 0) {
    // já usou todos os temas na rodada: libera repetir
    TEMAS.forEach(t => {
      const peso = t.id === "anime" ? PESO_ANIME : 1;
      for (let i = 0; i < peso; i++) pool.push(t.id);
    });
  }
  return pool;
}

function sortearTemaPonderado(excluirIds) {
  const pool = construirPoolPonderado(excluirIds);
  return pool[Math.floor(Math.random() * pool.length)];
}

function sortearTemasParaCartas(excluirIds, quantidade) {
  const escolhidos = [];
  let excluidosAtuais = [...excluirIds];
  for (let i = 0; i < quantidade; i++) {
    const id = sortearTemaPonderado(excluidosAtuais);
    escolhidos.push(id);
    excluidosAtuais.push(id); // não repete entre as cartas desta rodada de escolha
  }
  return escolhidos;
}

function sortearTipoSelecao() {
  return Math.random() < 0.5 ? "roleta" : "cartas";
}

function montarPerguntaAtual(temaId, ehOfensiva) {
  const p = sortearPerguntaDoTema(temaId);
  return { ...p, ehOfensiva };
}

function montarPerguntasDaRodada() {
  // usado só na rodada final: só tema Curiosidades, só nível difícil, toda pergunta é Ofensiva
  const perguntas = [];
  for (let i = 0; i < PERGUNTAS_POR_RODADA; i++) {
    const p = sortearPerguntaDoTema("curiosidades", "dificil");
    perguntas.push({ ...p, ehOfensiva: true });
  }
  estado.temasUsadosRodadaAnterior = ["curiosidades"];
  return perguntas;
}

function pontosDaPergunta(pergunta) {
  if (pergunta.ehOfensiva) return VALOR_OFENSIVA;
  return VALOR_POR_DIFICULDADE[pergunta.dificuldade] || 10;
}

function registrarTemaUsado(temaId) {
  if (!estado.temasUsadosNestaRodada.includes(temaId)) {
    estado.temasUsadosNestaRodada.push(temaId);
  }
}

/* ----------------------------------------------------------------------
   5) TELA INÍCIO -> COMEÇAR JOGO
---------------------------------------------------------------------- */
document.getElementById("btn-comecar").addEventListener("click", () => {
  const nome1 = document.getElementById("input-equipe-1").value.trim() || "Equipe 1";
  const nome2 = document.getElementById("input-equipe-2").value.trim() || "Equipe 2";
  const nome3 = document.getElementById("input-equipe-3").value.trim() || "Equipe 3";

  estado.grupos = [
    { nome: nome1, pontos: PONTOS_INICIAIS },
    { nome: nome2, pontos: PONTOS_INICIAIS },
    { nome: nome3, pontos: PONTOS_INICIAIS },
  ];
  estado.rodadaAtual = 1;
  estado.perguntaAtualIndex = 0;
  estado.temasUsadosRodadaAnterior = [];
  estado.temasUsadosNestaRodada = [];
  estado.perguntasUsadasIds = new Set();
  estado.perguntasDaRodada = []; // só é preenchido quando chegar na rodada final

  estado.modoDesempate = false;
  estado.gruposDesempateIdx = [];
  estado.perguntaDesempateIndex = 0;
  estado.acertosDesempate = {};
  estado.vencedorDesempateIdx = null;

  estado.bagEventoGrupos = [];
  estado.grupoEventoAtual = null;
  estado.cartaBoaEvento = null;
  estado.variacaoAntesDoEvento = [0, 0, 0];

  limparPerguntaTransmitida();

  renderizarPlacar();
  renderizarSidebar();
  mostrarTela("placar");
});

/* ----------------------------------------------------------------------
   6) SIDEBAR FIXA DE PLACAR
---------------------------------------------------------------------- */
function renderizarSidebar(destaqueIdx) {
  document.getElementById("bl-rodada").textContent = estado.modoDesempate
    ? "Rodada de Desempate"
    : `Rodada ${estado.rodadaAtual} de ${TOTAL_RODADAS}`;

  const marcadores = document.getElementById("bl-pontos-rodadas");
  marcadores.innerHTML = "";
  for (let i = 1; i <= TOTAL_RODADAS; i++) {
    const m = document.createElement("div");
    m.className = "bl-marcador";
    if (i < estado.rodadaAtual) m.classList.add("concluida");
    if (i === estado.rodadaAtual) m.classList.add("atual");
    marcadores.appendChild(m);
  }

  const lista = document.getElementById("bl-lista-grupos");
  lista.innerHTML = "";
  estado.grupos.forEach((grupo, idx) => {
    const card = document.createElement("div");
    card.className = `bl-card-grupo ${CORES_GRUPO[idx]}` + (destaqueIdx === idx ? " destaque" : "");
    card.innerHTML = `
      <div class="bl-nome-grupo">${grupo.nome}</div>
      <div class="bl-pontos-grupo">${grupo.pontos}</div>
    `;
    lista.appendChild(card);
  });
}

/* ----------------------------------------------------------------------
   7) TELA PLACAR
---------------------------------------------------------------------- */
function renderizarPlacar(ultimaVariacao) {
  document.getElementById("indicador-rodada-placar").textContent =
    `Rodada ${estado.rodadaAtual} de ${TOTAL_RODADAS}`;

  const grade = document.getElementById("grade-placar");
  grade.innerHTML = "";
  estado.grupos.forEach((grupo, idx) => {
    const card = document.createElement("div");
    card.className = `cartao-placar-equipe ${CORES_GRUPO[idx]}`;

    const variacao = ultimaVariacao && ultimaVariacao[idx] ? ultimaVariacao[idx] : 0;
    let textoVariacao = "";
    let classeVariacao = "";
    if (variacao > 0) { textoVariacao = `▲ +${variacao}`; classeVariacao = "positiva"; }
    else if (variacao < 0) { textoVariacao = `▼ ${variacao}`; classeVariacao = "negativa"; }

    card.innerHTML = `
      <div class="nome-equipe-placar">${grupo.nome}</div>
      <div class="valor-pontos">${grupo.pontos}</div>
      <div class="variacao-pontos ${classeVariacao}">${textoVariacao}</div>
    `;
    grade.appendChild(card);
  });

  renderizarSidebar();
}

document.getElementById("btn-proxima-pergunta").addEventListener("click", () => {
  prepararProximaPergunta();
});

/* ----------------------------------------------------------------------
   8) DECISÃO: ROLETA OU CARTAS (por pergunta)
---------------------------------------------------------------------- */
function prepararProximaPergunta() {
  const ehRodadaFinal = estado.rodadaAtual === TOTAL_RODADAS;

  if (ehRodadaFinal) {
    if (estado.perguntasDaRodada.length === 0) {
      estado.perguntasDaRodada = montarPerguntasDaRodada();
    }
    estado.temaEscolhidoAtual = estado.perguntasDaRodada[estado.perguntaAtualIndex].tema;
    prepararTelaRoleta();
    mostrarTela("roleta");
    return;
  }

  const ehUltimaDaRodada = estado.perguntaAtualIndex === PERGUNTAS_POR_RODADA - 1;
  estado.ehUltimaDaRodadaAtual = ehUltimaDaRodada;
  const tipoSelecao = sortearTipoSelecao();

  if (tipoSelecao === "roleta") {
    estado.temaEscolhidoAtual = sortearTemaPonderado(estado.temasUsadosNestaRodada);
    prepararTelaRoleta();
    mostrarTela("roleta");
  } else {
    const opcoes = sortearTemasParaCartas(estado.temasUsadosNestaRodada, 3);
    prepararTelaCartas(opcoes);
    mostrarTela("cartas");
  }
}

/* ----------------------------------------------------------------------
   9) TELA ROLETA DE TEMAS
---------------------------------------------------------------------- */
function prepararTelaRoleta() {
  construirRoleta();
  document.getElementById("resultado-roleta").classList.add("oculto");
  document.getElementById("btn-girar-roleta").classList.remove("oculto");
  document.getElementById("btn-ver-pergunta").classList.add("oculto");

  const roleta = document.getElementById("roleta");
  roleta.style.transition = "none";
  roleta.style.transform = "rotate(0deg)";
  void roleta.offsetWidth; // força reflow para o próximo giro já aplicar a transição
  roleta.style.transition = "";
}

function construirRoleta() {
  const roleta = document.getElementById("roleta");
  roleta.innerHTML = "";

  const ehRodadaFinal = estado.rodadaAtual === TOTAL_RODADAS;
  const coresEspeciais = ["#ff4d5e", "#e8283b", "#c81326", "#ff6b6b", "#a8001b", "#ff2e43"];
  const temaCuriosidades = obterTemaPorId("curiosidades");

  const fatias = ehRodadaFinal
    ? Array.from({ length: PERGUNTAS_POR_RODADA }, () => temaCuriosidades)
    : TEMAS;

  const seg = 360 / fatias.length;

  let partesGradiente = [];
  fatias.forEach((tema, i) => {
    const cor = ehRodadaFinal ? coresEspeciais[i % coresEspeciais.length] : tema.cor;
    partesGradiente.push(`${cor} ${i * seg}deg ${(i + 1) * seg}deg`);
  });
  roleta.style.background = `conic-gradient(${partesGradiente.join(",")})`;

  fatias.forEach((tema, i) => {
    const anguloCentro = i * seg + seg / 2;
    const fatia = document.createElement("div");
    fatia.className = "fatia-roleta";
    fatia.style.transform = `rotate(${anguloCentro}deg)`;
    fatia.innerHTML = `<span style="transform: rotate(${-anguloCentro}deg); display:inline-block;">${tema.icone}</span>`;
    roleta.appendChild(fatia);
  });
}

document.getElementById("btn-girar-roleta").addEventListener("click", () => {
  const ehRodadaFinal = estado.rodadaAtual === TOTAL_RODADAS;
  const indexAlvo = ehRodadaFinal
    ? estado.perguntaAtualIndex
    : TEMAS.findIndex(t => t.id === estado.temaEscolhidoAtual);
  const totalFatias = ehRodadaFinal ? PERGUNTAS_POR_RODADA : TEMAS.length;
  girarRoletaAte(indexAlvo, totalFatias);
});

function girarRoletaAte(indexAlvo, totalFatias) {
  document.getElementById("btn-girar-roleta").classList.add("oculto");

  const roleta = document.getElementById("roleta");
  const seg = 360 / totalFatias;
  const anguloCentro = indexAlvo * seg + seg / 2;

  const voltasExtras = 5;
  const rotacaoFinal = (360 * voltasExtras) - anguloCentro;
  roleta.style.transform = `rotate(${rotacaoFinal}deg)`;

  setTimeout(() => {
    const ehRodadaFinal = estado.rodadaAtual === TOTAL_RODADAS;
    const temaId = ehRodadaFinal
      ? estado.perguntasDaRodada[estado.perguntaAtualIndex].tema
      : estado.temaEscolhidoAtual;
    const tema = obterTemaPorId(temaId);

    if (!ehRodadaFinal) {
      estado.perguntaAtual = montarPerguntaAtual(temaId, estado.ehUltimaDaRodadaAtual);
    }

    const resultado = document.getElementById("resultado-roleta");
    resultado.textContent = ehRodadaFinal
      ? `${tema.icone} ${tema.nome} — 🔥 OFENSIVA!`
      : `${tema.icone} ${tema.nome}`;
    resultado.classList.remove("oculto");
    document.getElementById("btn-ver-pergunta").classList.remove("oculto");
  }, 3300);
}

document.getElementById("btn-ver-pergunta").addEventListener("click", () => {
  const ehRodadaFinal = estado.rodadaAtual === TOTAL_RODADAS;
  if (ehRodadaFinal) {
    estado.perguntaAtual = estado.perguntasDaRodada[estado.perguntaAtualIndex];
  }
  registrarTemaUsado(estado.perguntaAtual.tema);
  iniciarTelaPergunta();
});

/* ----------------------------------------------------------------------
   10) TELA CARTAS DE TEMA
---------------------------------------------------------------------- */
function prepararTelaCartas(opcoesIds) {
  const container = document.getElementById("grade-cartas-temas");
  container.innerHTML = "";
  document.getElementById("btn-ver-pergunta-cartas").classList.add("oculto");

  opcoesIds.forEach(temaId => {
    const tema = obterTemaPorId(temaId);

    const cartao = document.createElement("div");
    cartao.className = "cartao-tema";
    cartao.innerHTML = `
      <div class="cartao-tema-interior">
        <div class="cartao-tema-face cartao-tema-verso">
          <img src="assets/logo-scoreraid.png" alt="ScoreRaid">
        </div>
        <div class="cartao-tema-face cartao-tema-frente">
          <span class="icone-tema">${tema.icone}</span>
          <span class="nome-tema">${tema.nome}</span>
        </div>
      </div>
    `;
    cartao.addEventListener("click", () => escolherCarta(cartao, temaId));
    container.appendChild(cartao);
  });
}

function escolherCarta(cardEl, temaId) {
  document.querySelectorAll(".cartao-tema").forEach(c => c.classList.add("travada"));
  cardEl.classList.add("virada", "selecionada");

  estado.perguntaAtual = montarPerguntaAtual(temaId, estado.ehUltimaDaRodadaAtual);

  setTimeout(() => {
    document.getElementById("btn-ver-pergunta-cartas").classList.remove("oculto");
  }, 650);
}

document.getElementById("btn-ver-pergunta-cartas").addEventListener("click", () => {
  registrarTemaUsado(estado.perguntaAtual.tema);
  iniciarTelaPergunta();
});

/* ----------------------------------------------------------------------
   11) TELA PERGUNTA
---------------------------------------------------------------------- */
function iniciarTelaPergunta() {
  estado.gruposQueJaErraramNestaPergunta = [];
  estado.grupoQueAcertou = null;

  const pergunta = estado.perguntaAtual;
  const tema = obterTemaPorId(pergunta.tema);

  // Assim que a pergunta é exibida aqui, já transmite para o respostas.html
  transmitirPerguntaAtual();

  if (estado.modoDesempate) {
    document.getElementById("indicador-rodada-pergunta").textContent = "Rodada de Desempate";
    document.getElementById("indicador-pergunta").textContent =
      `Pergunta ${estado.perguntaDesempateIndex + 1} de ${TOTAL_PERGUNTAS_DESEMPATE}`;
  } else {
    document.getElementById("indicador-rodada-pergunta").textContent =
      `Rodada ${estado.rodadaAtual} de ${TOTAL_RODADAS}`;
    document.getElementById("indicador-pergunta").textContent =
      `Pergunta ${estado.perguntaAtualIndex + 1} de ${PERGUNTAS_POR_RODADA}`;
  }

  document.getElementById("badge-tema").textContent = `${tema.icone} ${tema.nome}`;

  const badgeTipo = document.getElementById("badge-tipo");
  const badgeValor = document.getElementById("badge-valor");
  badgeTipo.classList.remove("ofensiva");
  if (estado.modoDesempate) {
    badgeTipo.textContent = "⚔️ DESEMPATE";
    badgeTipo.classList.add("ofensiva");
    badgeValor.textContent = "Decide o 1º lugar";
  } else if (pergunta.ehOfensiva) {
    badgeTipo.textContent = "🔥 OFENSIVA";
    badgeTipo.classList.add("ofensiva");
    badgeValor.textContent = `Rouba ${VALOR_OFENSIVA} pts`;
  } else {
    badgeTipo.textContent = "Acumulativa";
    badgeValor.textContent = `+${pontosDaPergunta(pergunta)} pts`;
  }

  document.getElementById("texto-enunciado").textContent = pergunta.enunciado;

  const letras = ["A", "B", "C", "D"];
  const gradeAlternativas = document.getElementById("grade-alternativas");
  gradeAlternativas.innerHTML = "";
  pergunta.alternativas.forEach((texto, idx) => {
    const div = document.createElement("div");
    div.className = "alternativa";
    div.id = `alternativa-${idx}`;
    div.innerHTML = `<span class="letra">${letras[idx]}</span><span>${texto}</span>`;
    gradeAlternativas.appendChild(div);
  });

  document.getElementById("aviso-vez").textContent = "";
  renderizarBotoesGrupos();

  document.getElementById("painel-roubo").classList.add("oculto");
  document.getElementById("btn-continuar").classList.add("oculto");
  document.getElementById("area-botoes-grupos").classList.add("oculto");
  document.getElementById("btn-ninguem-acertou").classList.add("oculto");

  mostrarTela("pergunta");
  iniciarCronometro();
}

/* ---- Cronômetro de 10s antes de liberar a seleção de acerto/erro ---- */
function iniciarCronometro() {
  clearInterval(idIntervaloCronometro);

  let segundosRestantes = DURACAO_CRONOMETRO;
  const areaCronometro = document.getElementById("area-cronometro");
  const valorCronometro = document.getElementById("valor-cronometro");
  const circulo = document.querySelector(".circulo-cronometro");

  areaCronometro.classList.remove("oculto");
  circulo.classList.remove("alerta");
  valorCronometro.textContent = segundosRestantes;

  idIntervaloCronometro = setInterval(() => {
    segundosRestantes--;
    valorCronometro.textContent = segundosRestantes;
    if (segundosRestantes <= 3 && segundosRestantes > 0) circulo.classList.add("alerta");
    if (segundosRestantes <= 0) encerrarCronometro();
  }, 1000);
}

function encerrarCronometro() {
  clearInterval(idIntervaloCronometro);
  document.getElementById("area-cronometro").classList.add("oculto");
  document.getElementById("area-botoes-grupos").classList.remove("oculto");
  document.getElementById("btn-ninguem-acertou").classList.remove("oculto");
}

document.getElementById("btn-pular-cronometro").addEventListener("click", () => {
  encerrarCronometro();
});

/* ---- Botões de grupo: "respondeu certo" e "errou" ---- */
function renderizarBotoesGrupos() {
  const container = document.getElementById("area-botoes-grupos");
  container.innerHTML = "";
  estado.grupos.forEach((grupo, idx) => {
    if (estado.modoDesempate && !estado.gruposDesempateIdx.includes(idx)) return;

    const jaErrou = estado.gruposQueJaErraramNestaPergunta.includes(idx);

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.gap = "8px";

    const btnAcertou = document.createElement("button");
    btnAcertou.className = `botao-grupo ${CORES_GRUPO[idx]}`;
    btnAcertou.textContent = `${grupo.nome} respondeu certo`;
    btnAcertou.disabled = jaErrou;
    btnAcertou.addEventListener("click", () => registrarAcerto(idx));

    const btnErrou = document.createElement("button");
    btnErrou.className = "botao-secundario";
    btnErrou.style.margin = "0";
    btnErrou.style.fontSize = "13px";
    btnErrou.textContent = `${grupo.nome} errou`;
    btnErrou.disabled = jaErrou;
    btnErrou.addEventListener("click", () => registrarErro(idx));

    wrapper.appendChild(btnAcertou);
    wrapper.appendChild(btnErrou);
    container.appendChild(wrapper);
  });
}

function registrarAcerto(idxGrupoAcertou) {
  estado.grupoQueAcertou = idxGrupoAcertou;
  revelarAlternativaCorreta();
  desabilitarBotoesGrupos();
  document.getElementById("btn-ninguem-acertou").classList.add("oculto");

  if (estado.modoDesempate) {
    estado.acertosDesempate[idxGrupoAcertou]++;
    exibirBotaoContinuar([0, 0, 0]);
    return;
  }

  const pergunta = estado.perguntaAtual;

  if (pergunta.ehOfensiva) {
    abrirPainelRoubo(idxGrupoAcertou);
  } else {
    const pontosGanhos = pontosDaPergunta(pergunta);
    estado.grupos[idxGrupoAcertou].pontos += pontosGanhos;

    const variacao = [0, 0, 0];
    variacao[idxGrupoAcertou] = pontosGanhos;
    renderizarSidebar(idxGrupoAcertou);
    exibirBotaoContinuar(variacao);
  }
}

function registrarErro(idxGrupo) {
  if (!estado.gruposQueJaErraramNestaPergunta.includes(idxGrupo)) {
    estado.gruposQueJaErraramNestaPergunta.push(idxGrupo);
  }
  renderizarBotoesGrupos();

  const totalGrupos = estado.modoDesempate ? estado.gruposDesempateIdx.length : estado.grupos.length;

  if (estado.gruposQueJaErraramNestaPergunta.length >= totalGrupos) {
    revelarAlternativaCorreta();
    desabilitarBotoesGrupos();
    document.getElementById("btn-ninguem-acertou").classList.add("oculto");
    document.getElementById("aviso-vez").textContent = "Ninguém acertou! 😬";
    exibirBotaoContinuar([0, 0, 0]);
  } else {
    const proximoGrupoIdx = estado.grupos.findIndex((_, idx) =>
      (!estado.modoDesempate || estado.gruposDesempateIdx.includes(idx)) &&
      !estado.gruposQueJaErraramNestaPergunta.includes(idx)
    );
    const nomeProximo = estado.grupos[proximoGrupoIdx].nome;
    document.getElementById("aviso-vez").textContent = `Vez do ${nomeProximo} tentar!`;
  }
}

document.getElementById("btn-ninguem-acertou").addEventListener("click", () => {
  revelarAlternativaCorreta();
  desabilitarBotoesGrupos();
  document.getElementById("btn-ninguem-acertou").classList.add("oculto");
  document.getElementById("aviso-vez").textContent = "Ninguém acertou! 😬";
  exibirBotaoContinuar([0, 0, 0]);
});

function desabilitarBotoesGrupos() {
  document.querySelectorAll(".botao-grupo").forEach(btn => btn.disabled = true);
}

function revelarAlternativaCorreta() {
  const pergunta = estado.perguntaAtual;
  pergunta.alternativas.forEach((_, idx) => {
    const el = document.getElementById(`alternativa-${idx}`);
    if (idx === pergunta.correta) el.classList.add("correta");
    else el.classList.add("incorreta");
  });
}

/* ---- Etapa extra: pergunta Ofensiva — escolher de quem roubar ---- */
function abrirPainelRoubo(idxGrupoAcertou) {
  const painel = document.getElementById("painel-roubo");
  document.getElementById("nome-vencedor-roubo").textContent = estado.grupos[idxGrupoAcertou].nome;

  const container = document.getElementById("area-botoes-roubo");
  container.innerHTML = "";

  estado.grupos.forEach((grupo, idx) => {
    if (idx === idxGrupoAcertou) return;
    const btn = document.createElement("button");
    btn.className = `botao-grupo ${CORES_GRUPO[idx]}`;
    btn.textContent = grupo.nome;
    btn.addEventListener("click", () => executarRoubo(idxGrupoAcertou, idx));
    container.appendChild(btn);
  });

  painel.classList.remove("oculto");
}

function executarRoubo(idxGrupoAcertou, idxGrupoAlvo) {
  const rouboBruto = VALOR_OFENSIVA;
  const pontosDisponiveis = estado.grupos[idxGrupoAlvo].pontos;
  const roubado = Math.min(rouboBruto, pontosDisponiveis);

  estado.grupos[idxGrupoAlvo].pontos -= roubado;
  estado.grupos[idxGrupoAcertou].pontos += roubado;

  document.getElementById("painel-roubo").classList.add("oculto");

  const variacao = [0, 0, 0];
  variacao[idxGrupoAcertou] = roubado;
  variacao[idxGrupoAlvo] = -roubado;
  renderizarSidebar(idxGrupoAcertou);
  exibirBotaoContinuar(variacao);
}

/* ----------------------------------------------------------------------
   12) CONTINUAR PARA O PRÓXIMO PASSO
---------------------------------------------------------------------- */
function exibirBotaoContinuar(variacao) {
  variacaoPendente = variacao;
  document.getElementById("btn-continuar").classList.remove("oculto");
}

document.getElementById("btn-continuar").addEventListener("click", () => {
  if (estado.modoDesempate) {
    avancarDesempate();
  } else {
    avancarAposPergunta(variacaoPendente);
  }
});

function avancarAposPergunta(variacao) {
  estado.perguntaAtualIndex++;

  const fimDaRodada = estado.perguntaAtualIndex >= PERGUNTAS_POR_RODADA;
  const fimDoJogo = fimDaRodada && estado.rodadaAtual >= TOTAL_RODADAS;

  if (fimDoJogo) {
    mostrarTelaFinal();
    return;
  }

  if (fimDaRodada) {
    estado.rodadaAtual++;
    estado.perguntaAtualIndex = 0;
    estado.temasUsadosNestaRodada = [];
    if (estado.rodadaAtual === TOTAL_RODADAS) {
      estado.perguntasDaRodada = montarPerguntasDaRodada();
    }
  }

  limparPerguntaTransmitida();

  if (fimDaRodada && RODADAS_COM_EVENTO.includes(estado.rodadaAtual)) {
    prepararTelaEvento(variacao);
    return;
  }

  renderizarPlacar(variacao);
  mostrarTela("placar");
}

/* ----------------------------------------------------------------------
   12.1) EVENTO ESPECIAL (a cada 2 rodadas, um grupo sorteado sem repetir)
---------------------------------------------------------------------- */
function sortearProximoGrupoEvento() {
  if (estado.bagEventoGrupos.length === 0) {
    estado.bagEventoGrupos = embaralhar(estado.grupos.map((_, idx) => idx));
  }
  return estado.bagEventoGrupos.shift();
}

function prepararTelaEvento(variacaoRodadaAnterior) {
  estado.variacaoAntesDoEvento = variacaoRodadaAnterior || [0, 0, 0];
  estado.grupoEventoAtual = sortearProximoGrupoEvento();
  estado.cartaBoaEvento = Math.random() < 0.5 ? 0 : 1;

  const idxGrupo = estado.grupoEventoAtual;
  const nomeGrupo = estado.grupos[idxGrupo].nome;

  const banner = document.getElementById("banner-evento");
  banner.className = `banner-evento ${CORES_GRUPO[idxGrupo]}`;
  document.getElementById("banner-evento-grupo").textContent = `Vez do ${nomeGrupo}!`;
  document.getElementById("instrucao-evento").textContent = "Escolha uma carta ou pule o evento.";
  document.getElementById("instrucao-evento").classList.remove("oculto");

  document.getElementById("resultado-evento").classList.add("oculto");
  document.getElementById("btn-continuar-evento").classList.add("oculto");
  document.getElementById("btn-pular-evento").classList.remove("oculto");

  renderizarCartasEvento();
  mostrarTela("evento");
}

function renderizarCartasEvento() {
  const container = document.getElementById("grade-cartas-evento");
  container.innerHTML = "";

  for (let i = 0; i < 2; i++) {
    const cartao = document.createElement("div");
    cartao.className = "cartao-evento";
    cartao.innerHTML = `
      <div class="cartao-evento-interior">
        <div class="cartao-evento-face cartao-evento-verso">❓</div>
        <div class="cartao-evento-face cartao-evento-frente"></div>
      </div>
    `;
    cartao.addEventListener("click", () => escolherCartaEvento(cartao, i));
    container.appendChild(cartao);
  }
}

function preencherFrenteCarta(cardEl, ehCartaBoa) {
  const frente = cardEl.querySelector(".cartao-evento-frente");
  if (ehCartaBoa) {
    cardEl.classList.add("ganho");
    frente.innerHTML = `<span class="icone-evento">🎉</span><span class="valor-evento">+${PONTOS_GANHO_EVENTO} pts</span>`;
  } else {
    cardEl.classList.add("perda");
    frente.innerHTML = `<span class="icone-evento">💥</span><span class="valor-evento">-${PONTOS_PERDA_EVENTO} pts</span>`;
  }
}

function escolherCartaEvento(cardEl, indiceEscolhido) {
  const cartas = document.querySelectorAll(".cartao-evento");
  cartas.forEach(c => c.classList.add("travada"));
  document.getElementById("btn-pular-evento").classList.add("oculto");
  document.getElementById("instrucao-evento").classList.add("oculto");

  const idxGrupo = estado.grupoEventoAtual;
  const ehCartaBoa = indiceEscolhido === estado.cartaBoaEvento;
  const pontos = ehCartaBoa ? PONTOS_GANHO_EVENTO : -PONTOS_PERDA_EVENTO;
  estado.grupos[idxGrupo].pontos = Math.max(0, estado.grupos[idxGrupo].pontos + pontos);

  cartas.forEach((c, i) => {
    preencherFrenteCarta(c, i === estado.cartaBoaEvento);
    c.classList.add("virada");
    if (i === indiceEscolhido) c.classList.add("escolhida");
  });

  const nomeGrupo = estado.grupos[idxGrupo].nome;
  const resultado = document.getElementById("resultado-evento");
  resultado.textContent = ehCartaBoa
    ? `🎉 ${nomeGrupo} ganhou ${PONTOS_GANHO_EVENTO} pontos!`
    : `💥 ${nomeGrupo} perdeu ${PONTOS_PERDA_EVENTO} pontos!`;
  resultado.style.color = ehCartaBoa ? "var(--verde-ok)" : "var(--vermelho)";
  resultado.classList.remove("oculto");

  renderizarSidebar(idxGrupo);
  document.getElementById("btn-continuar-evento").classList.remove("oculto");
}

document.getElementById("btn-pular-evento").addEventListener("click", () => {
  document.querySelectorAll(".cartao-evento").forEach(c => c.classList.add("travada"));
  document.getElementById("btn-pular-evento").classList.add("oculto");
  document.getElementById("instrucao-evento").classList.add("oculto");

  const resultado = document.getElementById("resultado-evento");
  resultado.textContent = "Evento pulado — ninguém ganhou nem perdeu pontos.";
  resultado.style.color = "var(--texto-fraco)";
  resultado.classList.remove("oculto");

  document.getElementById("btn-continuar-evento").classList.remove("oculto");
});

document.getElementById("btn-continuar-evento").addEventListener("click", () => {
  renderizarPlacar(estado.variacaoAntesDoEvento);
  mostrarTela("placar");
});

/* ----------------------------------------------------------------------
   13) RODADA DE DESEMPATE
---------------------------------------------------------------------- */
function iniciarDesempate(indices) {
  estado.modoDesempate = true;
  estado.gruposDesempateIdx = indices;
  estado.perguntaDesempateIndex = 0;
  estado.acertosDesempate = {};
  indices.forEach(idx => estado.acertosDesempate[idx] = 0);
  prepararProximaPerguntaDesempate();
}

function prepararProximaPerguntaDesempate() {
  const temaId = sortearTemaPonderado([]);
  estado.perguntaAtual = montarPerguntaAtual(temaId, false);
  iniciarTelaPergunta();
}

function avancarDesempate() {
  estado.perguntaDesempateIndex++;
  if (estado.perguntaDesempateIndex >= TOTAL_PERGUNTAS_DESEMPATE) {
    finalizarDesempate();
  } else {
    prepararProximaPerguntaDesempate();
  }
}

function finalizarDesempate() {
  const maxAcertos = Math.max(...Object.values(estado.acertosDesempate));
  const vencedores = Object.keys(estado.acertosDesempate)
    .map(Number)
    .filter(idx => estado.acertosDesempate[idx] === maxAcertos);

  if (vencedores.length > 1) {
    // ainda empatado: mais uma rodada de morte súbita só entre os empatados
    estado.gruposDesempateIdx = vencedores;
    estado.perguntaDesempateIndex = 0;
    estado.acertosDesempate = {};
    vencedores.forEach(idx => estado.acertosDesempate[idx] = 0);
    prepararProximaPerguntaDesempate();
    return;
  }

  estado.vencedorDesempateIdx = vencedores[0];
  mostrarTelaFinal();
}

/* ----------------------------------------------------------------------
   14) TELA FINAL
---------------------------------------------------------------------- */
function mostrarTelaFinal() {
  const maxPontos = Math.max(...estado.grupos.map(g => g.pontos));
  const empatados = estado.grupos
    .map((g, idx) => ({ ...g, idxOriginal: idx }))
    .filter(g => g.pontos === maxPontos);

  if (empatados.length > 1 && !estado.modoDesempate) {
    iniciarDesempate(empatados.map(g => g.idxOriginal));
    return;
  }

  exibirTelaFinalDefinitiva();
}

function exibirTelaFinalDefinitiva() {
  let ranking = estado.grupos
    .map((g, idx) => ({ ...g, idxOriginal: idx }))
    .sort((a, b) => b.pontos - a.pontos);

  if (estado.vencedorDesempateIdx !== null) {
    const vencedor = ranking.find(g => g.idxOriginal === estado.vencedorDesempateIdx);
    ranking = [vencedor, ...ranking.filter(g => g.idxOriginal !== estado.vencedorDesempateIdx)];
  }

  document.getElementById("nome-time-vencedor").textContent = ranking[0].nome;

  const podio = document.getElementById("podio");
  const rotulos = ["🥇 1º Lugar", "🥈 2º Lugar", "🥉 3º Lugar"];
  podio.innerHTML = "";
  ranking.forEach((grupo, posicao) => {
    const div = document.createElement("div");
    div.className = "posicao-podio" + (posicao === 0 ? " primeiro" : "");
    div.innerHTML = `
      <div class="lugar">${rotulos[posicao]}</div>
      <div class="nome">${grupo.nome}</div>
      <div class="pts">${grupo.pontos} pts</div>
    `;
    podio.appendChild(div);
  });

  limparPerguntaTransmitida();
  dispararConfete();
  mostrarTela("final");
}

function dispararConfete() {
  const container = document.getElementById("confete-container");
  container.innerHTML = "";
  const cores = ["#17a3c2", "#ff4d5e", "#f6a723", "#3a4a78", "#2ee6a6"];

  for (let i = 0; i < 120; i++) {
    const pedaco = document.createElement("div");
    pedaco.className = "confete";
    pedaco.style.left = Math.random() * 100 + "vw";
    pedaco.style.background = cores[Math.floor(Math.random() * cores.length)];
    pedaco.style.animationDuration = (2.5 + Math.random() * 2.5) + "s";
    pedaco.style.animationDelay = (Math.random() * 1.5) + "s";
    container.appendChild(pedaco);
  }
}

document.getElementById("btn-jogar-novamente").addEventListener("click", () => {
  mostrarTela("inicio");
});

/* ----------------------------------------------------------------------
   15) TELA: MENSAGEM FINAL (CORDEL)
---------------------------------------------------------------------- */
document.getElementById("btn-ver-frase-final").addEventListener("click", () => {
  document.getElementById("frase-final-texto").classList.add("oculto");
  document.getElementById("btn-revelar-frase").classList.remove("oculto");
  mostrarTela("frase");
});

document.getElementById("btn-revelar-frase").addEventListener("click", () => {
  document.getElementById("frase-final-texto").classList.remove("oculto");
  document.getElementById("btn-revelar-frase").classList.add("oculto");
});

/* ----------------------------------------------------------------------
   16) MODAL: APRESENTAÇÃO "COMO JOGAR" (Google Slides)
---------------------------------------------------------------------- */
const modalApresentacao = document.getElementById("modal-como-jogar");
const iframeApresentacao = document.getElementById("iframe-apresentacao");

function abrirApresentacao() {
  iframeApresentacao.src = iframeApresentacao.dataset.src;
  modalApresentacao.classList.remove("oculto");
}

function fecharApresentacao() {
  modalApresentacao.classList.add("oculto");
}

document.getElementById("btn-como-jogar").addEventListener("click", abrirApresentacao);
document.getElementById("btn-fechar-apresentacao").addEventListener("click", fecharApresentacao);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalApresentacao.classList.contains("oculto")) fecharApresentacao();
});