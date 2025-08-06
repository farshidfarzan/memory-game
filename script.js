//  Generate a random 5-digit UID
const UID = Math.floor(10000 + Math.random() * 90000);

// Show UID on the page
document.addEventListener("DOMContentLoaded", () => {
  const uidDisplay = document.getElementById("uid-display");
  if (uidDisplay) {
    uidDisplay.textContent = `Your UID: ${UID}`;
  }
});

const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedPairs = 0;
let gameLog = []; //  Log actions here

//  Main click logic
cards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    card.classList.add('flipped');
    const image = card.getAttribute('data-image');
    const matchId = card.getAttribute('data-match');
    card.style.backgroundImage = `url('images/${image}')`;

    //  Log the card flip
    logAction(`Flipped card with image: ${image}, match group: ${matchId}`);

    flippedCards.push(card);

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const match1 = first.getAttribute('data-match');
      const match2 = second.getAttribute('data-match');

      if (match1 === match2) {
        flippedCards = [];
        matchedPairs++;

        //  Log match success
        logAction(`Matched pair: ${match1}`);
      } else {
        setTimeout(() => {
          flippedCards.forEach(c => {
            c.classList.remove('flipped');
            c.style.backgroundImage = "url('images/back.png')";
          });
          flippedCards = [];

          //  Log mismatch
          logAction(`Mismatch between ${match1} and ${match2}`);
        }, 1000);
      }
    }
  });
});

//  Logging helper
function logAction(action) {
  const timestamp = new Date().toISOString();
  gameLog.push(`${timestamp} - ${action}`);
}

//  Download log on button click
document.getElementById("downloadBtn").addEventListener("click", () => {
  if (gameLog.length === 0) {
    alert("No activity to download yet.");
    return;
  }

  const blob = new Blob([gameLog.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "memory_game_log.txt";
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

