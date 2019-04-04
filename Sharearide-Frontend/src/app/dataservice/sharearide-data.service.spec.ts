import { TestBed } from '@angular/core/testing';

import { SharearideDataService } from './sharearide-data.service';

describe('SharearideDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharearideDataService = TestBed.get(SharearideDataService);
    expect(service).toBeTruthy();
  });
});
