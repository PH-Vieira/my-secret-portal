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
    id: 'wa-bot-shop',
    name: 'Loja do bot de Whatsapp',
    description: 'UI Shop',
    url: 'https://bot-shop.monumental.center',
    status: 'online',
  },
  {
    id: 'erp',
    name: 'ERP',
    description: 'erp',
    url: 'https://erp.monumental.center',
    status: 'online',
  },
  {
    id: 'coin-clicker',
    name: 'Coin Clicker',
    description: 'Clicker Simples',
    url: 'https://coin-clicker.monumental.center',
    status: 'online',
  },
  {
    id: 'pesca',
    name: 'Jogo de pesca',
    description: 'Jogo simples de pesca',
    url: 'https://pesca.monumental.center',
    status: 'online',
  },
];

// Server info (simulated - replace with real data or API calls)
export const serverInfo = {
  hostname: 'vps-server',
  ip: '72.62.106.22',
  os: 'Ubuntu 22.04 LTS',
  kernel: '6.8.0-90-generic',
  uptime: '',
  cpu: 'AMD EPYC 9354P 32-Core Processor @ 2.0GHz',
  ram: '4GB',
  disk: '50GB',
};