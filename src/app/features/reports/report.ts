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
