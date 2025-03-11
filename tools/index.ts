import Autumn from "../lib/autumn";
import { z } from "zod";

let AUTUMN_API_KEY = process.argv
	.filter((x) => x.startsWith("--apiKey="))[0]
	?.split("=")[1]
	.replace(/^"|"$/g, "");
if (!AUTUMN_API_KEY) {
	throw new Error("Autumn API key is required");
}

const client = Autumn(AUTUMN_API_KEY);

const tools: {
	[key: string]: {
		description: string;
		schema: any;
		cb: any;
	};
} = {
	get_autumn_user: {
		description: "Get a user by ID",
		schema: { id: z.string().describe("The ID of the customer to fetch") },
		cb: client.getUser,
	},
	get_billing_portal: {
		description: "Get the billing portal for a user",
		schema: {
			id: z
				.string()
				.describe(
					"The ID of the customer to fetch the billing portal for"
				),
		},
		cb: client.getBillingPortal,
	},
	create_customer: {
		description: "Create a new customer",
		schema: {
			id: z.string().describe("The ID of the customer to create"),
			name: z.string().describe("The name of the customer to create"),
			email: z.string().describe("The email of the customer to create"),
		},
		cb: client.createCustomer,
	},
	get_entitlement: {
		description: "Get a specific entitlement set for a user",
		schema:  {
			id: z
				.string()
				.describe(
					"The ID of the customer to fetch the entitlements for"
				),
			feature_id: z
				.string()
				.describe(
					"The ID of the feature to fetch the entitlements status for"
				),
		},
		cb: client.checkEntitlement,
	}
};

export default tools;
