import { FastMCP } from "fastmcp";
import { addSmptTools } from "./smtp";
import { addApiTools } from "./api";
import { Config } from "@/lib/config";

export const addTools: (server: FastMCP, config: Config) => void = (server, config) => {
  addSmptTools(server, config.smtp);
  addApiTools(server, config.api, config.transactionalEmails);
}