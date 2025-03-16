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

function returnError(error: {
    message?: string | undefined,
    status: number,
    statusText: string,
}) {
	return {
		isError: true,
		content: [{ type: "text", text: JSON.stringify(error, null, 4) }],
	};
}

function returnBody(data: any) {
	return {
		content: [{ type: "text", text: JSON.stringify(data) }],
	};
}

function parseCb({ data, error }: { data: any; error: any }) {
	if (error) return returnError(error);
	else return returnBody(data);
}

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
		cb: async (args: any) => parseCb(await client.getUser(args)),
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
		cb: async (args: any) => parseCb(await client.getBillingPortal(args)),
	},
	create_customer: {
		description: "Create a new customer",
		schema: {
			id: z.string().describe("The ID of the customer to create"),
			name: z.string().describe("The name of the customer to create"),
			email: z.string().describe("The email of the customer to create"),
		},
		cb: async (args: any) => parseCb(await client.createCustomer(args)),
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
		cb: async (args: any) => parseCb(await client.checkEntitlement(args)),
	}
};

export default tools;
