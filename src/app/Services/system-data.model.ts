export interface AvailableYearsModel {
  Year: string;
}

export interface DashboardViewModel {
  TotalRevenue: number;
  TotalAssets: number;
  TotalCapital: number;
  TotalLiability: number;
  TotalExpense: number;
  UnpostedEntries: number;
  SalesSummary: SalesSummary[];
}

export class SalesSummary {
  Month: string;
  MonthString: string;
  Sales: number;
}
