import { Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isAuthenticated: boolean;
  onAdminClick: () => void;
  onLogout: () => void;
}

export function Header({ isAuthenticated, onAdminClick, onLogout }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-terminal-green pulse-glow" />
            <h1 className="text-xl font-bold text-primary glow">
              ~/dashboard
            </h1>
          </div>

          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-terminal-red hover:bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              logout
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminClick}
              className="text-muted-foreground hover:text-primary hover:bg-transparent"
            >
              <Lock className="h-4 w-4 mr-2" />
              admin
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}