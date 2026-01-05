export interface BootMessage {
  text: string;
  type: 'info' | 'ok' | 'warn' | 'error';
  delay: number; // delay before showing this message
}

export const bootMessages: BootMessage[] = [
  { text: '[BIOS] Initializing system...', type: 'info', delay: 0 },
  { text: '[OK] CPU detected: AMD EPYC 9354P 32-Core', type: 'ok', delay: 300 },
  { text: '[OK] Memory: 4GB RAM available', type: 'ok', delay: 200 },
  { text: '[OK] Loading kernel 6.8.0-90-generic...', type: 'ok', delay: 400 },
  { text: '[OK] Mounting filesystems...', type: 'ok', delay: 300 },
  { text: '[OK] Starting network services...', type: 'ok', delay: 350 },
  { text: '[INFO] Connecting to monumental.center...', type: 'info', delay: 500 },
  { text: '[OK] Connection established', type: 'ok', delay: 300 },
  { text: '[OK] Loading dashboard modules...', type: 'ok', delay: 250 },
  { text: '[OK] Initializing project registry...', type: 'ok', delay: 200 },
  { text: '[OK] System ready', type: 'ok', delay: 300 },
  { text: '', type: 'info', delay: 200 },
  { text: 'Welcome to Monumental Dashboard v1.0', type: 'info', delay: 100 },
];

export const BOOT_COMPLETE_DELAY = 800; // delay after last message before fade out
