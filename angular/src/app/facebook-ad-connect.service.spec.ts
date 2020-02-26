import { TestBed } from '@angular/core/testing';

import { FacebookAdConnectService } from './facebook-ad-connect.service';

describe('FacebookAdConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacebookAdConnectService = TestBed.get(FacebookAdConnectService);
    expect(service).toBeTruthy();
  });
});
