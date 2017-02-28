import { inject, TestBed } from '@angular/core/testing';
import { RLCookieService } from './cookie.service';

describe('MineCookieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RLCookieService]
    });
  });

  it('should ...', inject([RLCookieService], (service: RLCookieService) => {
    expect(service).toBeTruthy();
  }));
});
