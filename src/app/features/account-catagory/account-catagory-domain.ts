export interface AccountCategory {
  Id?: number;
  AccountType: string;
  CatagoryName: string;
  OverFlowAccount?: number;
}

export interface AccountCatagoryView {
  Id?: number;
  AccountType: string;
  AccountTypeId: number;
  CategoryName: string;
  OverFlowAccountId?: number;
  OverFlowAccount: string;
  DateAdded: Date;
  DateUpdated: Date;
}

export interface AccountCategoryIndex {
  Id: number;
  Name: string;
}
