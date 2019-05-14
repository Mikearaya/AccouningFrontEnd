export class AccountTypeViewModel {
  Id: number;
  Type: string;
  AccountType: string;
  TypeofId: number;
  IsSummary: boolean;
}

export class AccountType {
  Type: string;
  IsTypeOf: number;
  IsSummary: boolean;
}

export class UpdateAccountType {
  Id?: number;
  Type: string;
  IsTypeOf: number;
  IsSummary: boolean;
}

export class TypesIndexView {
  Id: number;
  Type: string;
}
