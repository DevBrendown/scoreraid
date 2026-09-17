# 🍥 ScoreRaid

**Quiz de Conhecimentos Gerais para Equipes** — um jogo de perguntas e respostas estilo programa de TV, feito em **HTML, CSS e JavaScript puro**, sem backend, sem frameworks e sem dependências externas (além de fontes do Google).

Ideal para dinâmicas em sala de aula, treinamentos corporativos, eventos e apresentações — qualquer situação onde você quer dividir a galera em grupos e criar uma disputa saudável de conhecimento.

---

## 🎮 Como Funciona

- **3 equipes** competem entre si, cada uma começando com **30 pontos**.
- O jogo tem **6 rodadas**, cada uma com **6 perguntas**.
- A cada pergunta, o sistema sorteia um **tema** (via roleta 🎡 ou cartas viradas 🃏) e depois exibe uma pergunta de múltipla escolha daquele tema.
- Um cronômetro de 10 segundos abre a rodada de respostas — depois disso, o mestre do jogo (apresentador) marca manualmente qual grupo acertou, ou se ninguém acertou.
- **Perguntas Ofensivas 🔥** (a última de cada rodada) não somam pontos — elas fazem o grupo vencedor **roubar 20 pontos** de outro grupo à escolha.
- A cada **2 rodadas** (antes da rodada 2, 4 e 6), surge um **Evento Especial 🎲**: um grupo é sorteado aleatoriamente (sem repetir até todos passarem) e escolhe entre duas cartas viradas — uma dá **+20 pontos**, a outra tira **-40 pontos**. Dá pra pular o evento também.
- A **última rodada (6ª)** é especial: todas as perguntas são de Curiosidades, nível difícil, e todas valem como Ofensiva.
- Em caso de **empate no final**, o jogo entra automaticamente em **desempate por morte súbita** entre os grupos empatados.
- No fim, tela de pódio 🏆 com confete, e uma mensagem final reflexiva sobre jogo limpo e mercado de trabalho.

---

## 🗂️ Estrutura dos Arquivos

```
scoreraid/
├── index.html          # Estrutura de todas as telas do jogo
├── style.css           # Estilo visual completo (tema "estúdio de TV")
├── script.js           # Toda a lógica e regras do jogo
├── data.js             # Banco de perguntas e temas (edite aqui!)
├── respostas.html       # Tela auxiliar: mostra a resposta certa em tempo real
└── assets/
    ├── logo-scoreraid.png
    └── fundofinal.png
```

> Os arquivos são carregados nesta ordem no `index.html`: `data.js` → `script.js`. Isso é importante — o `data.js` precisa vir primeiro.

---

## 🖥️ Como Rodar

Como é 100% front-end (sem backend), você tem duas opções:

### Opção 1 — Servidor local (recomendado)
Necessário para o `respostas.html` funcionar corretamente (ele depende de `localStorage`, que exige que os arquivos sejam servidos pela mesma origem).

```bash
# Com Python instalado:
python -m http.server 8000
# depois acesse http://localhost:8000
```

Ou use a extensão **Live Server** do VS Code.

### Opção 2 — GitHub Pages
Suba a pasta para um repositório no GitHub e ative o GitHub Pages. Ficará disponível em:
```
https://seuusuario.github.io/scoreraid/index.html
https://seuusuario.github.io/scoreraid/respostas.html
```
Funciona perfeitamente, pois as duas páginas compartilham a mesma origem (`https://seuusuario.github.io`).

---

## 📺 Tela de Resposta em Tempo Real (`respostas.html`)

Pensada para rodar num segundo monitor, TV ou projetor separado do computador do mestre do jogo:

- Assim que uma pergunta aparece no `index.html`, o enunciado e a resposta certa são salvos no `localStorage`.
- O `respostas.html` escuta essa mudança e atualiza sozinho, em tempo real, sem precisar recarregar a página.
- Se nenhuma pergunta estiver em exibição, mostra "**Nenhuma pergunta a mostrar.**"

---

## ✏️ Como Adicionar/Editar Perguntas

Tudo fica em `data.js`. Cada pergunta é criada com a função `pt()`:

```js
pt("tema", "dificuldade", "Enunciado da pergunta?", ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"], indiceDaCorreta)
```

- `tema`: precisa bater com um dos `id` definidos no array `TEMAS` (ex: `"matematica"`, `"anime"`, `"geografia"`...).
- `dificuldade`: `"facil"` (10 pts) ou `"dificil"` (20 pts).
- `indiceDaCorreta`: posição da alternativa certa no array, começando em `0`.

Para criar um novo tema, adicione um objeto no array `TEMAS`:
```js
{ id: "novoTema", nome: "Nome Exibido", icone: "🎯", cor: "#RRGGBB" }
```

> O tema `"anime"` tem o **dobro de chance** de ser sorteado nas rodadas normais (configurável via `PESO_ANIME` em `script.js`).

---

## ⚙️ Principais Configurações (`script.js`)

Todas no topo do arquivo, fáceis de ajustar:

| Constante | Padrão | O que controla |
|---|---|---|
| `PONTOS_INICIAIS` | `30` | Pontos iniciais de cada equipe |
| `TOTAL_RODADAS` | `6` | Quantidade de rodadas do jogo |
| `PERGUNTAS_POR_RODADA` | `6` | Perguntas por rodada |
| `VALOR_OFENSIVA` | `20` | Pontos roubados na pergunta Ofensiva |
| `DURACAO_CRONOMETRO` | `10` | Segundos do cronômetro por pergunta |
| `PESO_ANIME` | `2` | Peso do tema Anime no sorteio |
| `TOTAL_PERGUNTAS_DESEMPATE` | `3` | Perguntas por rodada de desempate |
| `RODADAS_COM_EVENTO` | `[2, 4, 6]` | Em quais rodadas o Evento Especial aparece |
| `PONTOS_GANHO_EVENTO` | `20` | Pontos ganhos na carta boa do evento |
| `PONTOS_PERDA_EVENTO` | `40` | Pontos perdidos na carta ruim do evento |
| `VALOR_POR_DIFICULDADE` | `{facil: 10, dificil: 20}` | Pontuação por dificuldade |

---

## 🎲 Regras do Evento Especial

- Acontece automaticamente antes das rodadas definidas em `RODADAS_COM_EVENTO`.
- O grupo é sorteado por uma "sacola" embaralhada — cada grupo só pode ser sorteado de novo depois que todos já passaram pelo menos uma vez.
- O banner aparece na cor do grupo sorteado.
- Duas cartas viradas para baixo: ao escolher uma, **ambas** são reveladas, mostrando o que o grupo ganhou (ou o que teria acontecido se escolhesse a outra).
- O grupo pode optar por **pular** o evento sem risco.
- Os pontos nunca ficam negativos (o placar trava em `0`).

---

## 🧩 Telas do Jogo

| Tela | Função |
|---|---|
| Início | Nome das equipes |
| Placar | Placar entre perguntas/eventos |
| Evento Especial | Banner + cartas de sorte a cada 2 rodadas |
| Roleta / Cartas | Sorteio do tema da próxima pergunta |
| Pergunta | Enunciado, alternativas, cronômetro, botões de acerto/erro |
| Final | Pódio, confete e vencedor |
| Frase Final | Cards de valores (Trabalho em Equipe, Comunicabilidade, Ética) + mensagem reflexiva |

---

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 puro (grid, flexbox, animações, gradientes, `clamp()` para responsividade)
- JavaScript vanilla (ES6+), sem frameworks
- Fonte: [Exo 2](https://fonts.google.com/specimen/Exo+2) via Google Fonts
- Persistência leve entre páginas via `localStorage`

Nenhuma instalação, `npm install` ou build necessário — é só abrir e jogar.

---

## 📄 Licença

Projeto de uso livre para fins educacionais e institucionais. Adapte, personalize e reutilize à vontade.
