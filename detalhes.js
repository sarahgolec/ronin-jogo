// ============================================================
// RONIN - SISTEMA DE PÁGINAS DE DETALHES
// ============================================================


// Pega o parâmetro "tema" da URL

const parametros = new URLSearchParams(window.location.search);

const tema = parametros.get("tema");


// ============================================================
// CONTEÚDO DOS TEMAS
// ============================================================

const conteudos = {

    // ========================================================
    // EXPLORAÇÃO
    // ========================================================

    exploracao: {

        titulo: "Exploração do Mundo",

        subtitulo:
            "Descubra diferentes áreas e caminhos durante a jornada de Ronin.",

        icone:
            "fa-solid fa-map-location-dot",

        imagem:
            "floresta.img/floresta.png",

        secao:
            "Explorando o mundo de Ronin",

        descricao:
            "A exploração é uma das principais características da experiência de Ronin. Durante a jornada, o jogador pode percorrer diferentes áreas do mapa, atravessar caminhos e descobrir novos ambientes. A proposta é permitir que cada região tenha uma identidade visual própria, criando uma sensação de descoberta durante a aventura.",

        experiencia:
            "Exploração e descoberta",

        destaque:
            "Diversidade de ambientes",

        comoFunciona:
            "O jogador percorre o mapa utilizando os controles do personagem. Durante o caminho, pode encontrar florestas, montanhas, cavernas, templos e outras áreas inspiradas no Japão Feudal."
    },


    // ========================================================
    // COMBATE
    // ========================================================

    combate: {

        titulo: "Sistema de Combate",

        subtitulo:
            "Enfrente inimigos utilizando a espada e avance pela aventura.",

        icone:
            "fa-solid fa-khanda",

        imagem:
            "galeria-1.img/armadura dourada.jpeg",

        secao:
            "Como funciona o combate",

        descricao:
            "O sistema de combate é uma parte importante da experiência de Ronin. O personagem utiliza sua espada para enfrentar adversários encontrados durante a exploração. O jogador precisa controlar os movimentos do personagem e utilizar os ataques no momento adequado.",

        experiencia:
            "Ação e estratégia",

        destaque:
            "Combate com espada",

        comoFunciona:
            "Durante os confrontos, o jogador deve movimentar o personagem e utilizar o ataque para enfrentar os inimigos. A combinação entre movimentação e ataque permite avançar pelas diferentes áreas do jogo."
    },


    // ========================================================
    // CAVERNAS
    // ========================================================

    cavernas: {

        titulo: "Cavernas e Desafios",

        subtitulo:
            "Entre em ambientes diferentes e enfrente novos desafios.",

        icone:
            "fa-solid fa-mountain",

        imagem:
            "dimensao-2.img/portal.png",

        secao:
            "Explorando as cavernas",

        descricao:
            "As cavernas apresentam ambientes diferentes daqueles encontrados nas áreas abertas do mapa. Esses locais fazem parte da exploração e podem apresentar caminhos, obstáculos e situações que exigem atenção do jogador.",

        experiencia:
            "Exploração e desafios",

        destaque:
            "Ambientes subterrâneos",

        comoFunciona:
            "O jogador deve explorar as cavernas, observar os caminhos disponíveis e avançar pelo ambiente. A mudança de cenário ajuda a criar variedade durante a aventura."
    },


    // ========================================================
    // INIMIGOS
    // ========================================================

    inimigos: {

        titulo: "Inimigos e Batalhas",

        subtitulo:
            "Enfrente adversários espalhados pelo mundo de Ronin.",

        icone:
            "fa-solid fa-skull-crossbones",

        imagem:
            "templo.img/templo.png",

        secao:
            "Os inimigos do jogo",

        descricao:
            "Durante a aventura, o jogador encontra diferentes situações de combate. Os inimigos fazem parte dos desafios encontrados pelo caminho e exigem que o jogador utilize os recursos disponíveis para continuar avançando.",

        experiencia:
            "Combate e sobrevivência",

        destaque:
            "Confrontos durante a jornada",

        comoFunciona:
            "Ao encontrar adversários, o jogador precisa utilizar a movimentação e os ataques do personagem para enfrentar os confrontos e continuar sua jornada pelo mundo."
    },


    // ========================================================
    // VIDA
    // ========================================================

    personagem: {

        titulo: "Vida e Energia",

        subtitulo:
            "Acompanhe as condições do personagem durante os confrontos.",

        icone:
            "fa-solid fa-heart-pulse",

        imagem:
            "santuario.img/santuario.png",

        secao:
            "Sistema de vida do personagem",

        descricao:
            "Durante os confrontos, o personagem possui indicadores que representam sua condição no jogo. Acompanhar esses indicadores é importante para entender quando o personagem está em uma situação de risco.",

        experiencia:
            "Gerenciamento do personagem",

        destaque:
            "Indicadores de vida",

        comoFunciona:
            "O jogador deve prestar atenção aos indicadores apresentados durante a aventura. Evitar sofrer muitos ataques ajuda o personagem a permanecer ativo durante a exploração."
    },


    // ========================================================
    // AMBIENTE
    // ========================================================

    ambiente: {

        titulo: "Ambiente e Cenários",

        subtitulo:
            "Conheça os cenários inspirados no Japão Feudal.",

        icone:
            "fa-solid fa-tree",

        imagem:
            "floresta.img/floresta.png",

        secao:
            "Os cenários de Ronin",

        descricao:
            "O mundo de Ronin foi pensado para apresentar diferentes ambientes inspirados no Japão Feudal. Florestas, montanhas, templos, cavernas e outras paisagens ajudam a construir a identidade visual do jogo.",

        experiencia:
            "Ambientação e imersão",

        destaque:
            "Cenários inspirados no Japão Feudal",

        comoFunciona:
            "Conforme avança pelo jogo, o jogador passa por diferentes regiões. Cada ambiente possui características próprias e contribui para a construção da atmosfera da aventura."
    }

};


// ============================================================
// VERIFICA SE O TEMA EXISTE
// ============================================================

const dados = conteudos[tema] || conteudos.exploracao;


// ============================================================
// ALTERA O CONTEÚDO DA PÁGINA
// ============================================================

document.title =
    "RONIN - " + dados.titulo;


document.getElementById("tema-titulo").textContent =
    dados.titulo;


document.getElementById("tema-subtitulo").textContent =
    dados.subtitulo;


document.getElementById("tema-secao").textContent =
    dados.secao;


document.getElementById("tema-descricao").textContent =
    dados.descricao;


document.getElementById("tema-experiencia").textContent =
    dados.experiencia;


document.getElementById("tema-destaque").textContent =
    dados.destaque;


document.getElementById("tema-como-funciona").textContent =
    dados.comoFunciona;


// ============================================================
// ALTERA ÍCONE
// ============================================================

const icone = document.getElementById("tema-icone");

icone.className = dados.icone;


// ============================================================
// ALTERA IMAGEM
// ============================================================

const imagem = document.getElementById("tema-imagem");

imagem.src = dados.imagem;

imagem.alt = dados.titulo;