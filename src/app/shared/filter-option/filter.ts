/** @format */

import { QueryString } from '../data-view/data-view.model';

export class LookupIndexView {
    Id: number;
    Name: string;
}

export class YearIndexView {
    Id: number;
    Year: string;
}

export class ReportFilterModel extends QueryString {
    Year = '';
    FromVoucherId = '';
    ToVoucherId = '';
    StartDate?: Date;
    EndDate?: Date;
    ControlAccountId = '';
    SubsidaryId = '';
    CostCenter = '';
    SearchString = '';
}
