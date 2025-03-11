export type Customer = {
	id: string;
	name: string;
	email: string;
	fingerprint: string;
	created_at: number;
	env: string;
	processor: {
		id: string;
		type: string;
	};
};

export type Price = {
	amount: number;
	interval: string;
};

export type Product = {
	id: string;
	name: string;
	group: string;
	status: "active";
	created_at: number;
	canceled_at: number;
	processor: {
		type: string;
		subscription_id: string;
	};
	prices: Price[];
};

export type AddOn = Product; // Assuming AddOn has the same structure as Product

export type Entitlement = {
	feature_id: string;
	interval: string;
	balance: number;
	unlimited: boolean;
	used: number;
};

export type Invoice = {
	product_ids: string[];
	stripe_id: string;
	status: "paid";
	total: number;
	currency: string;
	created_at: number;
	hosted_invoice_url: string;
};

export type GetCustomerResponse = {
	customer: Customer;
	products: Product[];
	add_ons: AddOn[];
	entitlements: Entitlement[];
	invoices: Invoice[];
};
