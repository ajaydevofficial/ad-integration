import { TestBed } from '@angular/core/testing';

import { GoogleAdsAuthService } from './google-ads-auth.service';

describe('GoogleAdsAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleAdsAuthService = TestBed.get(GoogleAdsAuthService);
    expect(service).toBeTruthy();
  });
});
