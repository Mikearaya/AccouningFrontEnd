export class Accounts {
  Id: string;
  AccountName: string;
  AccountCatagory: string;
  ParentAccount?: string;
  OrganizationId: number;
  OpeningBalance: number;
  PostingType: string;
  Active: boolean;
  IsReconciliation: boolean;
  IsPosting: boolean;
  glType: string;
}

export class AccountBalanceView {
  AccountId: string;
  balance: number | null;
}
