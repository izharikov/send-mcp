import { getServer } from "./server.js";
import { loadConfiguration } from "@/lib/config.js";

export async function stdio() {
  const cfg = loadConfiguration();
  const server = getServer(cfg);
  server.start({
    transportType: "stdio",
  });
}

