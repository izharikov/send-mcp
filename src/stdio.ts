import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getServer } from "./server.js";
import { loadConfiguration } from "@/lib/config.js";

export async function stdio() {
  const cfg = loadConfiguration();
  const server = getServer(cfg);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

