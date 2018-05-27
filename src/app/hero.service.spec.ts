import { TestBed, inject } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpHeaders } from '@angular/common/http';

describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService]
    });
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));
});
