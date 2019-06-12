export interface AccountCategory {
  Id?: number;
  AccountType: string;
  CatagoryName: string;
}

export interface AccountCatagoryView {
  Id?: number;
  AccountType: string;
  AccountTypeId: number;
  CategoryName: string;
  DateAdded: Date;
  DateUpdated: Date;
}

export interface AccountCategoryIndex {
  Id: number;
  Name: string;
}
