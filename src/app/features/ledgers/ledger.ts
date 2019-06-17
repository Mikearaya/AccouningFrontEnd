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

export class LedgerEntry {
  Id?: number;
  Description: string;
  Date: Date;
  Reference: string;
  VoucherId: string;
  Posted?: boolean;
  DeletedIds: number[] = [];
  Entries: Jornal[] = [];
}

export class Jornal {
  Id?: number;
  Debit?: number;
  Credit?: number;
  AccountId: string;
}

export class UpdateLedgerStatus {
  Id: number;
  Posted: boolean;
}

export class JornalEntryViewModel {
  Prev?: number;
  Next?: number;
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

export interface LedgerEntryIndexView {
  Id: number;
  VoucherId: string;
}
