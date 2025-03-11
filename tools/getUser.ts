import { z } from "zod";

export default {
	description: "Retrieve a user's information from their customer ID",
	schema: {
		customerId: z.string(),
	},
	cb: async ({ customerId }: { customerId: string }) => {
		return {
			name: "John Doe",
			email: "jdoe@acme.com",
			id: customerId,
		};
	},
};
