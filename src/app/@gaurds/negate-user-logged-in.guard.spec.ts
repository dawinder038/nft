import { TestBed } from '@angular/core/testing';

import { NegateUserLoggedInGuard } from './negate-user-logged-in.guard';

describe('NegateUserLoggedInGuard', () => {
  let guard: NegateUserLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NegateUserLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
