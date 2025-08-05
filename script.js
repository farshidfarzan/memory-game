const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedPairs = 0;

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.classList.add('flipped');
    const image = card.getAttribute('data-image');
    card.style.backgroundImage = `url('images/${image}')`;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const match1 = first.getAttribute('data-match');
      const match2 = second.getAttribute('data-match');

      if (match1 === match2) {
        flippedCards = [];
        matchedPairs++;
      } else {
        setTimeout(() => {
          flippedCards.forEach(c => {
            c.classList.remove('flipped');
            c.style.backgroundImage = "url('images/back.png')";
          });
          flippedCards = [];
        }, 1000);
      }
    }
  });
});
