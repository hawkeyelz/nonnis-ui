import { TestBed } from '@angular/core/testing';

import { DatesServiceService } from './dates.service';

describe('DatesServiceService', () => {
  let service: DatesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
