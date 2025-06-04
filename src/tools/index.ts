import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { config } from "@/lib/config";
import { addSmptTools } from "./smtp";

export const addTools: (server: McpServer) => void = (server) => {
  addSmptTools(server, config.smtp);
}