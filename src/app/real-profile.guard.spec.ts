import { TestBed } from '@angular/core/testing';

import { RealProfileGuard } from './real-profile.guard';

describe('RealProfileGuard', () => {
  let guard: RealProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RealProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
