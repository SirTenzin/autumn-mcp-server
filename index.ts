import {
	McpServer,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import tools from "./tools/index";

const server = new McpServer({
	name: "AutumnMCP",
	version: "1.1.0",
});

Object.keys(tools).forEach((toolName) => {
	server.tool(toolName, tools[toolName].description, tools[toolName].schema, tools[toolName].cb);
});

const transport = new StdioServerTransport();
await server.connect(transport);