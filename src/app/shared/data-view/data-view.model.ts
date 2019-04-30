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
  columnName: string;
  operator: string;
  value: string;
  columns: string;
}

export class QueryString {
  selectedColumns: string[] = [];
  sortDirection = 'Asc';
  sortColumn: string;
  searchString = '';
  pageNumber = 0;
  pageSize = 10;
}
