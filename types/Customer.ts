import { z } from "zod";

export const CustomerSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	fingerprint: z.string().nullable(),
	created_at: z.number(),
	env: z.string(),
	processor: z.object({
		id: z.string(),
		type: z.string(),
	}).nullable(),
});

export type Customer = z.infer<typeof CustomerSchema>;

export const PriceSchema = z.object({
	amount: z.number(),
	interval: z.string(),
});

export type Price = z.infer<typeof PriceSchema>;

export const ProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	group: z.string(),
	status: z.enum(["active", "inactive"]),
	created_at: z.number(),
	canceled_at: z.number().nullable(),
	processor: z.object({
		type: z.string().nullable(),
		subscription_id: z.string().nullable(),
	}),
	prices: z.array(PriceSchema),
});

export type Product = z.infer<typeof ProductSchema>;

export type AddOn = Product;

export const EntitlementSchema = z.object({
	feature_id: z.string(),
	interval: z.string(),
	balance: z.number(),
	unlimited: z.boolean(),
	used: z.number(),
});

export type Entitlement = z.infer<typeof EntitlementSchema>;

export const InvoiceSchema = z.object({
	product_ids: z.array(z.string()),
	stripe_id: z.string(),
	status: z.enum(["paid"]),
	total: z.number(),
	currency: z.string(),
	created_at: z.number(),
	hosted_invoice_url: z.string(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;

export const GetCustomerResponseSchema = z.object({
	customer: CustomerSchema,
	products: z.array(ProductSchema),
	add_ons: z.array(ProductSchema),
	entitlements: z.array(EntitlementSchema),
	invoices: z.array(InvoiceSchema),
});

export const CreateCustomerResponseSchema = z.object({
	success: z.boolean(),
	...GetCustomerResponseSchema.shape,
})

export type GetCustomerResponse = z.infer<typeof GetCustomerResponseSchema>;
export type CreateCustomerResponse = z.infer<typeof CreateCustomerResponseSchema>;