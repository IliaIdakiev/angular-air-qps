import { TestBed } from '@angular/core/testing';

import { WizardService } from './wizard.service';

describe('WizardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WizardService = TestBed.get(WizardService);
    expect(service).toBeTruthy();
  });
});
