export class PostingTypesView {
  id: number;
  type: string;
}

export class LedgerEntryViewModel {
  Id: number;
  Description: string;
  Date: Date;
  Reference: string;
  VoucherId: string;
  Posted: boolean;
  DateAdded: Date;
  DateUpdated: Date;
}

export class ReconciliationModel {
  id: number;
  reconciled: boolean;
}

export class CreateLedgerEntry {
  Description: string;
  Date: Date;
  Reference: string;
  VoucherId: string;
  Posted: boolean;
  Entries: Jornal[] = [];
}

export class UpdateLedgerEntry {
  Id: number;
  Description: string;
  Date: Date;
  Reference: string;
  VoucherId: string;
  Posted: boolean;
}

export class Jornal {
  Debit: number;
  Credit: number;
  AccountId: number;
}

export class LedgerEntryView {
  id: number;
  description: string;
  periodStart: Date;
  postType: string;
  documentNumber: string;
  dateAdded: Date;
  dateUpdated: Date;
}

export class JornalEntryViewModel {
  Id: number;
  Description: string;
  Date: Date;
  Reference: string;
  VoucherId: number;
  Posted: boolean;
  DateAdded: Date;
  DateUpdated: Date;
  Entries: Jornal[] = [];
}
