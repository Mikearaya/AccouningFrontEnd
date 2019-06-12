export class AccountTypeViewModel {
  Id: number;
  Type: string;
  AccountType: string;
  TypeOfId: number;
  IsSummary: boolean;
  AccountTypeId: number;
}

export class AccountType {
  Id?: number;
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
