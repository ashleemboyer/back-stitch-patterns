const charsToNames = {
  ',': 'comma',
  '.': 'period',
  '!': 'exclamation-point',
  ' ': 'space',
  '-': 'hyphen',
  ':': 'colon',
  '(': 'paren-left',
  ')': 'paren-right',
};

interface PatternProps {
  lines: string[];
}

const Pattern = ({ lines }: PatternProps) => {
  return (
    <>
      {lines.map((line) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {Array.from(line).map((letter) => {
            const namedCharacter = charsToNames[letter];

            let src;
            if (namedCharacter) {
              src = `${namedCharacter}.svg`;
            } else if (Number(letter)) {
              src = `${letter}.svg`;
            } else if (letter === letter.toUpperCase()) {
              src = `${letter}-upper.svg`;
            } else {
              src = `${letter}-lower.svg`;
            }

            return <img src={`/${src}`} />;
          })}
        </div>
      ))}
    </>
  );
};

export default Pattern;
