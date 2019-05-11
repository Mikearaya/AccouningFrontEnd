import { updateData } from "@syncfusion/ej2-grids";

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

export class CreateLedgerEntry {
  Description: string;
  Date: Date;
  Reference: string;
  VoucherId: string;
  Posted: boolean;
  Entries: Jornal[] = [];
}

export class Jornal {
  Debit?: number;
  Credit?: number;
  AccountId: string;
}

export class UpdateLedgerEntryModel {
  Id: number;
  Description: string;
  Date: Date;
  Reference: string;
  VoucherId: string;
  Posted?: boolean;
  Entries: UpdateJornal[] = [];
}

export class UpdateJornal {
  Id: number;
  AccountId: string;
  Debit: number;
  Credit: number;
}
export class UpdateLedgerStatus {
  Id: number;
  Posted: boolean;
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
  VoucherId: string;
  Posted: boolean;
  DateAdded: Date;
  DateUpdated: Date;
  Entries: Jornal[] = [];
}
