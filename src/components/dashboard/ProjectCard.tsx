import { ExternalLink } from 'lucide-react';
import type { Project } from '@/config/dashboard';

interface ProjectCardProps {
  project: Project;
  showStatus?: boolean;
}

export function ProjectCard({ project, showStatus = false }: ProjectCardProps) {
  const statusColors = {
    online: 'bg-terminal-green',
    offline: 'bg-terminal-red',
    maintenance: 'bg-terminal-yellow',
  };

  const statusLabels = {
    online: 'ONLINE',
    offline: 'OFFLINE',
    maintenance: 'MAINT',
  };

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-border bg-card p-4 transition-all duration-200 hover:border-primary hover:glow-box fade-in"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{'>'}</span>
            <h3 className="font-medium text-primary group-hover:glow truncate">
              {project.name}
            </h3>
            {showStatus && (
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${statusColors[project.status]} pulse-glow`}
                />
                <span className="text-xs text-muted-foreground">
                  [{statusLabels[project.status]}]
                </span>
              </div>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground pl-5">
            {project.description}
          </p>
          <p className="mt-1 text-xs text-terminal-dim pl-5 truncate">
            {project.url}
          </p>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </a>
  );
}