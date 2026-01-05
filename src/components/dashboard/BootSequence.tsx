import { useState, useEffect } from 'react';
import { bootMessages, BOOT_COMPLETE_DELAY } from '@/config/bootMessages';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if already booted this session
    if (sessionStorage.getItem('hasBooted')) {
      onComplete();
      return;
    }

    let totalDelay = 0;
    const timeouts: NodeJS.Timeout[] = [];

    bootMessages.forEach((msg, index) => {
      totalDelay += msg.delay;
      const timeout = setTimeout(() => {
        setVisibleLines(index + 1);
        if (index === bootMessages.length - 1) {
          setIsTyping(false);
        }
      }, totalDelay);
      timeouts.push(timeout);
    });

    // Fade out and complete
    const completeTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        sessionStorage.setItem('hasBooted', 'true');
        onComplete();
      }, 500);
    }, totalDelay + BOOT_COMPLETE_DELAY);
    timeouts.push(completeTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ok':
        return 'text-terminal-green';
      case 'warn':
        return 'text-terminal-yellow';
      case 'error':
        return 'text-terminal-red';
      default:
        return 'text-terminal-cyan';
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-background flex flex-col justify-center p-8 font-mono transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="max-w-3xl mx-auto w-full">
        {/* ASCII Header */}
        <pre className="text-terminal-cyan text-xs mb-6 hidden sm:block">
{`
 __  __                                        _        _ 
|  \\/  | ___  _ __  _   _ _ __ ___   ___ _ __ | |_ __ _| |
| |\\/| |/ _ \\| '_ \\| | | | '_ \` _ \\ / _ \\ '_ \\| __/ _\` | |
| |  | | (_) | | | | |_| | | | | | |  __/ | | | || (_| | |
|_|  |_|\\___/|_| |_|\\__,_|_| |_| |_|\\___|_| |_|\\__\\__,_|_|
`}
        </pre>

        {/* Boot messages */}
        <div className="space-y-1">
          {bootMessages.slice(0, visibleLines).map((msg, index) => (
            <div
              key={index}
              className={`${getTypeColor(msg.type)} animate-fade-in`}
            >
              {msg.text}
              {index === visibleLines - 1 && isTyping && (
                <span className="cursor-blink ml-1">_</span>
              )}
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {isTyping && (
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <div className="flex gap-1">
              <span className="animate-pulse">●</span>
              <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</span>
              <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</span>
            </div>
            <span className="text-sm">Booting system</span>
          </div>
        )}
      </div>
    </div>
  );
};
