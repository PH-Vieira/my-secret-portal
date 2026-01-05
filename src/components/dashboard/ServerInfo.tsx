import { Server, Cpu, HardDrive, Clock, Globe, Terminal } from 'lucide-react';
import { serverInfo } from '@/config/dashboard';

export function ServerInfo() {
  const items = [
    { icon: Terminal, label: 'Hostname', value: serverInfo.hostname },
    { icon: Globe, label: 'IP', value: serverInfo.ip },
    { icon: Server, label: 'OS', value: serverInfo.os },
    { icon: Clock, label: 'Uptime', value: serverInfo.uptime },
    { icon: Cpu, label: 'CPU', value: serverInfo.cpu },
    { icon: HardDrive, label: 'RAM', value: serverInfo.ram },
    { icon: HardDrive, label: 'Disk', value: serverInfo.disk },
  ];

  return (
    <div className="border border-border bg-card p-4 fade-in">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-terminal-cyan">$</span>
        <span className="text-primary glow">neofetch</span>
        <span className="cursor-blink" />
      </div>
      
      <div className="grid gap-2">
        {items.map((item, index) => (
          <div
            key={item.label}
            className="flex items-center gap-3 text-sm fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <item.icon className="h-4 w-4 text-terminal-purple" />
            <span className="text-terminal-cyan w-20">{item.label}:</span>
            <span className="text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}