import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addSmptTools } from "./smtp";
import { addApiTools } from "./api";
import { Config } from "@/lib/config";

export const addTools: (server: McpServer, config: Config) => void = (server, config) => {
  addSmptTools(server, config.smtp);
  addApiTools(server, config.api, config.transactionalEmails);
}