import { TestBed } from '@angular/core/testing';

import { ExchangeService } from './exchange.service';

import { AuthService } from '../user/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
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
    service = TestBed.inject(ExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
