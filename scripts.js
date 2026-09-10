/* ======================================================================
   SCORERAID — LÓGICA DO JOGO (v2)
   JavaScript puro, sem dependências externas.
====================================================================== */

/* ----------------------------------------------------------------------
   1) TEMAS (com ícone para badges e roleta)
---------------------------------------------------------------------- */
const TEMAS = [
  { id: "matematica",  nome: "Matemática",              icone: "🧮", cor: "#5B8DEF" },
  { id: "geografia",   nome: "Geografia",                icone: "🌍", cor: "#4FB477" },
  { id: "esportes",    nome: "Esportes",                 icone: "⚽", cor: "#E2725B" },
  { id: "tecnologia",  nome: "Tecnologia",               icone: "💻", cor: "#6C63FF" },
  { id: "trabalho",    nome: "Mercado de Trabalho",      icone: "💼", cor: "#D9A441" },
  { id: "curiosidades",nome: "Curiosidades",             icone: "🧠", cor: "#45B8C9" },
  { id: "musica",      nome: "Música",                   icone: "🎵", cor: "#E05C97" },
  { id: "marcas",      nome: "Marcas & Empresas",        icone: "🏪", cor: "#C9A227" },
  { id: "culturas",    nome: "Culturas",                 icone: "🌐", cor: "#E08E45" },
  { id: "idiomas",     nome: "Idiomas",                  icone: "💬", cor: "#4FC1E9" },
  { id: "logica",      nome: "Lógica",                   icone: "🧩", cor: "#8E8FFA" },
];

function pt(temaId, dificuldade, enunciado, alternativas, correta){
  return { tema: temaId, dificuldade, enunciado, alternativas, correta };
}

/* ----------------------------------------------------------------------
   2) BANCO DE PERGUNTAS — apenas fácil (10 pts) e média (15 pts)
---------------------------------------------------------------------- */
const BANCO_PERGUNTAS = [

  // ---------------- MATEMÁTICA ----------------
  pt("matematica","facil","Quanto é 12 x 8?",["86","96","106","92"],1),
  pt("matematica","facil","Qual é o resultado de 15% de 200?",["20","30","25","35"],1),
  pt("matematica","dificil","Qual é a raiz quadrada de 144?",["11","12","13","14"],1),
  pt("matematica","facil","Quantos lados tem um hexágono?",["5","6","7","8"],1),
  pt("matematica","dificil","Em uma divisão, como se chama o resultado da operação?",["Dividendo","Divisor","Quociente","Resto"],2),
  pt("matematica","facil","Qual é o próximo número da sequência: 2, 4, 6, 8, ...?",["9","10","12","14"],1),
  pt("matematica","dificil","Quanto é 7 elevado ao quadrado (7²)?",["14","42","49","56"],2),
  pt("matematica","dificil","Qual é o valor de π (pi) aproximado, usado em cálculos de círculo?",["2,14","3,14","4,14","3,41"],1),

  // ---------------- GEOGRAFIA ----------------
  pt("geografia","facil","Qual é a capital do Brasil?",["Rio de Janeiro","São Paulo","Brasília","Salvador"],2),
  pt("geografia","facil","Qual é o maior oceano do mundo?",["Atlântico","Índico","Pacífico","Ártico"],2),
  pt("geografia","dificil","Qual é o maior país do mundo em extensão territorial?",["China","Canadá","Estados Unidos","Rússia"],3),
  pt("geografia","facil","Em qual continente fica o Egito?",["Ásia","África","Europa","Oceania"],1),
  pt("geografia","dificil","Qual é o rio mais extenso do mundo?",["Rio Nilo","Rio Amazonas","Rio Yangtzé","Rio Mississippi"],1),
  pt("geografia","facil","Qual é o país conhecido como 'terra do sol nascente'?",["China","Coreia do Sul","Japão","Tailândia"],2),
  pt("geografia","dificil","Qual destes países não faz fronteira com o Brasil?",["Chile","Peru","Bolívia","Paraguai"],0),
  pt("geografia","dificil","Qual é o deserto mais extenso do mundo (considerando desertos frios)?",["Saara","Gobi","Antártida","Kalahari"],2),

  // ---------------- ESPORTES ----------------
  pt("esportes","facil","Quantos jogadores de linha (sem contar o goleiro) uma equipe de futebol tem em campo?",["9","10","11","12"],1),
  pt("esportes","facil","A cada quantos anos ocorrem os Jogos Olímpicos de Verão, normalmente?",["2 anos","3 anos","4 anos","5 anos"],2),
  pt("esportes","dificil","Em qual esporte é comum o termo 'ace', quando o saque não é alcançado pelo adversário?",["Vôlei ou tênis","Futebol","Basquete","Natação"],0),
  pt("esportes","facil","Qual país sediou a Copa do Mundo de 2014?",["Alemanha","Brasil","África do Sul","Rússia"],1),
  pt("esportes","dificil","No basquete, quantos pontos vale uma cesta de 3 pontos convertida de fora do arco?",["2","3","4","5"],1),
  pt("esportes","facil","Qual é o esporte mais associado à raquete e a uma pequena bola amarela?",["Squash","Tênis","Badminton","Pingue-pongue"],1),
  pt("esportes","dificil","Qual desses esportes faz parte do triatlo?",["Ciclismo","Ginástica","Voleibol","Judô"],0),
  pt("esportes","dificil","Em qual modalidade olímpica os atletas competem em uma piscina?",["Atletismo","Natação","Ginástica artística","Tiro com arco"],1),

  // ---------------- TECNOLOGIA ----------------
  pt("tecnologia","facil","O que significa a sigla 'IA' no contexto de tecnologia?",["Internet Avançada","Inteligência Artificial","Informação Automática","Interface Ampliada"],1),
  pt("tecnologia","facil","Qual desses é um sistema operacional?",["Windows","Excel","Chrome","Word"],0),
  pt("tecnologia","dificil","O que é a 'nuvem' (cloud) na tecnologia?",["Um tipo de vírus","Armazenamento e processamento de dados via internet, em servidores remotos","Um cabo de rede especial","Um tipo de tela sensível ao toque"],1),
  pt("tecnologia","dificil","O que significa a sigla 'Wi-Fi'?",["Wireless Fidelity","Wide File","Web Interface","Wired Function"],0),
  pt("tecnologia","facil","Qual é o nome do navegador desenvolvido pelo Google?",["Safari","Edge","Chrome","Firefox"],2),
  pt("tecnologia","dificil","O que é um 'byte' na computação?",["Uma unidade de tempo","Um conjunto de 8 bits, usado para medir dados","Um tipo de vírus","Um tipo de tela"],1),
  pt("tecnologia","dificil","O que caracteriza um smartphone 'dobrável'?",["Tela que pode ser dobrada fisicamente sem quebrar","Um celular que só faz ligações","Um celular sem bateria","Um celular exclusivo para jogos"],0),
  pt("tecnologia","facil","Qual é a função principal de um 'mouse' em um computador?",["Reproduzir áudio","Controlar o cursor na tela","Armazenar arquivos","Conectar à internet"],1),

  // ---------------- MERCADO DE TRABALHO ----------------
  pt("trabalho","facil","O que é um currículo?",["Um documento com o histórico profissional e acadêmico de uma pessoa","Um contrato de trabalho","Um tipo de imposto","Um cargo de gerência"],0),
  pt("trabalho","facil","O que significa 'home office'?",["Trabalho realizado a partir de casa","Um cargo de diretoria","Um tipo de férias","Um horário extra de trabalho"],0),
  pt("trabalho","dificil","O que é 'networking' no ambiente profissional?",["Construir e manter uma rede de contatos profissionais","Um tipo de currículo em vídeo","Um software de planilhas","Um cargo de TI"],0),
  pt("trabalho","dificil","O que significam as chamadas 'soft skills'?",["Habilidades técnicas mensuráveis","Habilidades comportamentais e interpessoais","Idiomas estrangeiros","Certificações acadêmicas"],1),
  pt("trabalho","facil","O que é o 13º salário no Brasil?",["Um bônus extra pago ao final do ano","Um desconto no salário","Um tipo de multa trabalhista","Um vale-transporte"],0),
  pt("trabalho","dificil","O que é uma 'entrevista de emprego'?",["Uma conversa formal para avaliar se o candidato é adequado para a vaga","Um teste de matemática obrigatório","Um exame médico","Um contrato assinado antes da vaga"],0),
  pt("trabalho","facil","O que significa a sigla 'RH' em uma empresa?",["Recursos Humanos","Relação Hierárquica","Registro Horário","Renda Hábil"],0),
  pt("trabalho","dificil","O que é 'trabalho híbrido'?",["Modelo que combina dias de trabalho presencial e remoto","Um trabalho feito por duas pessoas ao mesmo tempo","Um contrato de meio período apenas","Um cargo de estágio"],0),

  // ---------------- CURIOSIDADES ----------------
  pt("curiosidades","facil","Qual é o maior mamífero do mundo?",["Elefante-africano","Baleia-azul","Girafa","Urso-polar"],1),
  pt("curiosidades","facil","Quantos ossos tem, em média, o corpo humano adulto?",["106","156","206","256"],2),
  pt("curiosidades","dificil","Qual é o metal líquido à temperatura ambiente, usado em termômetros antigos?",["Ferro","Mercúrio","Alumínio","Cobre"],1),
  pt("curiosidades","facil","Qual animal é conhecido por mudar de cor para se camuflar?",["Camaleão","Coelho","Pinguim","Canguru"],0),
  pt("curiosidades","dificil","Qual é a montanha mais alta do mundo?",["K2","Monte Everest","Aconcágua","Kilimanjaro"],1),
  pt("curiosidades","dificil","Qual rede social foi originalmente criada para estudantes de Harvard?",["Instagram","TikTok","Facebook","Twitter"],2),
  pt("curiosidades","facil","Qual é o maior planeta do Sistema Solar?",["Terra","Saturno","Júpiter","Netuno"],2),
  pt("curiosidades","dificil","O que é um 'meme' na internet?",["Um tipo de vírus de computador","Uma ideia, imagem ou vídeo que se espalha rapidamente de forma humorística ou viral","Um aplicativo de mensagens","Um formato de arquivo de vídeo"],1),
  pt("curiosidades","dificil","Qual é o elemento químico mais abundante no universo?",["Oxigênio","Carbono","Hidrogênio","Hélio"],2),
  pt("curiosidades","dificil","Qual é o país com o maior número de fusos horários no mundo?",["Estados Unidos","Rússia","China","França"],3),
  pt("curiosidades","dificil","Qual é o menor país do mundo em extensão territorial?",["Mônaco","San Marino","Vaticano","Liechtenstein"],2),
  pt("curiosidades","dificil","Aproximadamente, quanto tempo a luz do Sol leva para chegar à Terra?",["8 segundos","8 minutos","8 horas","8 dias"],1),

  // ---------------- MÚSICA ----------------
  pt("musica","facil","Quantas cordas tem um violão clássico, tradicionalmente?",["4","5","6","7"],2),
  pt("musica","facil","Qual instrumento tem teclas brancas e pretas?",["Violino","Piano","Flauta","Bateria"],1),
  pt("musica","dificil","O que é um 'refrão' em uma música?",["A parte que se repete ao longo da canção, geralmente a mais marcante","O nome do compositor","O instrumento principal","O ritmo da música"],0),
  pt("musica","dificil","Qual gênero musical é originário do Brasil e tem forte ligação com o Carnaval?",["Reggae","Samba","Salsa","Flamenco"],1),
  pt("musica","facil","Qual é o nome do instrumento de sopro com teclas, muito usado no jazz?",["Saxofone","Violino","Contrabaixo","Pandeiro"],0),
  pt("musica","dificil","O que significa a sigla 'BPM' usada para medir a velocidade de uma música?",["Batidas Por Minuto","Base Padrão Musical","Bloco de Produção Musical","Banda por Minuto"],0),
  pt("musica","facil","Qual desses é um instrumento de percussão?",["Bateria","Flauta","Violino","Trompete"],0),
  pt("musica","dificil","O que é um 'DJ'?",["Um instrumento musical eletrônico","Um profissional que mixa e toca músicas, geralmente em eventos e festas","Um tipo de microfone","Um gênero musical"],1),

  // ---------------- MARCAS & EMPRESAS ----------------
  pt("marcas","facil","Qual empresa é dona da rede social Instagram?",["Google","Meta","Microsoft","Amazon"],1),
  pt("marcas","facil","Qual é a marca de tênis identificada por um logotipo de 'swoosh'?",["Adidas","Puma","Nike","Reebok"],2),
  pt("marcas","dificil","Qual empresa é conhecida por criar o iPhone?",["Samsung","Apple","Sony","LG"],1),
  pt("marcas","dificil","Qual é a maior varejista de comércio eletrônico do mundo, fundada por Jeff Bezos?",["eBay","Alibaba","Amazon","Shopify"],2),
  pt("marcas","facil","Qual empresa é famosa pelo mascote em formato de palhaço nos seus restaurantes?",["Burger King","McDonald's","KFC","Subway"],1),
  pt("marcas","dificil","Qual empresa desenvolveu o sistema operacional Windows?",["Apple","IBM","Microsoft","Google"],2),
  pt("marcas","dificil","Qual marca de automóveis tem como símbolo um cavalo empinado?",["Ferrari","Porsche","Lamborghini","Fiat"],0),
  pt("marcas","facil","Qual é o nome da rede social voltada para vídeos curtos que ficou popular a partir de 2019?",["Snapchat","TikTok","Vine","Twitter"],1),

  // ---------------- CULTURAS ----------------
  pt("culturas","facil","Qual é a principal celebração popular brasileira que ocorre antes da Quaresma?",["São João","Carnaval","Natal","Páscoa"],1),
  pt("culturas","facil","Qual país é conhecido pela tradição do chá das cinco?",["França","Inglaterra","Itália","Espanha"],1),
  pt("culturas","dificil","O Dia dos Mortos, com caveiras coloridas e altares, é uma tradição típica de qual país?",["México","Peru","Colômbia","Chile"],0),
  pt("culturas","dificil","Qual é o nome do festival japonês de contemplação das flores de cerejeira?",["Hanami","Matsuri","Origami","Ikebana"],0),
  pt("culturas","facil","Qual é a comida tradicionalmente associada à Itália, feita de massa e molho?",["Sushi","Macarrão (pasta)","Taco","Curry"],1),
  pt("culturas","dificil","Qual é o nome da dança tradicional argentina, sensual e de casal, reconhecida mundialmente?",["Salsa","Tango","Flamenco","Samba"],1),
  pt("culturas","dificil","O festival Oktoberfest, com cerveja e música típica, tem origem em qual país?",["Áustria","Alemanha","Suíça","Bélgica"],1),
  pt("culturas","facil","Qual é a principal festa religiosa cristã que celebra o nascimento de Jesus?",["Páscoa","Natal","Pentecostes","Ano Novo"],1),

  // ---------------- IDIOMAS ----------------
  pt("idiomas","facil","Como se diz 'obrigado' em inglês?",["Please","Sorry","Thank you","Excuse me"],2),
  pt("idiomas","facil","Qual é o idioma mais falado como língua nativa no mundo?",["Inglês","Espanhol","Mandarim","Francês"],2),
  pt("idiomas","dificil","Como se diz 'bom dia' em espanhol?",["Buenas noches","Buenos días","Buenas tardes","Hasta luego"],1),
  pt("idiomas","dificil","O português é a língua oficial de quantos países, aproximadamente?",["3","6","9","12"],2),
  pt("idiomas","facil","Qual palavra em inglês significa 'casa'?",["Car","House","Tree","Book"],1),
  pt("idiomas","dificil","Qual idioma é falado predominantemente na França?",["Francês","Italiano","Alemão","Holandês"],0),
  pt("idiomas","facil","Como se diz 'olá' em italiano?",["Bonjour","Hola","Ciao","Hallo"],2),
  pt("idiomas","dificil","O que significa a expressão em inglês 'good luck'?",["Bom dia","Boa sorte","Muito obrigado","Até logo"],1),

  // ---------------- LÓGICA ----------------
  pt("logica","facil","Se hoje é terça-feira, que dia será depois de amanhã?",["Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],1),
  pt("logica","facil","Complete a sequência: 1, 3, 5, 7, ...",["8","9","10","11"],1),
  pt("logica","dificil","Se todos os gatos são animais, e Tom é um gato, então:",["Tom é um animal","Tom não é um animal","Tom é um cachorro","Nada pode ser concluído"],0),
  pt("logica","dificil","Qual número não pertence ao grupo: 2, 4, 6, 9, 8?",["2","4","9","8"],2),
  pt("logica","facil","Se A é maior que B, e B é maior que C, então:",["A é maior que C","C é maior que A","A é igual a C","Não é possível saber"],0),
  pt("logica","dificil","Três amigos dividem igualmente 12 balas. Quantas balas cada um recebe?",["3","4","5","6"],1),
  pt("logica","dificil","Qual figura completa a sequência lógica: círculo, quadrado, círculo, quadrado, ...?",["Triângulo","Círculo","Quadrado","Losango"],1),
  pt("logica","facil","Se um relógio marca 3 horas e passam 2 horas, que horas ele marcará?",["4 horas","5 horas","6 horas","3 horas"],1),
];

/* ----------------------------------------------------------------------
   3) CONFIGURAÇÕES GERAIS DO JOGO
---------------------------------------------------------------------- */
const PONTOS_INICIAIS   = 30;
const TOTAL_RODADAS     = 6;
const PERGUNTAS_POR_RODADA = 6;
const VALOR_OFENSIVA    = 20;
const DURACAO_CRONOMETRO = 10;

const VALOR_POR_DIFICULDADE = { facil: 10, dificil: 20 };
const CORES_GRUPO = ["cor-1", "cor-2", "cor-3"];

/* ----------------------------------------------------------------------
   4) ESTADO DO JOGO
---------------------------------------------------------------------- */
let estado = {
  grupos: [],
  rodadaAtual: 1,
  perguntaAtualIndex: 0,
  temasUsadosRodadaAnterior: [],
  perguntasDaRodada: [],
  perguntasUsadasIds: new Set(),
  gruposQueJaErraramNestaPergunta: [],
  grupoQueAcertou: null,
};

let idIntervaloCronometro = null;

/* ----------------------------------------------------------------------
   5) ELEMENTOS DO DOM / TELAS
---------------------------------------------------------------------- */
const telas = {
  inicio:  document.getElementById("tela-inicio"),
  placar:  document.getElementById("tela-placar"),
  roleta:  document.getElementById("tela-roleta"),
  pergunta:document.getElementById("tela-pergunta"),
  final:   document.getElementById("tela-final"),
};

function mostrarTela(nome){
  Object.values(telas).forEach(t => t.classList.remove("ativa"));
  telas[nome].classList.add("ativa");

  const sidebar = document.getElementById("barra-lateral-placar");
  const precisaSidebar = ["placar", "roleta", "pergunta"].includes(nome);
  sidebar.classList.toggle("oculto", !precisaSidebar);
  document.body.classList.toggle("com-sidebar", precisaSidebar);
}

/* ----------------------------------------------------------------------
   6) FUNÇÕES AUXILIARES DE SORTEIO
---------------------------------------------------------------------- */
function embaralhar(array){
  const copia = [...array];
  for(let i = copia.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function obterTemaPorId(id){ return TEMAS.find(t => t.id === id); }

function sortearTemasDaRodada(){
  let temasDisponiveis = TEMAS.map(t => t.id);
  let temasPreferidos = temasDisponiveis.filter(id => !estado.temasUsadosRodadaAnterior.includes(id));
  let poolEscolha = temasPreferidos.length >= PERGUNTAS_POR_RODADA ? temasPreferidos : temasDisponiveis;
  const escolhidos = embaralhar(poolEscolha).slice(0, PERGUNTAS_POR_RODADA);
  estado.temasUsadosRodadaAnterior = escolhidos;
  return escolhidos;
}

function sortearPerguntaDoTema(temaId, dificuldadeFiltro){
  const combina = p => p.tema === temaId && (!dificuldadeFiltro || p.dificuldade === dificuldadeFiltro);

  const candidatas = BANCO_PERGUNTAS
    .map((p, idx) => ({...p, _idx: idx}))
    .filter(p => combina(p) && !estado.perguntasUsadasIds.has(p._idx));

  const pool = candidatas.length > 0
    ? candidatas
    : BANCO_PERGUNTAS.map((p, idx) => ({...p, _idx: idx})).filter(combina);

  const escolhida = pool[Math.floor(Math.random() * pool.length)];
  estado.perguntasUsadasIds.add(escolhida._idx);
  return escolhida;
}

function montarPerguntasDaRodada(){
  const ehRodadaFinal = estado.rodadaAtual === TOTAL_RODADAS;

  if(ehRodadaFinal){
    // Rodada final: só tema Curiosidades, só nível difícil, toda pergunta é Ofensiva
    const perguntas = [];
    for(let i = 0; i < PERGUNTAS_POR_RODADA; i++){
      const p = sortearPerguntaDoTema("curiosidades", "dificil");
      perguntas.push({ ...p, ehOfensiva: true });
    }
    estado.temasUsadosRodadaAnterior = ["curiosidades"];
    return perguntas;
  }

  const temas = sortearTemasDaRodada();
  return temas.map((temaId, index) => {
    const p = sortearPerguntaDoTema(temaId);
    return { ...p, ehOfensiva: index === PERGUNTAS_POR_RODADA - 1 };
  });
}

function pontosDaPergunta(pergunta){
  if(pergunta.ehOfensiva) return VALOR_OFENSIVA;
  return VALOR_POR_DIFICULDADE[pergunta.dificuldade] || 10;
}

/* ----------------------------------------------------------------------
   7) TELA INÍCIO -> COMEÇAR JOGO
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
  estado.perguntasUsadasIds = new Set();
  estado.perguntasDaRodada = montarPerguntasDaRodada();

  renderizarPlacar();
  renderizarSidebar();
  mostrarTela("placar");
});

/* ----------------------------------------------------------------------
   8) SIDEBAR FIXA DE PLACAR
---------------------------------------------------------------------- */
function renderizarSidebar(destaqueIdx){
  document.getElementById("bl-rodada").textContent = `Rodada ${estado.rodadaAtual} de ${TOTAL_RODADAS}`;

  const marcadores = document.getElementById("bl-pontos-rodadas");
  marcadores.innerHTML = "";
  for(let i = 1; i <= TOTAL_RODADAS; i++){
    const m = document.createElement("div");
    m.className = "bl-marcador";
    if(i < estado.rodadaAtual) m.classList.add("concluida");
    if(i === estado.rodadaAtual) m.classList.add("atual");
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
   9) TELA PLACAR
---------------------------------------------------------------------- */
function renderizarPlacar(ultimaVariacao){
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
    if(variacao > 0){ textoVariacao = `▲ +${variacao}`; classeVariacao = "positiva"; }
    else if(variacao < 0){ textoVariacao = `▼ ${variacao}`; classeVariacao = "negativa"; }

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
  prepararTelaRoleta();
  mostrarTela("roleta");
});

/* ----------------------------------------------------------------------
   10) TELA ROLETA DE TEMAS
   A pergunta da rodada já foi sorteada (montarPerguntasDaRodada), aqui a
   roleta apenas "revela" visualmente, com suspense, qual tema saiu.
---------------------------------------------------------------------- */
function prepararTelaRoleta(){
  construirRoleta();
  document.getElementById("resultado-roleta").classList.add("oculto");
  document.getElementById("btn-girar-roleta").classList.remove("oculto");
  document.getElementById("btn-ver-pergunta").classList.add("oculto");

  const roleta = document.getElementById("roleta");
  roleta.style.transition = "none";
  roleta.style.transform = "rotate(0deg)";
  // força reflow para o próximo giro já aplicar a transição
  void roleta.offsetWidth;
  roleta.style.transition = "";
}

function construirRoleta(){
  const roleta = document.getElementById("roleta");
  roleta.innerHTML = "";

  const ehRodadaFinal = estado.rodadaAtual === TOTAL_RODADAS;
  const coresEspeciais = ["#ff4d5e", "#e8283b", "#c81326", "#ff6b6b", "#a8001b", "#ff2e43"];
  const temaCuriosidades = obterTemaPorId("curiosidades");

  // Na rodada final, a roleta tem só fatias de Curiosidades, em tons de vermelho
  const fatias = ehRodadaFinal
    ? Array.from({length: PERGUNTAS_POR_RODADA}, () => temaCuriosidades)
    : TEMAS;

  const seg = 360 / fatias.length;

  let partesGradiente = [];
  fatias.forEach((tema, i) => {
    const cor = ehRodadaFinal ? coresEspeciais[i % coresEspeciais.length] : tema.cor;
    partesGradiente.push(`${cor} ${i*seg}deg ${(i+1)*seg}deg`);
  });
  roleta.style.background = `conic-gradient(${partesGradiente.join(",")})`;

  fatias.forEach((tema, i) => {
    const anguloCentro = i*seg + seg/2;
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
    : TEMAS.findIndex(t => t.id === estado.perguntasDaRodada[estado.perguntaAtualIndex].tema);
  const totalFatias = ehRodadaFinal ? PERGUNTAS_POR_RODADA : TEMAS.length;
  girarRoletaAte(indexAlvo, totalFatias);
});

function girarRoletaAte(indexAlvo, totalFatias){
  document.getElementById("btn-girar-roleta").classList.add("oculto");

  const roleta = document.getElementById("roleta");
  const seg = 360 / totalFatias;
  const anguloCentro = indexAlvo*seg + seg/2;

  // Gira várias voltas completas e finaliza com a fatia sorteada no topo (ponteiro)
  const voltasExtras = 5;
  const rotacaoFinal = (360 * voltasExtras) - anguloCentro;
  roleta.style.transform = `rotate(${rotacaoFinal}deg)`;

  setTimeout(() => {
    const pergunta = estado.perguntasDaRodada[estado.perguntaAtualIndex];
    const tema = obterTemaPorId(pergunta.tema);
    const resultado = document.getElementById("resultado-roleta");
    resultado.textContent = pergunta.ehOfensiva && estado.rodadaAtual === TOTAL_RODADAS
      ? `${tema.icone} ${tema.nome} — 🔥 OFENSIVA!`
      : `${tema.icone} ${tema.nome}`;
    resultado.classList.remove("oculto");
    document.getElementById("btn-ver-pergunta").classList.remove("oculto");
  }, 3300);
}

document.getElementById("btn-ver-pergunta").addEventListener("click", () => {
  iniciarTelaPergunta();
});

/* ----------------------------------------------------------------------
   11) TELA PERGUNTA
---------------------------------------------------------------------- */
function iniciarTelaPergunta(){
  estado.gruposQueJaErraramNestaPergunta = [];
  estado.grupoQueAcertou = null;

  const pergunta = estado.perguntasDaRodada[estado.perguntaAtualIndex];
  const tema = obterTemaPorId(pergunta.tema);

  document.getElementById("indicador-rodada-pergunta").textContent =
    `Rodada ${estado.rodadaAtual} de ${TOTAL_RODADAS}`;
  document.getElementById("indicador-pergunta").textContent =
    `Pergunta ${estado.perguntaAtualIndex + 1} de ${PERGUNTAS_POR_RODADA}`;

  document.getElementById("badge-tema").textContent = `${tema.icone} ${tema.nome}`;

  const badgeTipo = document.getElementById("badge-tipo");
  const badgeValor = document.getElementById("badge-valor");
  if(pergunta.ehOfensiva){
    badgeTipo.textContent = "🔥 OFENSIVA";
    badgeTipo.classList.add("ofensiva");
    badgeValor.textContent = `Rouba ${VALOR_OFENSIVA} pts`;
  } else {
    badgeTipo.textContent = "Acumulativa";
    badgeTipo.classList.remove("ofensiva");
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
function iniciarCronometro(){
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
    if(segundosRestantes <= 3 && segundosRestantes > 0) circulo.classList.add("alerta");
    if(segundosRestantes <= 0) encerrarCronometro();
  }, 1000);
}

function encerrarCronometro(){
  clearInterval(idIntervaloCronometro);
  document.getElementById("area-cronometro").classList.add("oculto");
  document.getElementById("area-botoes-grupos").classList.remove("oculto");
  document.getElementById("btn-ninguem-acertou").classList.remove("oculto");
}

document.getElementById("btn-pular-cronometro").addEventListener("click", () => {
  encerrarCronometro();
});

/* ---- Botões de grupo: "respondeu certo" e "errou" ---- */
function renderizarBotoesGrupos(){
  const container = document.getElementById("area-botoes-grupos");
  container.innerHTML = "";
  estado.grupos.forEach((grupo, idx) => {
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

function registrarAcerto(idxGrupoAcertou){
  estado.grupoQueAcertou = idxGrupoAcertou;
  revelarAlternativaCorreta();

  const pergunta = estado.perguntasDaRodada[estado.perguntaAtualIndex];
  desabilitarBotoesGrupos();
  document.getElementById("btn-ninguem-acertou").classList.add("oculto");

  if(pergunta.ehOfensiva){
    abrirPainelRoubo(idxGrupoAcertou);
  } else {
    const pontosGanhos = pontosDaPergunta(pergunta);
    estado.grupos[idxGrupoAcertou].pontos += pontosGanhos;

    const variacao = [0,0,0];
    variacao[idxGrupoAcertou] = pontosGanhos;
    renderizarSidebar(idxGrupoAcertou);
    exibirBotaoContinuar(variacao);
  }
}

function registrarErro(idxGrupo){
  if(!estado.gruposQueJaErraramNestaPergunta.includes(idxGrupo)){
    estado.gruposQueJaErraramNestaPergunta.push(idxGrupo);
  }
  renderizarBotoesGrupos();

  const totalGrupos = estado.grupos.length;
  if(estado.gruposQueJaErraramNestaPergunta.length >= totalGrupos){
    revelarAlternativaCorreta();
    desabilitarBotoesGrupos();
    document.getElementById("btn-ninguem-acertou").classList.add("oculto");
    document.getElementById("aviso-vez").textContent = "Ninguém acertou! 😬";
    exibirBotaoContinuar([0,0,0]);
  } else {
    const proximoGrupoIdx = estado.grupos.findIndex((_, idx) =>
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
  exibirBotaoContinuar([0,0,0]);
});

function desabilitarBotoesGrupos(){
  document.querySelectorAll(".botao-grupo").forEach(btn => btn.disabled = true);
}

function revelarAlternativaCorreta(){
  const pergunta = estado.perguntasDaRodada[estado.perguntaAtualIndex];
  pergunta.alternativas.forEach((_, idx) => {
    const el = document.getElementById(`alternativa-${idx}`);
    if(idx === pergunta.correta) el.classList.add("correta");
    else el.classList.add("incorreta");
  });
}

/* ---- Etapa extra: pergunta Ofensiva — escolher de quem roubar ---- */
function abrirPainelRoubo(idxGrupoAcertou){
  const painel = document.getElementById("painel-roubo");
  document.getElementById("nome-vencedor-roubo").textContent = estado.grupos[idxGrupoAcertou].nome;

  const container = document.getElementById("area-botoes-roubo");
  container.innerHTML = "";

  estado.grupos.forEach((grupo, idx) => {
    if(idx === idxGrupoAcertou) return;
    const btn = document.createElement("button");
    btn.className = `botao-grupo ${CORES_GRUPO[idx]}`;
    btn.textContent = grupo.nome;
    btn.addEventListener("click", () => executarRoubo(idxGrupoAcertou, idx));
    container.appendChild(btn);
  });

  painel.classList.remove("oculto");
}

function executarRoubo(idxGrupoAcertou, idxGrupoAlvo){
  const rouboBruto = VALOR_OFENSIVA;
  const pontosDisponiveis = estado.grupos[idxGrupoAlvo].pontos;
  const roubado = Math.min(rouboBruto, pontosDisponiveis);

  estado.grupos[idxGrupoAlvo].pontos -= roubado;
  estado.grupos[idxGrupoAcertou].pontos += roubado;

  document.getElementById("painel-roubo").classList.add("oculto");

  const variacao = [0,0,0];
  variacao[idxGrupoAcertou] = roubado;
  variacao[idxGrupoAlvo] = -roubado;
  renderizarSidebar(idxGrupoAcertou);
  exibirBotaoContinuar(variacao);
}

/* ----------------------------------------------------------------------
   12) CONTINUAR PARA O PRÓXIMO PASSO
---------------------------------------------------------------------- */
let variacaoPendente = [0,0,0];

function exibirBotaoContinuar(variacao){
  variacaoPendente = variacao;
  document.getElementById("btn-continuar").classList.remove("oculto");
}

document.getElementById("btn-continuar").addEventListener("click", () => {
  avancarAposPergunta(variacaoPendente);
});

function avancarAposPergunta(variacao){
  estado.perguntaAtualIndex++;

  const fimDaRodada = estado.perguntaAtualIndex >= PERGUNTAS_POR_RODADA;
  const fimDoJogo = fimDaRodada && estado.rodadaAtual >= TOTAL_RODADAS;

  if(fimDoJogo){
    mostrarTelaFinal();
    return;
  }

  if(fimDaRodada){
    estado.rodadaAtual++;
    estado.perguntaAtualIndex = 0;
    estado.perguntasDaRodada = montarPerguntasDaRodada();
  }

  renderizarPlacar(variacao);
  mostrarTela("placar");
}

/* ----------------------------------------------------------------------
   13) TELA FINAL
---------------------------------------------------------------------- */
function mostrarTelaFinal(){
  const ranking = estado.grupos
    .map((g, idx) => ({...g, idxOriginal: idx}))
    .sort((a, b) => b.pontos - a.pontos);

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

  dispararConfete();
  mostrarTela("final");
}

function dispararConfete(){
  const container = document.getElementById("confete-container");
  container.innerHTML = "";
  const cores = ["#17a3c2", "#ff4d5e", "#f6a723", "#3a4a78", "#2ee6a6"];

  for(let i = 0; i < 120; i++){
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
   14) MODAL: APRESENTAÇÃO "COMO JOGAR" (Google Slides)
---------------------------------------------------------------------- */
const modalApresentacao = document.getElementById("modal-como-jogar");
const iframeApresentacao = document.getElementById("iframe-apresentacao");

function abrirApresentacao(){
  iframeApresentacao.src = iframeApresentacao.dataset.src;
  modalApresentacao.classList.remove("oculto");
}

function fecharApresentacao(){
  modalApresentacao.classList.add("oculto");
}

document.getElementById("btn-como-jogar").addEventListener("click", abrirApresentacao);
document.getElementById("btn-fechar-apresentacao").addEventListener("click", fecharApresentacao);

document.addEventListener("keydown", (e) => {
  if(e.key === "Escape" && !modalApresentacao.classList.contains("oculto")) fecharApresentacao();
});