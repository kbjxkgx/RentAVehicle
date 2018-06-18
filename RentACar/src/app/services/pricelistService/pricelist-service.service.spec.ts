import { TestBed, inject } from '@angular/core/testing';

import { PricelistService } from './pricelist-service.service';

describe('PricelistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PricelistService]
    });
  });

  it('should be created', inject([PricelistService], (service: PricelistService) => {
    expect(service).toBeTruthy();
  }));
});
