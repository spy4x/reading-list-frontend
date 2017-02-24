import { inject, TestBed } from '@angular/core/testing';
import { MineCookieService } from './cookie.service';

describe('MineCookieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MineCookieService]
    });
  });

  it('should ...', inject([MineCookieService], (service: MineCookieService) => {
    expect(service).toBeTruthy();
  }));
});
