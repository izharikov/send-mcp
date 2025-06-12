import { getServer } from './server';
import { loadConfiguration } from '@/lib/config';

export const start: (port: string | undefined) => void = (port) => {
  const PORT = parseInt(port || '3000');
  const cfg = loadConfiguration();
  const server = getServer(cfg);
  server.start({
    transportType: "httpStream",
    httpStream: {
      port: PORT,
    },
  });
}
