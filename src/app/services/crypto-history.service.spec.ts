import { TestBed } from '@angular/core/testing';

import { CryptoHistoryService } from '../services/crypto-history.service';

describe('CryptoHistoryService', () => {
  let service: CryptoHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
