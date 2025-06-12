import { Command } from 'commander';
import { version } from '../package.json';
import { start } from './sse';
import { stdio } from './stdio';
import dotenv from 'dotenv';
import path from 'path';

const program = new Command('send-mcp');

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });

program.command('sse')
  .option('--port <number>', 'port number', '3000')
  .description('Start the MCP Streamable HTTP Server')
  .action(async (options) => {
    start(options.port);
  });

program.command('stdio', { isDefault: true })
  .description('Start MCP server (stdio transport)')
  .action(async () => {
    await stdio()
  });

program.version(version);
program.parse();
