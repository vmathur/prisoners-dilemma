import seedrandom from 'seedrandom';

export const generateColors = (address) => {
    const rng = seedrandom(address);
    const colors = [];
    for (let i = 0; i < 5; i++) {
      const color = `#${Math.floor(rng() * 16777215).toString(16).padStart(6, '0')}`;
      colors.push(color);
    }
    return colors;
};

export const computeScore = (filteredCompletedGames, address) => {
  let totalScore = 0;
  filteredCompletedGames.forEach(game => {
    if (game.player1 === address) {
      totalScore += Number(game.player1ScoreDiff);
    } else if (game.player2 === address) {
      totalScore += Number(game.player2ScoreDiff);
    }
  });
  return totalScore;
}

