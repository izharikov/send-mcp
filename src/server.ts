import { FastMCP } from "fastmcp";
import { addTools } from "./tools";
import { version } from '../package.json';
import { Config } from "@/lib/config";

export const getServer = (config: Config) => {
  const server = new FastMCP({
    name: "Sitecore Send SMTP Server",
    version: version as `${number}.${number}.${number}`,
    ping: {
      intervalMs: 10000,
      logLevel: "info",
    },
  });
  addTools(server, config);
  return server;
}