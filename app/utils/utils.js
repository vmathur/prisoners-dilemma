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
  