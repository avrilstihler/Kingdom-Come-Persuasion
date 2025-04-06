function jogar() {
  alert(
    "🏰 Você está diante do Rei Henrique IV! Acusado de traição, sua única chance é convencê-lo de sua inocência. Escolha suas palavras com sabedoria, ou enfrentará a forca! ⚔️"
  );

  let desejaLer = prompt(
    "Deseja ler a descrição detalhada do seu julgamento? (Sim/Não)"
  );
  while (
    desejaLer !== null &&
    !["sim", "não", "nao"].includes(desejaLer.toLowerCase())
  ) {
    desejaLer = prompt(
      "Resposta inválida! Digite 'Sim' para ler ou 'Não' para continuar direto para o jogo."
    );
  }

  if (desejaLer !== null && desejaLer.toLowerCase() === "sim") {
    alert(
      "🏰 O Julgamento do Forasteiro ⚔️\n\nTuas mãos estão atadas. O frio do chão de pedra te lembra que esta pode ser tua última noite. Soldados te escoltam pelo longo corredor iluminado por tochas, seus passos ecoando pelo castelo. A multidão murmura quando és conduzido ao salão do trono.\n\nA história que te trouxe até aqui já corre pelas ruas: um forasteiro capturado na calada da noite, suspeito de traição contra o reino. Os boatos variam—uns dizem que és um espião, outros, um ladrão. Mas a verdade importa pouco agora. O rei já ouviu as acusações.\n\nDiante de ti, Rei Henrique IV observa em silêncio. Seus olhos calculistas avaliam tua postura, tuas vestes, cada respiração tua. O tribunal aguarda tua defesa.\n\nO arauto bate seu cajado no chão.\n\n'Forasteiro, estás diante de Sua Majestade. Fala com sabedoria, pois tuas palavras decidirão teu destino!'"
    );
  }

  // Pergunta o nome do jogador
  let nomeJogador = "";
  while (!/^[A-Za-z]{2,}$/.test(nomeJogador)) {
    nomeJogador = prompt(
      "🤴 Antes de começarmos, diga-me, forasteiro, qual é o teu nome? (Apenas letras, mínimo 2 caracteres)"
    );
    if (nomeJogador === null) {
      alert(
        "⚖️ O rei suspira. 'Sem nome, sem julgamento. Teu destino virá por si só.'"
      );
      throw "Jogo encerrado.";
    }
    if (!/^[A-Za-z]{2,}$/.test(nomeJogador)) {
      alert(
        "⚠️ O rei franze a testa. 'Esse não é um nome digno. Diga-me um nome verdadeiro!'"
      );
    }
  }

  let pontosPersuasao = 1;
  let sobrevivente = true;

  // Escolher dificuldade
  let dificuldade = prompt(
    "Escolha a dificuldade:\n1️⃣ Fácil - Você terá um atributo forte que ajuda nas escolhas.\n2️⃣ Difícil - O rei julgará suas respostas de forma aleatória."
  );
  while (!["1", "2"].includes(dificuldade)) {
    if (dificuldade === null) {
      alert(
        "⚖️ O rei suspira. 'Sem escolha, sem destino. Tua sorte será decidida pelos deuses.'"
      );
      throw "Jogo encerrado.";
    }
    dificuldade = prompt(
      "⚠️ Escolha inválida! Digite 1 para Fácil ou 2 para Difícil."
    );
  }

  dificuldade = parseInt(dificuldade);

  // Atributos possíveis
  const atributos = ["Astúcia", "Honra", "Intimidação"];
  let atributoForte = null;
  if (dificuldade === 1) {
    atributoForte = atributos[Math.floor(Math.random() * atributos.length)];
    alert(`🎭 Teu atributo forte nesta rodada é: ${atributoForte}`);
  }

  function calcularChance(respostaAtributo) {
    if (dificuldade === 1 && respostaAtributo === atributoForte) {
      return Math.random() < 0.9; // 90% de chance de sucesso
    } else {
      return Math.random() < 0.5; // 50% de chance de sucesso
    }
  }

  function mensagemDerrota() {
    alert(
      `⚔️ O rei Henrique IV ergue a mão, e o salão mergulha em um silêncio sepulcral. 'Tua língua não soube te salvar, ${nomeJogador}. A justiça do reino é implacável.'\n\nGuardas o agarram pelos braços, suas botas arrastando pelo chão de pedra fria. O vento gélido corta sua pele quando é levado ao patíbulo, onde uma multidão se reúne, murmurando entre si.\n\nO carrasco ajusta a corda ao redor do teu pescoço. O céu, antes azul, agora parece cinzento e opressivo. O arauto proclama em alta voz: 'Por traição ao reino, ${nomeJogador} enfrentará a justa punição!'\n\nO rei observa de sua varanda, inexpressivo. O tambor ressoa pela praça. E então...\n\nO mundo escurece.\n\n💀 FIM. A justiça do reino foi feita.`
    );
    throw "Jogo encerrado.";
  }

  function perguntar(pergunta, opcoes, atributosOpcoes, falhas, sucessos) {
    let escolha;

    do {
      escolha = prompt(
        `🤴 ${pergunta}\n\n1️⃣ ${opcoes[0]} (${atributosOpcoes[0]})\n2️⃣ ${opcoes[1]} (${atributosOpcoes[1]})\n3️⃣ ${opcoes[2]} (${atributosOpcoes[2]})\n\nDigite o número da sua escolha:`
      );

      if (escolha === null) {
        alert("🔮 Teu julgamento virá em outra ocasião...");
        throw new Error("Jogo encerrado pelo jogador");
      }
    } while (!["1", "2", "3"].includes(escolha));

    let indiceEscolhido = parseInt(escolha) - 1;
    let chanceSucesso = calcularChance(atributosOpcoes[indiceEscolhido]);

    if (chanceSucesso) {
      alert(`✅ ${sucessos[indiceEscolhido].replace("{nome}", nomeJogador)}`);
    } else {
      if (pontosPersuasao > 0) {
        let usarPonto = confirm(
          "⚠️ O rei franze a testa. 'Isso me soa como uma desculpa esfarrapada.' Você quer usar seu Ponto de Persuasão para tentar outra resposta?"
        );
        if (usarPonto) {
          pontosPersuasao--;
          return perguntar(pergunta, opcoes, atributosOpcoes, falhas, sucessos);
        }
      }
      alert(`❌ ${falhas[indiceEscolhido].replace("{nome}", nomeJogador)}`);
      mensagemDerrota();
    }
  }

  // Pergunta 1
  perguntar(
    `Forasteiro ${nomeJogador}, fostes encontrado vagando pelas terras do reino sob a calada da noite. O que tens a dizer em tua defesa?`,
    [
      "Perdi-me após a feira em um vilarejo próximo, meu senhor.",
      "Eu sou um espião do reino vizinho e nada temo!",
      "Estava caçando cervos para vender na taverna, meu senhor.",
    ],
    ["Honra", "Intimidação", "Astúcia"],
    [
      "O rei se ergue furioso. '{nome}, não admitimos forasteiros esgueirando-se por nossas terras! Guardas, levem-no!' ☠️",
      "O rei recua levemente. 'Tens coragem... Mas coragem pode ser traiçoeira. Leve-o! ☠️'",
      "O rei balança a cabeça. 'Uma desculpa pobre. Não posso aceitar isso!' ☠️",
    ],
    [
      "O rei cruza os braços. 'Hmmm... Talvez seja verdade, {nome}. Continue.'",
      "O rei estreita os olhos. 'Curioso... Um homem sem medo. Ainda assim, falo eu o veredicto, {nome}.'",
      "O rei ri. 'Cervos, hm? Um caçador esperto, mas ainda assim suspeito.'",
    ]
  );

  if (sobrevivente) {
    // Pergunta 2
    perguntar(
      "Diga-me, qual é a tua lealdade? Os homens do trono são testados pela forja da guerra!",
      [
        "Meu coração e minha lâmina pertencem ao reino, sempre!",
        "Lealdade se compra com ouro, Majestade.",
        "Os nobres são tão corruptos quanto os ladrões das ruas.",
      ],
      ["Honra", "Astúcia", "Intimidação"],
      [
        "O rei bate com o punho na mesa. 'Patife! Não há honra em ti. Mandem-no para as masmorras!' ☠️",
        "O rei bufa. 'És um mercenário, {nome}, nada mais. Guardas, tirem-no de minha presença!' ☠️",
        "O rei se enfurece. 'Não admito insultos a minha corte!' ☠️",
      ],
      [
        "O rei sorri levemente. 'Palavras de um verdadeiro súdito, {nome}. Acredito em ti.'",
        "O rei acena levemente. 'Ouro move o mundo, de fato... Continue.'",
        "O rei dá um meio sorriso. 'Duro, mas não erras. Sigo te ouvindo, {nome}.'",
      ]
    );
  }

  if (sobrevivente) {
    // Pergunta 3
    perguntar(
      "O rei te observa com desconfiança. 'Diga-me, {nome}, se não és um traidor, então por que carregavas consigo um mapa detalhado do castelo?'",
      [
        "Sou cartógrafo e desenhei o mapa por admiração à arquitetura do castelo.",
        "Esse mapa foi plantado em minha bolsa! Jamais o vi antes!",
        "O mapa pertence a um amigo, eu apenas o carregava.",
      ],
      ["Astúcia", "Honra", "Intimidação"],
      [
        "O rei bate seu punho no braço do trono. 'Um cartógrafo, dizes? Que conveniente! Guardas, levem-no!' ☠️",
        "O rei suspira. 'Todos dizem isso, mas as provas falam mais alto. Teu destino está selado!' ☠️",
        "O rei estreita os olhos. 'Um amigo? Nomeie-o, então! ...Ah, silêncio? Pois bem, a forca te espera.' ☠️",
      ],
      [
        "O rei arqueia uma sobrancelha. 'Cartógrafo? Hm... Uma profissão curiosa, {nome}.'",
        "O rei cruza os braços. 'Hmmm... Um golpe tão baixo quanto eficiente. Há lógica em tuas palavras, {nome}.'",
        "O rei ri. 'Então estavas apenas ajudando um amigo? Que lealdade fascinante, {nome}.'",
      ]
    );
  }

  // Mensagem de vitória
  if (sobrevivente) {
    alert(
      `🎉 O rei Henrique IV foi convencido de sua inocência, ${nomeJogador}! És livre para retomar tua vida, que os Deuses te guiem! 🏆`
    );
  }
}
