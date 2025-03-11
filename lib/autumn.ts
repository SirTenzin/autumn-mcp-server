import { createFetch } from "@better-fetch/fetch";
import type {
	GetCustomerResponse,
	BillingPortal,
	GetEntitlementsResponse,
} from "../types";

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
		content: [{ type: "text", text: JSON.stringify(data, null, 4) }],
	};
}

export default function Autumn(apiKey: string) {
	if (!apiKey) {
		throw new Error("Autumn API key is required");
	}

	const $ = createFetch({
		baseURL: "https://api.useautumn.com/v1",
		auth: {
			type: "Bearer",
			token: apiKey,
		},
	});

	return {
		httpClient: $,
		getUser: async ({ id }: { id: string }) => {
			const { data, error } = await $<GetCustomerResponse>(
				`/customers/${id}`
			);
			if (error) return returnError(error);
			else return returnBody(data);
			
		},
		getBillingPortal: async ({ id }: { id: string }) => {
			const { data, error } = await $<BillingPortal>(
				`/customers/:id/billing_portal`,
				{
					params: { id },
				}
			);
			if (error) return returnError(error);
			else return returnBody(data);
		},
		createCustomer: async ({ id, name, email }: { id: string, name: string, email: string }) => {
			const { data, error } = await $("/customers", {
				method: "POST",
				body: JSON.stringify({ id, name, email }),
                headers: {
                    "content-type": "application/json"
                }
			});
			if (error) returnError(error);
			else return returnBody({
                success: true,
                message: "Customer created successfully",
                customer: data
            });
		},
		checkEntitlement: async ({ id, feature_id }: { id: string, feature_id: string }) => {
			const { data, error } = await $<GetEntitlementsResponse>(
				"/entitled",
				{
					method: "POST",
					body: JSON.stringify({ customer_id: id, feature_id }),
                    headers: {
                        "content-type": "application/json"
                    }
				}
			);
			if (error) return returnError(error);
			else return returnBody(data);
		},
	};
}
