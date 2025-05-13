let games = [];

fetch('games.json')
  .then(res => res.json())
  .then(data => {
    games = data;
    displayGames(games);
  });

const gameContainer = document.getElementById('gameContainer');
const searchInput = document.getElementById('search');
const themeSwitcher = document.getElementById('themeSwitcher');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalURL = document.getElementById('modalURL');
const hacksContainer = document.getElementById('hacksContainer');
const closeModal = document.getElementById('closeModal');

function displayGames(gameList) {
  gameContainer.innerHTML = '';
  gameList.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `<h3>${game.name}</h3><p>${game.description}</p>`;
    card.onclick = () => showModal(game);
    gameContainer.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = games.filter(game => game.name.toLowerCase().includes(term));
  displayGames(filtered);
});

themeSwitcher.addEventListener('change', () => {
  document.body.className = 'theme-' + themeSwitcher.value;
});

function showModal(game) {
  modal.classList.remove('hidden');
  modalTitle.textContent = game.name;
  modalDesc.textContent = game.description;
  modalURL.href = game.url;
  hacksContainer.innerHTML = '';

  game.hacks.forEach(hack => {
    const block = document.createElement('div');
    block.className = 'code-block';

    const pre = document.createElement('pre');
    pre.textContent = hack;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(hack);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy', 1000);
    };

    block.appendChild(pre);
    block.appendChild(copyBtn);
    hacksContainer.appendChild(block);
  });
}

closeModal.onclick = () => {
  modal.classList.add('hidden');
};

window.onclick = e => {
  if (e.target === modal) modal.classList.add('hidden');
};
