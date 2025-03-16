import { z } from "zod";

export const BillingPortalSchema = z.object({
  url: z.string(),
});

export type BillingPortal = z.infer<typeof BillingPortalSchema>