import { AccountsRoutingModule } from './accounts-routing.module';

describe('AccountsRoutingModule', () => {
  let accountsRoutingModule: AccountsRoutingModule;

  beforeEach(() => {
    accountsRoutingModule = new AccountsRoutingModule();
  });

  it('should create an instance', () => {
    expect(accountsRoutingModule).toBeTruthy();
  });
});
