import { TestBed } from '@angular/core/testing';

import { AccountCatagoryApiService } from './account-catagory-api.service';

describe('AccountCatagoryApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountCatagoryApiService = TestBed.get(AccountCatagoryApiService);
    expect(service).toBeTruthy();
  });
});
