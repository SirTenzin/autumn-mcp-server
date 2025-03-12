# Autumn MCP Server

[![smithery badge](https://smithery.ai/badge/@SirTenzin/autumn-mcp-server)](https://smithery.ai/server/@SirTenzin/autumn-mcp-server)

This is an unofficial MCP server for [Autumn](https://useautumn.com). It provides an easy interface to access the Autumn pricing API to manage your customers.

# Tools

- [x] Creating customers
- [x] Getting customers by ID
- [x] Getting a customers entitlements
- [x] Managing their invoices
- [x] Generate a billing portal link for them

# Resources

### API Reference
- [ ] /attach
- [ ] /entitled
- [ ] /events
- [ ] /customers
- [ ] /customers/:id
- [ ] /customers/:id/billing_portal

# Prompts

- [ ] AI Builder Prompt (Lovable, Bolt.new, v0 etc...)

# Installation and Usage

### Installing automatically via Smithery

To install Autumn MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@SirTenzin/autumn-mcp-server):

```bash
npx -y @smithery/cli install @SirTenzin/autumn-mcp-server --client claude
```

### Manual

- Claude:

1. `git clone` this repo
2. Run `bun install` in the folder to install dependencies
3. Copy the absolute path to "index.ts"
4. Add the following to your claude_desktop_config.json or equivalent to your AI app:

```json
{
	"mcpServers": {
        // ...
		"autumn": {
			"command": "bun",
			"args": [
				"run",
				"{YOUR ABSOLUTE PATH TO index.ts}",
				"--apiKey=\"{YOUR API KEY}\""
			]
		}
	}
}
```

- Any other app:

If you want to run manually, you must have [Bun](https://bun.sh/) installed to run this MCP server.
Here's the command for other apps that support commands instead:
```bash
bun run {absolute path to index.ts} --apiKey="{your api key}"
```

You may use either your public or secret key, but some features may not be accessible using the public key.

## Showcase:

![Claude finding a customer](https://i.imgur.com/lvTMJ2m.png)

![Claude finding an invoice](https://i.imgur.com/z41HOwH.png)

![Claude creating a billing portal](https://i.imgur.com/gbzuWpR.png)
