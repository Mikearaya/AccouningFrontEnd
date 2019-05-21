// checklist model
export class Checklist {
  ReferenceNumber: string;
  Date: Date;
  Description: string;
  Entries: Jornal[] = [];
}

export class Jornal {
  ControlAccountId: string;
  SubAccountId: string;
  Credit?: number;
  Debit?: number;
  AccountId: string;
}

// subsidaryLedgerReport model
export class SubsidaryLedgerViewModel {
  AccountId: string;
  AccountType: string;
  SubAccountId: string;
  AccountName: string;
  BBF: number;
  Entries: SubsidaryLedgerDetailViewModel[] = [];
}

export class SubsidaryLedgerDetailViewModel {
  ReferenceNumber: string;
  Date: Date;
  VoucherId: string;
  Debit: number;
  Credit: number;
  Balance: number;
}

// trial balance model
export class TrialBalanceDetailViewModel {
  Id: number;
  AccountId: string;
  AccountName: string;
  Entries: TrialBalanceDetail[] = [];
}

export class TrialBalanceDetail {
  AccountId: string;
  AccountName: string;
  Credit: number;
  Debit: number;
}

// consolidated trial balance model
export class ConsolidatedTrialBalanceViewModel {
  AccountId: string;
  AccountName: string;
  Credit: number;
  Debit: number;
}

// balance sheet model
export class BalanceSheetViewModel {
  Assets: BalanceSheetItemModel[] = [];
  TotalAsset: number;
  Capitals: BalanceSheetItemModel[] = [];
  TotalCapital: number;
  Liabilities: BalanceSheetItemModel[] = [];
  TotalLiability: number;
}

export class BalanceSheetItemModel {
  AccountCatagory: string;
  Amount: number;
}

// income statment model
export class IncomeStatmentViewModel {
  Expense: IncomeStatmentItemModel[] = [];
  TotalExpense: number;
  Revenue: IncomeStatmentItemModel[] = [];
  TotalRevenue: number;
  NetSurplus: number;
}

export class IncomeStatmentItemModel {
  AccountType: string;
  Amount: number;
}
