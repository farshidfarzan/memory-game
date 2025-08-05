let flipped = [];
let logs = [];

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('matched') || flipped.includes(card)) return;

    card.classList.add('flipped');
    card.innerText = card.dataset.card;
    flipped.push(card);

    logs.push({
      time: new Date().toISOString(),
      action: 'flip',
      cardId: card.id,
      value: card.dataset.card
    });

    if (flipped.length === 2) {
      setTimeout(() => {
        const [c1, c2] = flipped;
        const isMatch = c1.dataset.card === c2.dataset.card;
        logs.push({
          time: new Date().toISOString(),
          action: 'resolve',
          cards: [c1.id, c2.id],
          result: isMatch ? 'match' : 'no match'
        });

        if (isMatch) {
          c1.classList.add('matched');
          c2.classList.add('matched');
        } else {
          c1.classList.remove('flipped');
          c2.classList.remove('flipped');
          c1.innerText = '';
          c2.innerText = '';
        }

        flipped = [];
      }, 1000);
    }
  });
});

document.getElementById('download-log').addEventListener('click', () => {
  const content = JSON.stringify(logs, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'memory_game_log.json';
  a.click();
});
