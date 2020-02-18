/** @format */

import { AccountsModule } from './accounts.module';

describe('AccountsModule', () => {
    let accountsModule: AccountsModule;

    beforeEach(() => {
        accountsModule = new AccountsModule();
    });

    it('Should create an instance', () => {
        expect(accountsModule).toBeTruthy();
    });
});
