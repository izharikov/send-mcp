import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { addTools } from "./tools";
import { version } from '@/package.json';

export const getServer = () => {
  const server = new McpServer({
    name: "Sitecore Send SMTP Server",
    version,
  });
  addTools(server);
  return server;
}