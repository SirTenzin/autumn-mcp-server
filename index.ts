import {
	McpServer,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { betterFetch } from "@better-fetch/fetch";
import tools from "./tools/index";

const server = new McpServer({
	name: "AutumnMCP",
	version: "1.2.1",
});

Object.keys(tools).forEach((toolName) => {
	server.tool(toolName, tools[toolName].description, tools[toolName].schema, tools[toolName].cb);
});

server.prompt("create_pricing_page", "A prompt to create a pricing page using Autumn with a free and paid plan", {}, () => ({
	messages: [
		{
			role: "user",
			content: {
				type: "text",
				text: `Let’s set up pricing. I have:

1. A free plan which allows access to my basic features
2. A pro plan for $20 per month which allows access to ‘pro-features’

Build a pricing page showing the above 2 plans. When the user clicks on “Subscribe to Pro”, use the following API from Autumn to assign the product to the customer. Please direct user to checkout_url if present in response.

Don’t worry about gating features. We’ll handle that with Autumn later on using a ‘pro-features’ flag that they will return.

My free product has an id of ‘free’, and pro product has a product_id of ‘pro’ Use our user ID from our DB as the customer_id. Please keep force_checkout as true so a URL is always returned.

Use this API key for Autumn. Leave it in code for now: <API Key>

Autumn attach product API:

**Request**

curl --request POST \
--url https://api.useautumn.com/v1/attach \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data '{
"customer_id": "<Your internal Customer ID>",
"product_id": "<Product ID>",
“force_checkout”: true
}'

**Response**

{
"checkout_url": "https://checkout.stripe.com/c/pay/<hash>"
}`,
			},
		},
	]
}));

server.resource("autumn_api_reference", "autumn://openapi.json", async (uri: any) => {
	const { data, error } = await betterFetch("https://raw.githubusercontent.com/useautumn/docs/refs/heads/main/api-reference/openapi.json", {
		cache: "force-cache",
	});
	if (error) {
		return {
			isError: true,
			contents: [{ uri: uri.href, text: JSON.stringify(error, null, 4) }],
		};
	} else return {
		contents: [{
			uri: uri.href,
			text: JSON.stringify(data, null, 4),
		}]
	}
})

const transport = new StdioServerTransport();
await server.connect(transport);