import { TestBed, inject } from '@angular/core/testing';

import { NotificationserviceService } from './notificationservice.service';

describe('NotificationserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationserviceService]
    });
  });

  it('should be created', inject([NotificationserviceService], (service: NotificationserviceService) => {
    expect(service).toBeTruthy();
  }));
});
