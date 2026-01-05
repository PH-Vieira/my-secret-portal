export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  status: 'online' | 'offline' | 'maintenance';
}

// Configure your projects/subdomains here
export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'API Server',
    description: 'Backend REST API',
    url: 'https://api.seudominio.com',
    status: 'online',
  },
  {
    id: 'project-2',
    name: 'Blog',
    description: 'Personal blog',
    url: 'https://blog.seudominio.com',
    status: 'online',
  },
  {
    id: 'project-3',
    name: 'Docs',
    description: 'Documentation site',
    url: 'https://docs.seudominio.com',
    status: 'maintenance',
  },
];

// Server info (simulated - replace with real data or API calls)
export const serverInfo = {
  hostname: 'vps-server',
  ip: '192.168.1.100',
  os: 'Ubuntu 22.04 LTS',
  kernel: '5.15.0-generic',
  uptime: '42 days, 7 hours',
  cpu: '4 cores @ 2.4GHz',
  ram: '8GB / 16GB (50%)',
  disk: '120GB / 500GB (24%)',
};