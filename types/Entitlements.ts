export type Balance = {
	feature_id: string;
	balance: number;
	required: number;
};

export type GetEntitlementsResponse = {
	allowed: boolean;
	balances: Balance[];
};
