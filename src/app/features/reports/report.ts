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

export interface LedgerChecklistView {
  Items: Checklist[];
  Count: number;
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
