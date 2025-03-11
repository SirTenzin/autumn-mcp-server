# Autumn MCP Server

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
- You must have [Bun](https://bun.sh/) installed to run this MCP server.

## Usage

1. `git clone` this repo
2. Copy the absolute path to "index.ts"
3. Add the following to your claude_desktop_config.json or equivalent to your AI app:

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
Or other apps that use commands instead:
```bash
bun run {absolute path to index.ts} --apiKey="{your api key}"
```

You may use either your public or secret key, but some features may not be accessible using the public key.