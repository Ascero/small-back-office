import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  const apiUrl = `https://pure-tundra-55078.herokuapp.com/api`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.getData()', () => {
    it('should call /transactions and return transaction from response',
      inject([DashboardService,  HttpClient], (dashBoardService: DashboardService, http: HttpClient) => {
        const data = 'transactions';
        const response = { id: 'trasnsaction-1'};

        spyOn(http, 'get').and.returnValue(of(response));

        let returned;

        dashBoardService.getData(data).subscribe(v => returned = v);
        expect(http.get).toHaveBeenCalledWith(`${apiUrl}/${data}`);
        expect(returned).toBe(response);
      })
    );

    it('should call /customers and return customers from response',
      inject([DashboardService,  HttpClient], (dashBoardService: DashboardService, http: HttpClient) => {
        const data = 'customers';
        const response = { id: 'user-1'};

        spyOn(http, 'get').and.returnValue(of(response));

        let returned;

        dashBoardService.getData(data).subscribe(v => returned = v);
        expect(http.get).toHaveBeenCalledWith(`${apiUrl}/${data}`);
        expect(returned).toBe(response);
      })
    );
  });
});
