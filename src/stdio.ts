import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getServer } from "./server.js";

async function main() {
  const server = getServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();
