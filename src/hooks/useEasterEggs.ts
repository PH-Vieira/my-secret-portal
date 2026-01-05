import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

export function useEasterEggs() {
  const [matrixActive, setMatrixActive] = useState(false);
  const [terminalActive, setTerminalActive] = useState(false);
  const [rainbowActive, setRainbowActive] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [typedChars, setTypedChars] = useState('');

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Konami code
      if (e.code === KONAMI_CODE[konamiIndex]) {
        const newIndex = konamiIndex + 1;
        if (newIndex === KONAMI_CODE.length) {
          setMatrixActive(true);
          setKonamiIndex(0);
          // Auto-disable after 8 seconds
          setTimeout(() => setMatrixActive(false), 8000);
        } else {
          setKonamiIndex(newIndex);
        }
      } else {
        setKonamiIndex(0);
      }

      // Check for "sudo" typed
      if (e.key.length === 1) {
        const newTyped = (typedChars + e.key).slice(-4);
        setTypedChars(newTyped);
        if (newTyped.toLowerCase() === 'sudo') {
          setTerminalActive(true);
          setTypedChars('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex, typedChars]);

  const closeTerminal = useCallback(() => {
    setTerminalActive(false);
  }, []);

  const closeMatrix = useCallback(() => {
    setMatrixActive(false);
  }, []);

  const triggerRainbow = useCallback(() => {
    setRainbowActive(true);
    setTimeout(() => setRainbowActive(false), 5000);
  }, []);

  return {
    matrixActive,
    terminalActive,
    rainbowActive,
    closeTerminal,
    closeMatrix,
    triggerRainbow,
  };
}
