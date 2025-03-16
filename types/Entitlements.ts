import { z } from "zod";

export const BalanceSchema = z.object({
  feature_id: z.string(),
  balance: z.number(),
  required: z.number(),
});

export type Balance = z.infer<typeof BalanceSchema>;

export const GetEntitlementsResponseSchema = z.object({
  allowed: z.boolean(),
  balances: z.array(BalanceSchema),
});

export type GetEntitlementsResponse = z.infer<typeof GetEntitlementsResponseSchema>;