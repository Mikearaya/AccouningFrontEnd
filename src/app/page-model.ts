/** @format */

export const PageSizes = [
    '50',
    '100',
    '200',
    '500',
    '1000',
    '3000',
    '4000',
    'All',
];

export class PreferenceSettings {
    get PageSize(): number {
        console.log(localStorage.getItem('pageSize'));
        return localStorage.getItem('pageSize') === undefined
            ? parseInt(PageSizes[0], 10)
            : parseInt(localStorage.getItem('pageSize'), 10);
    }

    setPageSize(value: number) {
        localStorage.setItem('pageSize', value.toString());
    }
}
