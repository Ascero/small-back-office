export interface ITransaction {
  id: string;
  baseAmount: string;
  baseCurrency: string;
  targetCurrency: string;
  targetAmount: string;
  exchangeRate: string;
  createdBy: { id: string; username: string; };
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}
