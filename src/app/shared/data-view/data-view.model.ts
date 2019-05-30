export class GroupingEventModel {
  columnName: string;
  name: string;
  columns: string[];
}

export class SortingEventModel {
  columnName: string;
  direction: string;
  columns: string[];
}

export class FilterEventModel {
  columnName?: string;
  propertyName?: string;
  operator?: string;
  value: string;
  operation?: string;
  columns?: string;
}

export class QueryString {
  year?: string;
  selectedColumns = "";
  sortDirection = "Asc";
  sortBy: string;
  searchString = "";
  pageNumber = 0;
  pageSize = 10;
  filter: FilterEventModel[] = [];
}
