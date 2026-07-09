const games = [
  {
    title: "도구리 하와이 댄스",
    url: "https://citrusade.github.io/Doguri_dance/",
    description: "화살표 키를 맞춰 누르며 하와이에서 춤추는 도구리 리듬 게임입니다. 스테이지를 클리어하고 기념 도감을 모아보세요.",
    category: "Rhythm",
    status: "playable",
    tags: ["도구리", "하와이", "리듬"],
    accent: "#58d68d",
    preview: true
  },
  {
    title: "Doguri Dungeon",
    url: "https://cheyminho.github.io/doguri_dungeon/",
    description: "던전을 탐험하며 앞으로 나아가는 도구리 어드벤처 게임입니다.",
    category: "Adventure",
    status: "playable",
    tags: ["도구리", "던전", "액션"],
    accent: "#43a5ff",
    preview: true
  },
  {
    title: "We Are Table",
    url: "https://goonanhooo.itch.io/we-are-table",
    description: "협동과 타이밍이 중요한 테이블 테마의 캐주얼 게임입니다.",
    category: "Casual",
    status: "playable",
    tags: ["itch.io", "협동", "캐주얼"],
    accent: "#ff8a5b",
    preview: false
  },
  {
    title: "Game Runner",
    url: "https://game-runner-smoky.vercel.app/",
    description: "빠르게 달리고 피하며 기록을 노리는 러너형 웹게임입니다.",
    category: "Runner",
    status: "playable",
    tags: ["러너", "스피드", "Vercel"],
    accent: "#55d8bd",
    preview: true
  },
  {
    title: "Doguri Fishing",
    url: "https://cheyminho.github.io/doguri_fishing/",
    description: "느긋하게 낚시를 즐기는 도구리 테마의 힐링 게임입니다.",
    category: "Simulation",
    status: "playable",
    tags: ["도구리", "낚시", "힐링"],
    accent: "#ffd84d",
    preview: true
  },
  {
    title: "삼국지 카드 게임",
    url: "https://gnsyoo.github.io/tkh-tcg/",
    description: "장수 카드를 모아 덱을 꾸리고, 턴제 전투와 레이드, 보드 카드 대전을 즐기는 삼국지 테마 TCG입니다.",
    category: "Card",
    status: "playable",
    tags: ["삼국지", "TCG", "전략"],
    accent: "#a982ff",
    preview: true
  },
  {
    title: "도구리 배구",
    url: "https://ghostflare76.github.io/doguri/",
    description: "추억의 피카추 배구를 오마주한 도구리 테마의 캐주얼 배구 게임입니다.",
    category: "Casual",
    status: "playable",
    tags: ["도구리", "배구", "오마주"],
    accent: "#ff70a6",
    preview: true
  },
  {
    title: "Run N Jump",
    url: "https://runnjump.vercel.app/",
    description: "Three.js와 TypeScript로 직접 구현한 물리 로직, Tone.js 사운드 합성, 실시간 튜닝 UI를 실험한 3D 하드코어 점프 게임 프로토타입입니다.",
    category: "Platformer",
    status: "prototype",
    tags: ["Three.js", "3D", "점프"],
    accent: "#2f80ed",
    preview: true
  }
];

const state = {
  search: "",
  status: "all",
  category: "all"
};

const gameGrid = document.querySelector("#gameGrid");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categorySelect");
const resultSummary = document.querySelector("#resultSummary");
const gameCount = document.querySelector("#gameCount");
const featuredTitle = document.querySelector("#featuredTitle");
const featuredLink = document.querySelector("#featuredLink");
const filterButtons = [...document.querySelectorAll(".filter-chip")];

function normalize(value) {
  return value.toLowerCase().trim();
}

function getStatusLabel(status) {
  return status === "prototype" ? "프로토타입" : "플레이 가능";
}

function getStatusColor(status) {
  return status === "prototype" ? "#d9c2ff" : "#b9f7d3";
}

function matchesGame(game) {
  const searchTarget = normalize(
    [game.title, game.description, game.category, ...game.tags].join(" ")
  );
  const searchMatches = !state.search || searchTarget.includes(state.search);
  const statusMatches = state.status === "all" || game.status === state.status;
  const categoryMatches = state.category === "all" || game.category === state.category;

  return searchMatches && statusMatches && categoryMatches;
}

function createTagList(tags) {
  return tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
}

function createPreview(game) {
  const fallback = `<div class="preview-fallback">${game.title}</div>`;

  if (!game.preview) {
    return fallback;
  }

  return `
    <iframe
      title="${game.title} 미리보기"
      src="${game.url}"
      loading="lazy"
      tabindex="-1"
    ></iframe>
    ${fallback}
  `;
}

function createGameCard(game) {
  const frameClass = game.preview ? "has-frame" : "";

  return `
    <article class="game-card ${frameClass}" style="--accent: ${game.accent}; --badge: ${getStatusColor(game.status)}">
      <div class="preview" aria-hidden="true">
        ${createPreview(game)}
      </div>
      <div class="card-body">
        <div class="card-title-row">
          <h3>${game.title}</h3>
          <span class="status-badge">${getStatusLabel(game.status)}</span>
        </div>
        <p class="description">${game.description}</p>
        <div class="tag-list" aria-label="${game.title} 태그">
          ${createTagList(game.tags)}
        </div>
        <div class="card-actions">
          <a class="source-link" href="${game.url}" target="_blank" rel="noreferrer">원본 링크</a>
          <a class="play-button" href="${game.url}" target="_blank" rel="noreferrer">플레이</a>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const visibleGames = games.filter(matchesGame);
  gameGrid.innerHTML = visibleGames.map(createGameCard).join("");
  emptyState.hidden = visibleGames.length > 0;
  resultSummary.textContent = `${visibleGames.length}개의 게임이 표시되고 있습니다.`;
}

function fillCategories() {
  const categories = [...new Set(games.map((game) => game.category))].sort();
  categorySelect.insertAdjacentHTML(
    "beforeend",
    categories.map((category) => `<option value="${category}">${category}</option>`).join("")
  );
}

function bindEvents() {
  searchInput.addEventListener("input", (event) => {
    state.search = normalize(event.target.value);
    render();
  });

  categorySelect.addEventListener("change", (event) => {
    state.category = event.target.value;
    render();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.status = button.dataset.status;
      render();
    });
  });
}

function initializeFeaturedGame() {
  const featuredGame = games[Math.floor(Math.random() * games.length)];
  featuredTitle.textContent = featuredGame.title;
  featuredLink.href = featuredGame.url;
  gameCount.textContent = `${games.length} games`;
}

fillCategories();
bindEvents();
initializeFeaturedGame();
render();
