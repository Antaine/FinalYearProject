import { TestBed } from '@angular/core/testing';

import { FireAuthenticationService } from './fire-authentication.service';

describe('FireAuthenticationService', () => {
  let service: FireAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
