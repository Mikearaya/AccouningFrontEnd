import { LedgerModule } from './ledger.module';

describe('LedgerModule', () => {
  let ledgerModule: LedgerModule;

  beforeEach(() => {
    ledgerModule = new LedgerModule();
  });

  it('should create an instance', () => {
    expect(ledgerModule).toBeTruthy();
  });
});
