export class Accounts {
  Id?: number;
  AccountId: string;
  ParentAccount: number;
  CatagoryId: number;
  Name: string;
  Active: boolean;
  OpeningBalance?: number;
  CostCenter: string;
}

export interface AccountsIndexView {
  Id: number;
  Name: string;
}

export interface AccountViewModel {
  Id: number;
  AccountId: string;
  ParentAccount: string;
  Name: string;
  Active: boolean;
  Year: string;
  OpeningBalance: number | null;
  Category: string;
  CategoryId: number;
  CostCenter: string;
  DateAdded: Date | string | null;
  DateUpdated: Date | string | null;
}
