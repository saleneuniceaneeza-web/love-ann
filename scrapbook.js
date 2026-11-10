document.addEventListener('DOMContentLoaded', () => {
  const memories = Array.isArray(window.SCRAPBOOK_MEMORIES) ? window.SCRAPBOOK_MEMORIES : [];
  const grid = document.getElementById('memory-grid');
  const empty = document.getElementById('empty-scrapbook');
  const count = document.getElementById('memory-count');
  const namesList = document.getElementById('contributor-list');
  const noNames = document.getElementById('no-contributors');
  const randomButton = document.getElementById('random-memory');

  count.textContent = String(memories.length);
  empty.hidden = memories.length > 0;

  const contributors = [...new Set(memories.map((item) => item.name).filter(Boolean))];
  noNames.hidden = contributors.length > 0;
  contributors.forEach((name) => {
    const li = document.createElement('li');
    li.textContent = name;
    namesList.appendChild(li);
  });

  const createCard = (item, index) => {
    const card = document.createElement('article');
    card.className = 'memory-card';
    card.id = `memory-${index + 1}`;
    card.style.animationDelay = `${Math.min(index * 70, 500)}ms`;

    const tape = document.createElement('span');
    tape.className = 'memory-tape';
    tape.setAttribute('aria-hidden', 'true');
    card.appendChild(tape);

    if (item.photo) {
      const image = document.createElement('img');
      image.className = 'memory-photo';
      image.src = item.photo;
      image.alt = item.photoAlt || `A memory shared by ${item.name || 'a friend'}`;
      image.loading = 'lazy';
      image.onerror = () => {
        const placeholder = document.createElement('div');
        placeholder.className = 'memory-photo-placeholder';
        placeholder.setAttribute('aria-hidden', 'true');
        placeholder.textContent = '♡';
        image.replaceWith(placeholder);
      };
      card.appendChild(image);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'memory-photo-placeholder';
      placeholder.setAttribute('aria-hidden', 'true');
      placeholder.textContent = '♡';
      card.appendChild(placeholder);
    }

    const message = document.createElement('p');
    message.className = 'memory-message';
    message.textContent = item.message || '';
    card.appendChild(message);

    if (item.name) {
      const author = document.createElement('p');
      author.className = 'memory-author';
      author.textContent = `with love, ${item.name}`;
      card.appendChild(author);
    }

    if (item.audio) {
      const audio = document.createElement('audio');
      audio.className = 'memory-audio';
      audio.controls = true;
      audio.preload = 'none';
      audio.src = item.audio;
      audio.setAttribute('aria-label', `Audio memory from ${item.name || 'a friend'}`);
      card.appendChild(audio);
    }
    return card;
  };

  memories.forEach((item, index) => grid.appendChild(createCard(item, index)));

  randomButton.addEventListener('click', () => {
    if (!memories.length) {
      empty.scrollIntoView({ behavior: 'smooth', block: 'center' });
      empty.classList.remove('empty-nudge');
      requestAnimationFrame(() => empty.classList.add('empty-nudge'));
      return;
    }
    const target = document.getElementById(`memory-${Math.floor(Math.random() * memories.length) + 1}`);
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.animate([{ outline: '0 solid rgba(112,153,190,0)' }, { outline: '5px solid rgba(112,153,190,.34)' }, { outline: '0 solid rgba(112,153,190,0)' }], { duration: 900 });
  });

  // YouTube requires an intentional user action to start playback. Keep its
  // player visible while active, with YouTube's own controls available.
  const videoId = 'F7A3bPg1lJ4';
  const musicPanel = document.getElementById('youtube-music-panel');
  const musicToggle = document.getElementById('music-toggle');
  const musicLabel = document.getElementById('music-label');
  let player;
  let apiLoading = false;
  let shouldPlay = false;

  const setMusicState = (isPlaying) => {
    musicToggle.setAttribute('aria-pressed', String(isPlaying));
    musicToggle.setAttribute('aria-label', isPlaying ? 'Pause background music' : 'Turn background music on');
    musicLabel.textContent = isPlaying ? 'Music on' : 'Music off';
  };

  const makePlayer = () => {
    if (player || !window.YT || !window.YT.Player) return;
    player = new window.YT.Player('youtube-player', {
      width: '200',
      height: '200',
      videoId,
      playerVars: { playsinline: 1, controls: 1, rel: 0 },
      events: {
        onReady: (event) => { if (shouldPlay) event.target.playVideo(); },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) setMusicState(true);
          if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) setMusicState(false);
        },
        onError: () => { musicLabel.textContent = 'Unavailable'; setTimeout(() => setMusicState(false), 2400); }
      }
    });
  };

  const loadYouTubeApi = () => {
    if (window.YT && window.YT.Player) { makePlayer(); return; }
    if (apiLoading) return;
    apiLoading = true;
    window.onYouTubeIframeAPIReady = makePlayer;
    const api = document.createElement('script');
    api.src = 'https://www.youtube.com/iframe_api';
    api.async = true;
    document.head.appendChild(api);
  };

  musicToggle.addEventListener('click', () => {
    if (shouldPlay) {
      shouldPlay = false;
      if (player) player.pauseVideo();
      musicPanel.hidden = true;
      setMusicState(false);
      return;
    }
    shouldPlay = true;
    musicPanel.hidden = false;
    loadYouTubeApi();
    if (player) player.playVideo();
  });
});
