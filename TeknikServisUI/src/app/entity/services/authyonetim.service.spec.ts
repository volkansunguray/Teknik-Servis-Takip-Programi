import { TestBed } from '@angular/core/testing';

import { AuthyonetimService } from './authyonetim.service';

describe('AuthyonetimService', () => {
  let service: AuthyonetimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthyonetimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
