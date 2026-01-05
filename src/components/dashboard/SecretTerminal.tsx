import { useState, useRef, useEffect } from 'react';
import { serverInfo } from '@/config/dashboard';

interface SecretTerminalProps {
  onClose: () => void;
}

const COMMANDS: Record<string, string | (() => string)> = {
  help: `Available commands:
  help     - Show this help message
  whoami   - Display current user
  uptime   - Show system uptime
  neofetch - Display system info
  clear    - Clear terminal
  rm -rf / - Delete everything (jk)
  exit     - Close terminal`,
  
  whoami: 'root@monumental',
  
  uptime: () => {
    const hours = Math.floor(Math.random() * 1000) + 100;
    return `up ${hours} hours, 42 minutes`;
  },
  
  neofetch: `
       _,met\$\$\$\$\$gg.           root@monumental
    ,g\$\$\$\$\$\$\$\$\$\$\$\$\$\$\$P.       ----------------
  ,g\$\$P"     """Y\$\$."$.       OS: Ubuntu 22.04 LTS
 ,\$\$P'              \`\$\$\$.     Kernel: 6.8.0-90-generic
',\$\$P       ,ggs.    \`\$\$b:    CPU: AMD EPYC 9354P
\`d\$\$'     ,\$P"'   .   \$\$\$     RAM: 4GB
 \$\$P      d\$'     ,    \$\$P    Disk: 50GB
 \$\$:      \$\$.   -     ,d\$\$'    
 \$\$;      Y\$b._   _,d\$P'      
 Y\$\$.    \`.\`"Y\$\$\$\$P"'         
 \`\$\$b      "-.__              
  \`Y\$\$                        
   \`Y\$\$.                      
     \`\$\$b.                    
       \`Y\$\$b.                 
          \`"Y\$b._             
              \`"""            `,
              
  'rm -rf /': '🚫 Nice try! Permission denied. Did you really think that would work?',
  
  clear: '__CLEAR__',
  
  exit: '__EXIT__',
};

export const SecretTerminal = ({ onClose }: SecretTerminalProps) => {
  const [history, setHistory] = useState<{ input: string; output: string }[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd) return;

    let output = '';
    
    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }
    
    if (cmd === 'exit') {
      onClose();
      return;
    }

    const command = COMMANDS[cmd];
    if (command) {
      output = typeof command === 'function' ? command() : command;
    } else {
      output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { input: cmd, output }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-4 bg-background border border-terminal-green rounded-lg shadow-2xl overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-2 bg-terminal-green/10 border-b border-terminal-green/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-terminal-red" />
            <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
            <div className="w-3 h-3 rounded-full bg-terminal-green" />
          </div>
          <span className="text-terminal-green text-sm font-mono">
            sudo@monumental:~
          </span>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="h-80 overflow-y-auto p-4 font-mono text-sm"
        >
          <div className="text-terminal-cyan mb-2">
            🔓 Secret Terminal Activated! Type 'help' for commands.
          </div>
          
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center gap-2">
                <span className="text-terminal-green">$</span>
                <span className="text-foreground">{item.input}</span>
              </div>
              <pre className="text-muted-foreground whitespace-pre-wrap pl-4 mt-1">
                {item.output}
              </pre>
            </div>
          ))}

          {/* Input line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-terminal-green">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-foreground font-mono"
              autoFocus
              spellCheck={false}
            />
            <span className="cursor-blink">_</span>
          </form>
        </div>
      </div>
    </div>
  );
};
