export class Accounts {
  AccountId: string;
  AccountCode?: string;
  AccountName: string;
  OrganizationId: number;
  OpeningBalance: number;
  Active: boolean;
  isReconciliation: boolean;
  directPosting: boolean;
  glType: string;
}


export class AccountBalanceView {
  AccountId: string;
  balance: number | null;
}
