import { TestBed, inject } from '@angular/core/testing';
import { OpenGraphService } from './open-graph.service';

describe('OpenGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenGraphService]
    });
  });

  it('should ...', inject([OpenGraphService], (service: OpenGraphService) => {
    expect(service).toBeTruthy();
  }));
});
