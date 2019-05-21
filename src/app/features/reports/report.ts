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
export class SubsidaryLedgerViewMdel {
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