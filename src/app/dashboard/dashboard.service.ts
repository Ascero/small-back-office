import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { ITransaction } from './transaction.model';
import { IUser } from '../user/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private currentDataSubject = new BehaviorSubject<string>('');

  public get currentDataValue(): string {
    return this.currentDataSubject.value;
  }

  constructor(
    private http: HttpClient,
  ) {
  }

  getData(data: string): Observable<ITransaction[] | IUser[]> {
    this.currentDataSubject.next(data);

    return this.http.get<ITransaction[] | IUser[]>(`${environment.apiUrl}/api/${data}`)
      .pipe(
        first(),
      );
  }

  getDetail(data: string): Observable<ITransaction | IUser> {
    return this.http.get<ITransaction | IUser>(`${environment.apiUrl}/api/${data}`)
      .pipe(
        first(),
      );
  }

  editCurrency(transaction, targetCurrency: string): Observable<ITransaction> {
    return this.http.patch<ITransaction>(`${environment.apiUrl}/api/transactions/${transaction.id}`, {
      // Transactions request ask for an integer, but returns with two decimals.
      baseAmount: parseInt(transaction.baseAmount, 10) * 100,
      targetCurrency: `${targetCurrency}`,
    })
    .pipe(
      first(),
    );
  }
}
