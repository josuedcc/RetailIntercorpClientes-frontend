import { TestBed } from '@angular/core/testing';

import { ClienteSrvService } from './cliente-srv.service';

describe('ClienteSrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteSrvService = TestBed.get(ClienteSrvService);
    expect(service).toBeTruthy();
  });
});
