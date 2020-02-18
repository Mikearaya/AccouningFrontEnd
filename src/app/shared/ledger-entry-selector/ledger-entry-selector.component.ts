/** @format */

import {
    Component,
    OnInit,
    forwardRef,
    EventEmitter,
    Output,
    Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { LedgerService } from 'src/app/core/services/ledger.service';
import { Predicate, Query } from '@syncfusion/ej2-data/src';
import {
    LedgerEntryViewModel,
    JornalEntryViewModel,
} from 'src/app/features/ledgers/ledger';

@Component({
    selector: 'app-ledger-entry-selector',
    templateUrl: './ledger-entry-selector.component.html',
    styleUrls: ['./ledger-entry-selector.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LedgerEntrySelectorComponent),
            multi: true,
        },
    ],
})
export class LedgerEntrySelectorComponent implements ControlValueAccessor {
    constructor(private ledgerApi: LedgerService) {}
    public _value: any;
    public disabled: boolean;
    public data;

    @Input()
    public showNavigator: boolean;
    @Input()
    public previous: number;
    @Input()
    public next: number;
    @Output()
    public entrySelected: EventEmitter<any> = new EventEmitter();
    @Output()
    public selectionChanged: EventEmitter<any> = new EventEmitter();

    public accounts: any;
    public fields: object = { value: 'Id', text: 'VoucherId' };

    public text = '';

    entryChanged($event: any) {
        if ($event.itemData) {
            this.onChanged($event.itemData['Id']);
            this.entrySelected.emit($event.itemData['Id']);
            this.ledgerApi
                .getLedgerEntryById($event.itemData['Id'])
                .subscribe((ledger: JornalEntryViewModel) => {
                    this.next = ledger.Next;
                    this.previous = ledger.Prev;
                    this.selectionChanged.emit(ledger);
                });
        } else {
            this.onChanged('');
        }

        this.onTouched();
    }

    public onFiltering(e) {
        e.preventDefaultAction = true;
        const predicate = new Predicate('VoucherId', 'Contains', e.text);

        let query = new Query();

        query = e.text !== '' ? query.where(predicate) : query;
        if (e.text) {
            this.text = e.text;
            this.ledgerApi
                .getLedgerEntryByVoucherId(e.text)
                .subscribe((data) => {
                    e.updateData(data);
                });
        }
    }

    onChanged: any = () => {};
    onTouched: any = () => {};

    writeValue(obj: any): void {
        this._value = obj;

        if (obj != null && obj) {
            this.text = obj;
            this.ledgerApi
                .getLedgerEntryByVoucherId(obj)
                .subscribe((result: JornalEntryViewModel) => {
                    this.accounts = result;
                    this.next = result.Next;
                    this.previous = result.Prev;

                    if (this._value) {
                        if (obj !== 0) {
                            const data = this.accounts.filter(
                                (a) => a.Id === obj
                            );

                            data.forEach((element) => {
                                this.text = element.Name;
                            });
                        }
                    }
                });
        }
    }
    registerOnChange(fn: any): void {
        this.onChanged = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    changeEntry(id: number) {
        console.log('changed event');
        this.ledgerApi
            .getLedgerEntryById(id)
            .subscribe((e: JornalEntryViewModel) => {
                this.next = e.Next;
                this.previous = e.Prev;
                this.text = e.VoucherId;
                this.selectionChanged.emit(e);
            });
    }
}
