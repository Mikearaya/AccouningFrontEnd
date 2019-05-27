export class Accounts {
  Id?: number;
  AccountId: string;
  ParentAccount: number;
  CatagoryId: number;
  Name: string;
  Active: boolean;
  OpeningBalance?: number;
  CostCenterId: string;
}

export interface AccountsIndexView {
  Id: number;
  Name: string;
}



export interface AccountViewModel {
  Items: AccountView[];
  Count: number;
}

export interface AccountView {
  Id: number;
  AccountId: string;
  ParentAccount: string;
  AccountName: string;
  Active: boolean;
  Year: string;
  OpeningBalance: number | null;
  ParentAccountId: number;
  Category: string;
  CategoryId: number;
  CostCenter: string;
  DateAdded: Date | string | null;
  DateUpdated: Date | string | null;
  CostCenterId: number;
}


