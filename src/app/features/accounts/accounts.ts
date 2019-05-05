export class Accounts {
  Id?: number;
  AccountId: string;
  ParentAccount: number;
  CatagoryId: number;
  Name: string;
  Active: boolean;
  OrganizationId?: number;
  OpeningBalance?: number;
}

export interface AccountsIndexView {
  Id: number;
  Name: string;
}

export interface AccountViewModel {
  Id: number;
  AccountId: string;
  ParentAccount: string;
  AccountName: string;
  Active: boolean;
  Year: string;
  OpeningBalance: number | null;
  Category: string;
  CategoryId: number;
  DateAdded: Date | string | null;
  DateUpdated: Date | string | null;
}
