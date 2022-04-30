export const wrapLine = (line: string) => {
  const wrapped = [];

  let currentLine = '';
  line.split(' ').forEach((word) => {
    if (currentLine.length + word.length < 30) {
      currentLine += `${currentLine.length ? ' ' : ''}${word}`;
    } else {
      wrapped.push(currentLine);
      currentLine = word;
    }
  });

  wrapped.push(currentLine);

  return wrapped;
};
