/** @format */

import { LedgerRoutingModule } from './ledger-routing.module';

describe('AccountsRoutingModule', () => {
    let ledgerRoutingModule: LedgerRoutingModule;

    beforeEach(() => {
        ledgerRoutingModule = new LedgerRoutingModule();
    });

    it('Should create an instance', () => {
        expect(ledgerRoutingModule).toBeTruthy();
    });
});
