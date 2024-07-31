import { TestBed } from '@angular/core/testing';

import { CryptoTableService } from '../../services/crypto-table/crypto-table.service';

describe('CryptoTableService', () => {
  let service: CryptoTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
