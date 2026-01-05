import { useState } from 'react';
import { Lock, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => Promise<boolean>;
}

export function PasswordModal({ isOpen, onClose, onSubmit }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    const success = await onSubmit(password);
    
    if (!success) {
      setError(true);
      setPassword('');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-sm border border-border bg-card p-6 fade-in glow-box">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium text-primary glow">
              Authentication
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-terminal-cyan">$</span>
              <span className="text-muted-foreground">sudo authenticate</span>
            </div>
            <Input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-border focus:border-primary font-mono"
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-terminal-red">
              <AlertCircle className="h-4 w-4" />
              <span>Access denied. Invalid password.</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? (
              <span className="cursor-blink">Authenticating</span>
            ) : (
              'Submit'
            )}
          </Button>
        </form>

        <p className="mt-4 text-xs text-center text-muted-foreground">
          Session expires when browser closes
        </p>
      </div>
    </div>
  );
}