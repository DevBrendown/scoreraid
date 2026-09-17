/* ======================================================================
   SCORERAID — BANCO DE DADOS (temas e perguntas)
====================================================================== */

const TEMAS = [
  { id: "matematica",  nome: "Matemática",               icone: "🧮", cor: "#5B8DEF" },
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
  { id: "anime",       nome: "Anime",                    icone: "🍥", cor: "#FF6B6B" },
];

function pt(temaId, dificuldade, enunciado, alternativas, correta){
  return { tema: temaId, dificuldade, enunciado, alternativas, correta };
}

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
  pt("logica","facil","Se hoje é terça-feira, que dia será depois de ontem?",["Quarta-feira","Terça-feira","Sexta-feira","Domingo"],1),
  pt("logica","facil","Complete a sequência: 1, 3, 5, 7, ...",["8","9","10","11"],1),
  pt("logica","dificil","Se todos os gatos são animais, e Tom é um gato, então:",["Tom é um animal","Tom não é um animal","Tom é um cachorro","Nada pode ser concluído"],0),
  pt("logica","dificil","Qual número não pertence ao grupo: 2, 4, 6, 9, 8?",["2","4","9","8"],2),
  pt("logica","facil","Se A é maior que B, e B é maior que C, então:",["A é maior que C","C é maior que A","A é igual a C","Não é possível saber"],0),
  pt("logica","dificil","Três amigos dividem igualmente 12 balas. Quantas balas cada um recebe?",["3","4","5","6"],1),
  pt("logica","dificil","Qual figura completa a sequência lógica: círculo, quadrado, círculo, quadrado, ...?",["Triângulo","Círculo","Quadrado","Losango"],1),
  pt("logica","facil","Se um relógio marca 3 horas e passam 2 horas, que horas ele marcará?",["4 horas","5 horas","6 horas","3 horas"],1),

    // ---------------- ANIME ----------------
  pt("anime","dificil","Qual é o nome do anime em que os personagens lutam em um jogo de cartas chamado Duel Monsters?",["Yu-Gi-Oh!","Pokémon","Digimon","Cardcaptor Sakura"],0),
  pt("anime","dificil","Quem teve mais impacto nas fanarts de Naruto?",["Sakura","Obito","Kakashi (hetero)","Sasuke catboy"],3),
  pt("anime","dificil","Quem ganhou na luta de Sasuke vs Naruto no Vale do Fim?",["Sasuke","Naruto","Sasuke catboy","Lady Gaga"],0),
  pt("anime","dificil","Quem é a namorada do Light Yagami em Death Note?",["L","Misa","Ryuk","Sasuke catboy"],1),
  pt("anime","dificil","Em Pokémon, qual é a primeira evolução do Charmander?",["Charizard","Charmeleon","Chimchar","Catboymander"],1),
  pt("anime","dificil","Em Dragon Ball, qual é a transformação clássica de cabelo dourado de Goku?",["Sasuke catboy","Kaioken","Super Saiyajin","Beast"],2),
  pt("anime","dificil","Em Jujutsu Kaisen, quem é conhecido por usar uma venda nos olhos?",["Sukuna","Gojo","Sasuke catboy","Toji"],1),
  pt("anime","dificil","Em Naruto, quem é o irmão mais velho de Sasuke?",["Madara","Obito","Itachi","Catboy"],2),
  pt("anime","dificil","Em Naruto, qual é o nome da aldeia onde Naruto vive?",["Cascavel Velho","Vila dos Catboys","Vila da Folha","Vila da Pedra"],2),
  pt("anime","dificil","Qual é o Pokémon amarelo mais famoso?",["Pikachu","Charmander","Catboychu","Eevee"],0),
  pt("anime","dificil","Qual é o poder principal do Luffy?",["Ele estica o corpo","Ele controla gelo","Ele voa","Ele vira catboy"],0),
  pt("anime","dificil","Qual é o nome do protagonista de Dragon Ball?",["Goku","Vegeta","Zoro","Sasuke (catboy)"],0),
  pt("anime","dificil","Quem é a irmã do Tanjiro?",["Sakura","Nezuko","Hinata","Sasuke catboy"],1),
  pt("anime","dificil","Qual é o nome do protagonista de Naruto?",["Sasuke catboy","Naruto","Kakashi","Itachi"],1),
  pt("anime","dificil","Qual é o nome do protagonista de Death Note?",["L","Light","Near","Sasuke catboy"],1),
  pt("anime","dificil","Quem ganhou na luta Rock Lee vs Gaara?",["Rock Lee","Sasuke catboy","Gaara","Kaneki"],2),
];