import { TestBed } from '@angular/core/testing';

import { ServisApiService } from './servis-api.service';

describe('ServisApiService', () => {
  let service: ServisApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServisApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
