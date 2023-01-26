import { TestBed } from '@angular/core/testing';

import { PersonelApiService } from './personel-api.service';

describe('PersonelApiService', () => {
  let service: PersonelApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonelApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
