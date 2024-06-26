import { TestBed } from '@angular/core/testing';

import { UnauthGuard } from './unauth.guard';

import { AuthService } from '../auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('UnauthGuard', () => {
  let guard: UnauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            tokenValue: '',
          },
        },
      ],
    });
    guard = TestBed.inject(UnauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
