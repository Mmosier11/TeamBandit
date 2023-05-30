// -------------------------------------------------------------------------- //
//-                            USETYPEWRITER HOOK                            -//
// -------------------------------------------------------------------------- //

import { useEffect, useRef, useState } from 'react';
/* -------------------------------------------------------------------------- */
// ---------------------------------- Types --------------------------------- //
interface TypewriterEffectOptions {
  typingSpeed?: number;
  delayBetweenLines?: number;
  onFinished?: () => void;
}
/* -------------------------------------------------------------------------- */
export const useTypewriterEffect = (lines: string[], options: TypewriterEffectOptions = {}) => {
  const [output, setOutput] = useState('');
  const { typingSpeed = 100, delayBetweenLines = 1000, onFinished } = options;
  const linesRef = useRef(lines);
  /* ---------------------------------- */
  const currentLine = useRef(0);
  const currentChar = useRef(0);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    linesRef.current = lines;
  }, [lines]);

  useEffect(() => {
    const type = () => {
      if (currentLine.current >= linesRef.current.length) {
        return;
      }

      const currentString = linesRef.current[currentLine.current];
      const currentCharString = currentString[currentChar.current];

      // Handle newline characters
      if (currentCharString === '\n') {
        setOutput((prevOutput) => prevOutput + '\n');
        currentChar.current++;
      } else {
        setOutput((prevOutput) => prevOutput + currentCharString);
        currentChar.current++;
      }

      if (currentChar.current === currentString.length) {
        currentChar.current = 0;
        currentLine.current++;
        setTimeout(() => {
          type();
        }, delayBetweenLines);
      } else {
        timer.current = setTimeout(type, typingSpeed);
      }
    };

    type();
    return () => {
      clearTimeout(timer.current);
    };
  }, [typingSpeed, delayBetweenLines]);

  return output;
};
