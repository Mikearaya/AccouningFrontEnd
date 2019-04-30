import { TestBed, inject } from "@angular/core/testing";
import { AccountsService } from '../accounts.service';
import { Accounts } from '../accounts';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Accounts view', () => {
    let accountsService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AccountsService]
        });
        accountsService = TestBed.get(AccountsService);
    });
    it('should be created', inject([AccountsService], accountsService => {
        expect(accountsService).toBeTruthy();
    }));
});
