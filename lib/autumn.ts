import { createFetch } from "@better-fetch/fetch";
import type {
	GetCustomerResponse,
	BillingPortal,
	GetEntitlementsResponse,
} from "../types";
import type { CreateCustomerResponse } from "../types/Customer";

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
			return await $<GetCustomerResponse>(`/customers/${id}`);
		},
		getBillingPortal: async ({ id }: { id: string }) => {
			return await $<BillingPortal>(`/customers/:id/billing_portal`, {
				params: { id },
			});
		},
		createCustomer: async ({
			id,
			name,
			email,
		}: {
			id: string;
			name: string;
			email: string;
		}) => {
			const { data, error } = await $<CreateCustomerResponse>("/customers", {
				method: "POST",
				body: JSON.stringify({ id, name, email }),
				headers: {
					"content-type": "application/json",
				},
			});

			return {
				data,
				error,
			};
		},
		checkEntitlement: async ({
			id,
			feature_id,
		}: {
			id: string;
			feature_id: string;
		}) => {
			return await $<GetEntitlementsResponse>(
				"/entitled",
				{
					method: "POST",
					body: JSON.stringify({ customer_id: id, feature_id }),
					headers: {
						"content-type": "application/json",
					},
				}
			);
		},
	};
}
