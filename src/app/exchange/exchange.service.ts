import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ITransaction } from '../dashboard/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(
    private http: HttpClient,
  ) {
  }

  postTransaction(currencyFrom: string, amount: string, currencyTo: string): Observable<ITransaction> {
    return this.http.post<ITransaction>(`${environment.apiUrl}/api/transactions`, {
      // Transactions request ask for an integer, but somehow returns with two decimals.
      baseAmount: parseInt(amount, 10) * 100,
      baseCurrency: currencyFrom,
      targetCurrency: currencyTo,
    })
      .pipe(
        first(),
      );
  }
}
