import { expect, test, describe } from "bun:test";
import { config } from "dotenv";
import {
	GetCustomerResponseSchema,
	GetEntitlementsResponseSchema,
	BillingPortalSchema,
} from "../types";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { McpError } from "@modelcontextprotocol/sdk/types.js";
import { CreateCustomerResponseSchema } from "../types/Customer";

config();

const transport = new StdioClientTransport({
	command: "bun",
	args: ["run", "index.ts", '--apiKey="' + process.env.AUTUMN_API_KEY + '"'],
});

const client = new Client(
	{
		name: "test",
		version: "1.0.0",
	}
);

await client.connect(transport);

describe("MCP Tools", async () => {
	describe("Users API", () => {
		test("A valid user should return a valid type", async () => {
			const user = await client.callTool({
				name: "get_autumn_user",
				arguments: {
					id: process.env.TEST_CUSTOMER_ID,
				},
			});

			const result = GetCustomerResponseSchema.safeParse(
				JSON.parse(
					(user.content as { type: string; text: string }[])[0].text
				)
			);

			expect(result.success).toBe(true);
		});

		test("A valid user should return a valid billing portal", async () => {
			const user = await client.callTool({
				name: "get_billing_portal",
				arguments: {
					id: process.env.TEST_CUSTOMER_ID,
				},
			});

			const result = BillingPortalSchema.safeParse(
				JSON.parse(
					(user.content as { type: string; text: string }[])[0].text
				)
			);

			expect(result.success).toBe(true);
		});

		test("An invalid user should return an error", async () => {
			const user = await client.callTool({
				name: "get_autumn_user",
				arguments: {
					id: "invalid",
				},
			});

			const result = GetCustomerResponseSchema.safeParse(
				JSON.parse(
					(user.content as { type: string; text: string }[])[0].text
				)
			);

			expect(result.success).toBe(false);
		});

		test("An invalid user should not return a billing portal", async () => {
			const user = await client.callTool({
				name: "get_billing_portal",
				arguments: {
					id: "invalid",
				},
			});

			const result = BillingPortalSchema.safeParse(
				JSON.parse(
					(user.content as { type: string; text: string }[])[0].text
				)
			);

			expect(result.success).toBe(false);
		});

		test("A new user should be created", async () => {
            const randomId = (
              Math.random().toString(36).substring(2, 5) +
              "-" +
              Math.random().toString(36).substring(2, 5) +
              "-" +
              Math.random().toString(36).substring(2, 5)
            ).replace(/[^a-z0-9]/g, "");

			const user = await client.callTool({
				name: "create_customer",
				arguments: {
					id: randomId,
					name: "Test User - " + randomId,
					email: `${randomId}@${randomId}.com`,
				},
			});

            const result = CreateCustomerResponseSchema.safeParse(
                JSON.parse(
                    (user.content as { type: string; text: string }[])[0].text
                )
            );

            expect(result.success).toBe(true);
		});
	});

	describe("Entitlements API", async () => {
		test("A valid user should return valid entitlements", async () => {
			const entitlements = await client.callTool({
				name: "get_entitlement",
				arguments: {
					id: process.env.TEST_CUSTOMER_ID,
					feature_id: process.env.TEST_ENTITLEMENT_ID,
				},
			});

			const result = GetEntitlementsResponseSchema.safeParse(
				JSON.parse(
					(
						entitlements.content as { type: string; text: string }[]
					)[0].text
				)
			);

			expect(result.success).toBe(true);
		});
	});
});

describe("MCP Resources", async () => {
	test("Autumn API Reference should be defined", async () => {
		const resource = await client.readResource({
			uri: "autumn://openapi.json",
		});

		expect(resource).toBeDefined();
	});

	test("An invalid resource should return an error", async () => {
		await expect(
			client.readResource({
				uri: "autumn://invalid.json",
			})
		).rejects.toThrowError(McpError);
	});
});

describe("MCP Prompts", async () => {
	test("Autumn create_pricing_page prompt should be defined", async () => {
		const prompt = await client.getPrompt({
			name: "create_pricing_page",
			arguments: {},
		});

		expect(prompt).toBeDefined();
	});
});
