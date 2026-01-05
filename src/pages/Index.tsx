import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { projects } from '@/config/dashboard';
import { Header } from '@/components/dashboard/Header';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { ServerInfo } from '@/components/dashboard/ServerInfo';
import { PasswordModal } from '@/components/dashboard/PasswordModal';
import { WallpaperBackground } from '@/components/dashboard/WallpaperBackground';
import { BootSequence } from '@/components/dashboard/BootSequence';
import { MatrixRain } from '@/components/dashboard/MatrixRain';
import { SecretTerminal } from '@/components/dashboard/SecretTerminal';
import { useServiceStatus } from '@/hooks/useServiceStatus';
import { useEasterEggs } from '@/hooks/useEasterEggs';

const Index = () => {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showBoot, setShowBoot] = useState(() => !sessionStorage.getItem('hasBooted'));
  const { statuses } = useServiceStatus();
  const {
    matrixActive,
    terminalActive,
    rainbowActive,
    closeTerminal,
    closeMatrix,
    triggerRainbow,
  } = useEasterEggs();

  const handleLogin = async (password: string) => {
    const success = await login(password);
    if (success) {
      setShowPasswordModal(false);
    }
    return success;
  };

  // Show boot sequence
  if (showBoot) {
    return <BootSequence onComplete={() => setShowBoot(false)} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary glow cursor-blink">Loading</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative ${rainbowActive ? 'rainbow-mode' : ''}`}>
      <WallpaperBackground />
      
      {/* Easter Eggs */}
      {matrixActive && <MatrixRain onClose={closeMatrix} />}
      {terminalActive && <SecretTerminal onClose={closeTerminal} />}
      
      <Header
        isAuthenticated={isAuthenticated}
        onAdminClick={() => setShowPasswordModal(true)}
        onLogout={logout}
        onRainbow={triggerRainbow}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-terminal-cyan">$</span>
            <span className="text-foreground typewriter">cat welcome.txt</span>
          </div>
          <p className="text-muted-foreground pl-5">
            Personal server dashboard. Select a project below.
          </p>
        </section>

        {/* Projects Section - Always Visible */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-terminal-cyan">$</span>
            <span className="text-primary glow">ls -la ./projects/</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                showStatus={isAuthenticated}
                liveStatus={isAuthenticated ? statuses[project.id] : undefined}
              />
            ))}
          </div>
        </section>

        {/* Authenticated Section - Server Info */}
        {isAuthenticated && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-terminal-cyan">$</span>
              <span className="text-primary glow">system --info</span>
            </div>
            <div className="max-w-md">
              <ServerInfo />
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              <span className="text-terminal-green">●</span> System operational
            </span>
            <span>
              {isAuthenticated ? (
                <span className="text-terminal-green">[AUTHENTICATED]</span>
              ) : (
                <span className="text-terminal-dim">[GUEST]</span>
              )}
            </span>
          </div>
        </footer>
      </main>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default Index;