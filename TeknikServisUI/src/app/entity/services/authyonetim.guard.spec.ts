import { TestBed } from '@angular/core/testing';

import { AuthyonetimGuard } from './authyonetim.guard';

describe('AuthyonetimGuard', () => {
  let guard: AuthyonetimGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthyonetimGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
