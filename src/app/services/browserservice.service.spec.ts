import { TestBed } from '@angular/core/testing';

import { BrowserserviceService } from './browserservice.service';

describe('BrowserserviceService', () => {
  let service: BrowserserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
