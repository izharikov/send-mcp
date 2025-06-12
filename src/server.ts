import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addTools } from "./tools";
import { version } from '../package.json';
import { Config } from "@/lib/config";

export const getServer = (config: Config) => {
  const server = new McpServer({
    name: "Sitecore Send SMTP Server",
    version,
  });
  addTools(server, config);
  return server;
}